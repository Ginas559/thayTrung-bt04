import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CheckOutlined,
    ClearOutlined,
    GiftOutlined,
    LoginOutlined,
    LogoutOutlined,
    SearchOutlined,
    StarOutlined,
    ThunderboltOutlined,
    UpOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { getProductsApi } from '../util/api';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        q: '',
        category: '',
        stockStatus: '',
        sortBy: 'homeOrder',
        minPrice: '',
        maxPrice: '',
        promotionOnly: false,
        newestOnly: false,
        bestSellingOnly: false,
    });

    const categoryOptions = [
        'Bàn phím cơ / Gasket Mount',
        'Bàn phím cơ / Compact Layout',
        'Bàn phím cơ / TKL',
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            if (!auth.isAuthenticated) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');

            try {
                const res = await getProductsApi(filters);
                const data = Array.isArray(res) ? res : [];
                setProducts(data);
            } catch {
                setError('Không tải được dữ liệu sản phẩm từ API.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [auth.isAuthenticated, filters]);

    const handleFilterChange = (field, value) => {
        setFilters((current) => ({ ...current, [field]: value }));
    };

    const clearFilters = () => {
        setFilters({
            q: '',
            category: '',
            stockStatus: '',
            sortBy: 'homeOrder',
            minPrice: '',
            maxPrice: '',
            promotionOnly: false,
            newestOnly: false,
            bestSellingOnly: false,
        });
    };

    const featuredProduct = useMemo(() => {
        return products.find((item) => item.slug === 'keynova-pro-75') || products[0] || null;
    }, [products]);

    const promotionItems = useMemo(() => {
        return products
            .filter((item) => item.promotionTitle)
            .slice(0, 3)
            .map((item) => ({
                title: item.promotionTitle,
                price: item.price,
                salePrice: item.salePrice,
                description: item.promotionDescription,
                image: item.images?.[0],
                slug: item.slug,
            }));
    }, [products]);

    const newestItems = useMemo(() => {
        return products
            .filter((item) => item.newestLabel)
            .slice(0, 3)
            .map((item) => ({
                name: item.name,
                label: item.newestLabel,
                detail: item.newestDetail,
                image: item.images?.[0],
                slug: item.slug,
            }));
    }, [products]);

    const bestSellingItems = useMemo(() => {
        return products
            .filter((item) => item.bestSellingQuantity)
            .slice(0, 3)
            .map((item) => ({
                name: item.name,
                quantity: item.bestSellingQuantity,
                detail: item.bestSellingDetail,
                image: item.images?.[0],
                slug: item.slug,
            }));
    }, [products]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(logout());
        navigate('/');
    };

    if (!auth.isAuthenticated) {
        return (
            <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                    <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Cửa hàng bàn phím cơ</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Trang chủ bán hàng cho thành viên.</h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                            Hãy đăng nhập để xem dữ liệu sản phẩm được lấy từ MongoDB, gồm khuyến mãi, mới nhất, bán chạy nhất, thông tin thành viên và nút logout.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <LoginOutlined />
                                <span>Đăng nhập</span>
                            </button>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-600">
                                <ThunderboltOutlined />
                                <span>API + UI</span>
                            </span>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="bg-white px-4 pb-16 pt-20 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl justify-center">
                    <Spin size="large" />
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                    <div className="space-y-6">
                        <div className="max-w-3xl space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Cửa hàng bàn phím cơ</p>
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Trang chủ bán hàng cho thành viên.</h1>
                            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Dữ liệu khuyến mãi, mới nhất và bán chạy nhất hiện được lấy từ MongoDB thông qua API, còn giao diện vẫn giữ phong cách Tailwind sáng, gọn và rõ ràng.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                                <ThunderboltOutlined />
                                <span>Ưu đãi dành cho thành viên</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                                <GiftOutlined />
                                <span>01 loại sản phẩm chính</span>
                            </span>
                        </div>

                        {featuredProduct ? (
                            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-slate-50 shadow-sm">
                                <img src={featuredProduct.images?.[0]} alt={featuredProduct.name} className="h-[420px] w-full object-cover" />
                            </div>
                        ) : null}

                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/product/keynova-pro-75"
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <span>Xem chi tiết sản phẩm</span>
                            </Link>
                            <Link
                                to="/product/keynova-mini-60"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                <span>Xem mẫu mới nhất</span>
                            </Link>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <input
                                value={filters.q}
                                onChange={(e) => handleFilterChange('q', e.target.value)}
                                placeholder="Tìm kiếm theo tên, mô tả..."
                                className="w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                            />

                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                            >
                                <option value="">Tất cả danh mục</option>
                                {categoryOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filters.stockStatus}
                                onChange={(e) => handleFilterChange('stockStatus', e.target.value)}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                            >
                                <option value="">Tất cả kho</option>
                                <option value="in-stock">Còn hàng</option>
                                <option value="low-stock">Sắp hết</option>
                                <option value="out-stock">Hết hàng</option>
                            </select>

                            <input
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                placeholder="Giá từ"
                                inputMode="numeric"
                                className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                            />

                            <input
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                placeholder="Đến"
                                inputMode="numeric"
                                className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                            />

                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                            >
                                <option value="homeOrder">Mặc định</option>
                                <option value="salePriceAsc">Giá tăng dần</option>
                                <option value="salePriceDesc">Giá giảm dần</option>
                                <option value="soldDesc">Bán chạy</option>
                                <option value="stockAsc">Tồn kho ít</option>
                                <option value="nameAsc">Tên A-Z</option>
                            </select>

                            <button onClick={() => setFilters((c) => ({ ...c }))} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                                <SearchOutlined />
                                <span>Áp dụng</span>
                            </button>

                            <button onClick={clearFilters} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                                <ClearOutlined />
                                <span>Xóa</span>
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                'Cảm giác gõ đầm tay, âm thanh gọn và rõ.',
                                'Layout 60%, 75% và TKL cho nhiều nhu cầu khác nhau.',
                                'Keycap PBT, LED đẹp và pin tốt cho dùng hằng ngày.',
                            ].map((item) => (
                                <div key={item} className="rounded-[24px] border border-slate-200 bg-white px-4 py-5 text-sm leading-7 text-slate-600 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Trang chi tiết</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Chọn trang cần xem</h3>
                                </div>
                                <div className="hidden rounded-full bg-white px-4 py-2 text-sm text-slate-500 md:block">Sau khi đăng nhập mới hiện mục này</div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {[
                                    { title: 'Chi tiết sản phẩm', description: 'Xem hình, tồn kho, số lượng bán và sản phẩm tương tự.', to: '/product/keynova-pro-75' },
                                    { title: 'Tin tức', description: 'Mở trang tin ngắn về đợt hàng mới và ưu đãi.', to: '/news/keynova-launch-news' },
                                    { title: 'Bài viết', description: 'Đọc bài chia sẻ chọn bàn phím cơ theo nhu cầu.', to: '/article/choose-mechanical-keyboard' },
                                ].map((item) => (
                                    <Link key={item.to} to={item.to} className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{item.title}</p>
                                        <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                                        <p className="mt-5 text-sm font-semibold text-slate-950">Mở trang</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Thông tin thành viên</p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Đã đăng nhập</h2>
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                                    <UserOutlined />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3">
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                                    <span className="text-sm text-slate-500">Tên</span>
                                    <span className="text-sm font-medium text-slate-950">{auth?.user?.name || 'Chưa đăng nhập'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                                    <span className="text-sm text-slate-500">Email</span>
                                    <span className="text-sm font-medium text-slate-950">{auth?.user?.email || 'Chưa đăng nhập'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                                    <span className="text-sm text-slate-500">Vai trò</span>
                                    <span className="text-sm font-medium text-slate-950">Thành viên</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                    <LogoutOutlined />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>

                        {error ? (
                            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
                                {error}
                            </div>
                        ) : null}

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                                <img src={promotionItems[0]?.image || featuredProduct?.images?.[0]} alt="Khuyến mãi bàn phím cơ" className="h-60 w-full object-cover" />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Khuyến mãi</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{promotionItems[0]?.title || 'Giảm 20% cho KeyNova Pro 75'}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{promotionItems[0]?.description || 'Áp dụng cho thành viên đăng nhập trong tuần này.'}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="text-sm text-slate-400 line-through">{promotionItems[0]?.price || '2.490.000đ'}</span>
                                        <span className="text-2xl font-semibold text-slate-950">{promotionItems[0]?.salePrice || '1.992.000đ'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                                <img src={newestItems[0]?.image || featuredProduct?.images?.[0]} alt="Sản phẩm mới bàn phím cơ" className="h-60 w-full object-cover" />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Mới nhất</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{newestItems[0]?.name || 'KeyNova Mini 60'}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{newestItems[0]?.detail || 'Thiết kế nhỏ gọn, keycap PBT và gọn bàn làm việc.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
                        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-900 shadow-sm">
                                        <GiftOutlined />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Khuyến mãi</p>
                                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Ưu đãi đang áp dụng</h3>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {promotionItems.map((item) => (
                                        <Link key={item.slug} to={`/product/${item.slug}`} className="block rounded-[28px] bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                                            <p className="text-sm font-medium text-slate-500">{item.title}</p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <span className="text-sm text-slate-400 line-through">{item.price}</span>
                                                <span className="text-2xl font-semibold text-slate-950">{item.salePrice}</span>
                                            </div>
                                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 sm:p-6">
                                <img src={featuredProduct?.images?.[0]} alt="Hình khuyến mãi bàn phím cơ" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
                            </div>
                        </div>
                    </article>

                    <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
                        <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-900 shadow-sm">
                                        <UpOutlined />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Mới nhất</p>
                                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Sản phẩm mới ra mắt</h3>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {newestItems.map((item) => (
                                        <Link key={item.slug} to={`/product/${item.slug}`} className="block rounded-[28px] bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                            <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 sm:p-6">
                                <img src={featuredProduct?.images?.[1] || featuredProduct?.images?.[0]} alt="Hình sản phẩm mới" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
                            </div>
                        </div>
                    </article>
                </section>

                <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
                    <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-900 shadow-sm">
                                    <StarOutlined />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Bán chạy nhất</p>
                                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Các mẫu được mua nhiều nhất</h3>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {bestSellingItems.map((item) => (
                                    <Link key={item.slug} to={`/product/${item.slug}`} className="rounded-[28px] bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-medium text-slate-500">{item.quantity}</p>
                                            <CheckOutlined className="text-slate-400" />
                                        </div>
                                        <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 sm:p-6">
                            <img src={featuredProduct?.images?.[2] || featuredProduct?.images?.[0]} alt="Hình bàn phím bán chạy" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HomePage;