import { useEffect, useMemo, useState } from 'react';
import { getProductsApi, getProductBySlugApi, createProductApi, updateProductApi, deleteProductApi, getUserApi } from '../util/api';
import { formatCurrency } from '../util/format';

const emptyProduct = {
    slug: '', name: '', category: '', price: '', salePrice: '', stock: 0, sold: 0, description: '', highlight: '', imagesText: '', promotionTitle: '', promotionDescription: '', newestLabel: '', newestDetail: '', bestSellingQuantity: '', bestSellingDetail: '', homeOrder: 0,
};

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [form, setForm] = useState(emptyProduct);
    const [editingId, setEditingId] = useState('');

    const reload = async () => {
        const [pRes, uRes] = await Promise.all([getProductsApi(), getUserApi()]);
        setProducts(Array.isArray(pRes) ? pRes : []);
        setUsers(Array.isArray(uRes) ? uRes : []);
    };

    useEffect(() => { void reload(); }, []);

    const filtered = useMemo(() => products.filter((p) => `${p.name} ${p.slug} ${p.category}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

    const onEdit = async (p) => {
        setEditingId(p._id);
        setForm({
            slug: p.slug || '', name: p.name || '', category: p.category || '', price: p.price || '', salePrice: p.salePrice || '', stock: p.stock || 0, sold: p.sold || 0, description: p.description || '', highlight: p.highlight || '', imagesText: Array.isArray(p.images) ? p.images.join('\n') : '', promotionTitle: p.promotionTitle || '', promotionDescription: p.promotionDescription || '', newestLabel: p.newestLabel || '', newestDetail: p.newestDetail || '', bestSellingQuantity: p.bestSellingQuantity || '', bestSellingDetail: p.bestSellingDetail || '', homeOrder: p.homeOrder || 0,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            slug: form.slug,
            name: form.name,
            category: form.category,
            price: form.price,
            salePrice: form.salePrice,
            stock: Number(form.stock || 0),
            sold: Number(form.sold || 0),
            description: form.description,
            highlight: form.highlight,
            images: form.imagesText.split('\n').map((s) => s.trim()).filter(Boolean),
            promotionTitle: form.promotionTitle,
            promotionDescription: form.promotionDescription,
            newestLabel: form.newestLabel,
            newestDetail: form.newestDetail,
            bestSellingQuantity: form.bestSellingQuantity,
            bestSellingDetail: form.bestSellingDetail,
            homeOrder: Number(form.homeOrder || 0),
        };

        if (editingId) {
            await updateProductApi(editingId, payload);
        } else {
            await createProductApi(payload);
        }
        setForm(emptyProduct);
        setEditingId('');
        await reload();
    };

    const onDelete = async (id) => {
        await deleteProductApi(id);
        await reload();
    };

    return (
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-500 p-8 text-white shadow-xl shadow-emerald-600/20">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Admin workspace</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Quản trị sản phẩm</h1>
                <p className="mt-4 max-w-3xl text-base text-white/90 md:text-lg">Tạo, sửa, xóa sản phẩm (bàn phím) trực tiếp vào MongoDB.</p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid gap-3 md:grid-cols-2">
                    <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Tên sản phẩm" className="rounded-2xl border p-3" />
                    <input value={form.slug} onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))} placeholder="slug" className="rounded-2xl border p-3" />
                    <input value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} placeholder="Danh mục" className="rounded-2xl border p-3" />
                    <input value={form.salePrice} onChange={(e) => setForm((c) => ({ ...c, salePrice: e.target.value }))} placeholder="Giá bán (text)" className="rounded-2xl border p-3" />
                    <input value={form.price} onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))} placeholder="Giá gốc (text)" className="rounded-2xl border p-3" />
                    <input value={form.stock} onChange={(e) => setForm((c) => ({ ...c, stock: e.target.value }))} placeholder="Tồn kho" className="rounded-2xl border p-3" />
                    <input value={form.sold} onChange={(e) => setForm((c) => ({ ...c, sold: e.target.value }))} placeholder="Đã bán" className="rounded-2xl border p-3" />
                    <input value={form.homeOrder} onChange={(e) => setForm((c) => ({ ...c, homeOrder: e.target.value }))} placeholder="homeOrder" className="rounded-2xl border p-3" />
                    <textarea value={form.imagesText} onChange={(e) => setForm((c) => ({ ...c, imagesText: e.target.value }))} placeholder="Image URLs (one per line)" className="col-span-2 rounded-2xl border p-3" />
                    <textarea value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder="Mô tả" className="col-span-2 rounded-2xl border p-3" />
                </div>
                <div className="mt-4 flex gap-3">
                    <button type="submit" className="rounded-2xl bg-emerald-600 px-4 py-2 text-white">{editingId ? 'Cập nhật' : 'Tạo sản phẩm'}</button>
                    <button type="button" onClick={() => { setForm(emptyProduct); setEditingId(''); }} className="rounded-2xl border px-4 py-2">Hủy</button>
                </div>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm kiếm" className="rounded-2xl border px-3 py-2" />
                </div>

                <div className="mt-4 overflow-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-4 py-2">Tên</th>
                                <th className="px-4 py-2">Danh mục</th>
                                <th className="px-4 py-2">Giá</th>
                                <th className="px-4 py-2">Tồn</th>
                                <th className="px-4 py-2">Bán</th>
                                <th className="px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p._id} className="border-t">
                                    <td className="px-4 py-2 font-semibold">{p.name}</td>
                                    <td className="px-4 py-2">{p.category}</td>
                                    <td className="px-4 py-2">{p.salePrice}</td>
                                    <td className="px-4 py-2">{p.stock}</td>
                                    <td className="px-4 py-2">{p.sold}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <button onClick={() => onEdit(p)} className="rounded px-3 py-1 bg-amber-100">Sửa</button>
                                            <button onClick={() => onDelete(p._id)} className="rounded px-3 py-1 bg-rose-100">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-bold">Thành viên</h2>
                <div className="mt-4 grid gap-2">
                    {users.map((u) => (
                        <div key={u._id || u.email} className="rounded p-3 border">{u.email} — {u.name} — {u.role}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;