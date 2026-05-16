import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProductsApi } from '../util/api';
import { formatCurrency } from '../util/format';

const getFiltersFromSearchParams = (params) => ({
    q: params.get('q') || '',
    category: params.get('category') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    inStock: params.get('inStock') === 'true',
    sortBy: params.get('sortBy') || 'homeOrder',
});

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const filters = useMemo(() => getFiltersFromSearchParams(searchParams), [searchParams]);

    const updateSearchParams = (updates) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([k, v]) => {
            if (v === undefined || v === null || v === '') {
                next.delete(k);
            } else {
                next.set(k, String(v));
            }
        });
        setSearchParams(next, { replace: true });
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const params = {
                    q: filters.q || undefined,
                    category: filters.category || undefined,
                    minPrice: filters.minPrice || undefined,
                    maxPrice: filters.maxPrice || undefined,
                    stockStatus: filters.inStock ? 'in-stock' : undefined,
                    sortBy: filters.sortBy,
                };

                const res = await getProductsApi(params);
                setProducts(Array.isArray(res) ? res : []);
            } catch {
                setError('Không tải được dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [filters.q, filters.category, filters.minPrice, filters.maxPrice, filters.inStock, filters.sortBy]);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return Array.from(set);
    }, [products]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            <div className="mb-6">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Tìm kiếm sản phẩm</h1>
                <p className="mt-2 text-slate-500">Tìm thấy {products.length} sản phẩm</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="min-w-0 space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900">Khoảng giá</h3>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Từ</span>
                                <input value={filters.minPrice} onChange={(e) => updateSearchParams({ minPrice: e.target.value })} inputMode="numeric" placeholder="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Đến</span>
                                <input value={filters.maxPrice} onChange={(e) => updateSearchParams({ maxPrice: e.target.value })} inputMode="numeric" placeholder="5000000" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900">Danh mục</h3>
                        <div className="mt-4 space-y-2">
                            <label className="flex items-center gap-3 rounded-2xl px-1 py-1 text-sm text-slate-700">
                                <input type="radio" checked={filters.category === ''} onChange={() => updateSearchParams({ category: '' })} className="accent-emerald-600" />
                                <span>Tất cả</span>
                            </label>
                            {categories.map((c) => (
                                <label key={c} className="flex items-center gap-3 rounded-2xl px-1 py-1 text-sm text-slate-700">
                                    <input type="radio" checked={filters.category === c} onChange={() => updateSearchParams({ category: c })} className="accent-emerald-600" />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900">Tình trạng</h3>
                        <label className="mt-4 flex items-center gap-3 text-sm text-slate-700">
                            <input type="checkbox" checked={filters.inStock} onChange={() => updateSearchParams({ inStock: !filters.inStock ? 'true' : '' })} className="accent-emerald-600" />
                            <span>Chỉ hiển thị còn hàng</span>
                        </label>
                    </div>
                </aside>

                <section className="min-w-0">
                    <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex items-center gap-3">
                            <input value={filters.q} onChange={(e) => updateSearchParams({ q: e.target.value })} placeholder="Tìm theo tên, mô tả" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
                        </div>

                        <select value={filters.sortBy} onChange={(e) => updateSearchParams({ sortBy: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none xl:w-auto">
                            <option value="homeOrder">Mặc định</option>
                            <option value="salePriceAsc">Giá tăng dần</option>
                            <option value="salePriceDesc">Giá giảm dần</option>
                            <option value="soldDesc">Bán chạy</option>
                        </select>
                    </div>

                    {loading ? <div>Đang tải...</div> : null}
                    {error ? <div className="text-rose-600">{error}</div> : null}

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((p) => (
                            <Link key={p.slug} to={`/product/${p.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                                    <img src={p.images?.[0]} alt={p.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                                </div>
                                <div className="p-4">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{p.category}</div>
                                    <h3 className="mt-2 text-lg font-bold text-slate-900">{p.name}</h3>
                                    <div className="mt-4 flex items-end justify-between gap-3">
                                        <div>
                                            <div className="text-lg font-black text-emerald-600">{formatCurrency(p.salePrice?.replace(/[\D]/g, '')) || p.salePrice}</div>
                                            <div className="text-sm text-slate-400 line-through">{p.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SearchPage;
