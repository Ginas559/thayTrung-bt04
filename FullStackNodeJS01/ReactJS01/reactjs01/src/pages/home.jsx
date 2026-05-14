import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    CheckOutlined,
    GiftOutlined,
    LoginOutlined,
    LogoutOutlined,
    StarOutlined,
    ThunderboltOutlined,
    UpOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { logout } from '../redux/authSlice';
import { keyboardImages } from '../util/keyboardImages';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const promotionItems = [
        {
            title: 'Giảm 20% cho KeyNova Pro 75',
            price: '2.490.000đ',
            salePrice: '1.992.000đ',
            description: 'Áp dụng cho thành viên đăng nhập trong tuần này.',
            image: keyboardImages.compact,
        },
        {
            title: 'Miễn phí ship nội thành',
            price: '0đ',
            salePrice: '0đ',
            description: 'Giao nhanh trong 2 giờ cho khu vực trung tâm thành phố.',
            image: keyboardImages.side,
        },
        {
            title: 'Tặng kê tay silicone',
            price: '490.000đ',
            salePrice: '0đ',
            description: 'Áp dụng cho đơn hàng bàn phím cơ từ 2.000.000đ.',
            image: keyboardImages.feature,
        },
    ];

    const newestItems = [
        {
            name: 'KeyNova Pro 75',
            label: 'Ra mắt 2 ngày trước',
            detail: 'Layout 75%, gasket mount, gõ êm, hợp làm việc.',
            image: keyboardImages.compact,
        },
        {
            name: 'KeyNova Mini 60',
            label: 'Ra mắt tuần này',
            detail: 'Thiết kế nhỏ gọn, gọn bàn làm việc, keycap PBT.',
            image: keyboardImages.feature,
        },
        {
            name: 'KeyNova Side Glow TKL',
            label: 'Ra mắt tháng này',
            detail: 'Tối ưu cho game và công việc với ánh sáng đẹp.',
            image: keyboardImages.side,
        },
    ];

    const bestSellingItems = [
        {
            name: 'KeyNova Daily 87',
            quantity: '1.284 lượt mua',
            detail: 'Mẫu bán chạy nhất nhờ cảm giác gõ dễ chịu và giá hợp lý.',
            image: keyboardImages.hero,
        },
        {
            name: 'KeyNova Flash 68',
            quantity: '982 lượt mua',
            detail: 'Bàn phím nhỏ gọn, LED đẹp, rất hợp góc setup.',
            image: keyboardImages.compact,
        },
        {
            name: 'KeyNova Studio TKL',
            quantity: '746 lượt mua',
            detail: 'Phiên bản cao cấp, gõ đầm tay, cân bằng cho cả học tập và làm việc.',
            image: keyboardImages.feature,
        },
    ];

    const keyHighlights = [
        'Cảm giác gõ đầm tay, âm thanh gọn và rõ.',
        'Layout 60%, 75% và TKL cho nhiều nhu cầu khác nhau.',
        'Keycap PBT, LED đẹp và pin tốt cho dùng hằng ngày.',
    ];

    const detailButtons = [
        {
            title: 'Chi tiết sản phẩm',
            description: 'Xem hình, tồn kho, số lượng bán và sản phẩm tương tự.',
            to: '/product/keynova-pro-75',
        },
        {
            title: 'Tin tức',
            description: 'Mở trang tin ngắn về đợt hàng mới và ưu đãi.',
            to: '/news/keynova-launch-news',
        },
        {
            title: 'Bài viết',
            description: 'Đọc bài chia sẻ chọn bàn phím cơ theo nhu cầu.',
            to: '/article/choose-mechanical-keyboard',
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(logout());
        navigate('/');
    };

    const formatMoney = (value) => {
        return value;
    };

    return (
        <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <div className="space-y-6">
                        <div className="max-w-3xl space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Cửa hàng bàn phím cơ</p>
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Trang chủ bán hàng cho thành viên.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Bàn phím cơ được trình bày theo phong cách sáng, tối giản và nhiều khoảng trắng hơn, nhưng vẫn giữ đủ khuyến mãi, mới nhất, bán chạy nhất, thông tin thành viên và logout.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                                <ThunderboltOutlined />
                                <span>Ưu đãi dành cho thành viên</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                                <GiftOutlined />
                                <span>Chỉ 01 loại sản phẩm</span>
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-slate-50 shadow-sm">
                            <img src={keyboardImages.hero} alt="Bàn phím cơ chủ đạo" className="h-[420px] w-full object-cover" />
                        </div>

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

                        <div className="grid gap-4 sm:grid-cols-3">
                            {keyHighlights.map((item) => (
                                <div key={item} className="rounded-[24px] border border-slate-200 bg-white px-4 py-5 text-sm leading-7 text-slate-600 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>

                        {auth.isAuthenticated ? (
                            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Trang chi tiết</p>
                                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Chọn trang cần xem</h3>
                                    </div>
                                    <div className="hidden rounded-full bg-white px-4 py-2 text-sm text-slate-500 md:block">
                                        Sau khi đăng nhập mới hiện mục này
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {detailButtons.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
                                        >
                                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{item.title}</p>
                                            <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                                            <p className="mt-5 text-sm font-semibold text-slate-950">Mở trang</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Thông tin thành viên</p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                                        {auth.isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
                                    </h2>
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
                                    <span className="text-sm font-medium text-slate-950">{auth.isAuthenticated ? 'Thành viên' : 'Khách'}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {auth.isAuthenticated ? (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        <LogoutOutlined />
                                        <span>Đăng xuất</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        <LoginOutlined />
                                        <span>Đăng nhập</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                                <img src={keyboardImages.compact} alt="Khuyến mãi bàn phím cơ" className="h-60 w-full object-cover" />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Khuyến mãi</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Giảm 20% cho KeyNova Pro 75</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">Áp dụng cho thành viên đăng nhập trong tuần này.</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="text-sm text-slate-400 line-through">2.490.000đ</span>
                                        <span className="text-2xl font-semibold text-slate-950">1.992.000đ</span>
                                    </div>
                                    <div className="mt-5">
                                        <Link to="/product/keynova-pro-75" className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
                                            Mở trang chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                                <img src={keyboardImages.side} alt="Sản phẩm mới bàn phím cơ" className="h-60 w-full object-cover" />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Mới nhất</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">KeyNova Mini 60</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">Thiết kế nhỏ gọn, keycap PBT và gọn bàn làm việc.</p>
                                    <div className="mt-5">
                                        <Link to="/product/keynova-mini-60" className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
                                            Xem chi tiết mới nhất
                                        </Link>
                                    </div>
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
                                        <div key={item.title} className="rounded-[28px] bg-slate-50 p-5">
                                            <p className="text-sm font-medium text-slate-500">{item.title}</p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <span className="text-sm text-slate-400 line-through">{formatMoney(item.price)}</span>
                                                <span className="text-2xl font-semibold text-slate-950">{formatMoney(item.salePrice)}</span>
                                            </div>
                                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 sm:p-6">
                                <img src={keyboardImages.feature} alt="Hình khuyến mãi bàn phím cơ" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
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
                                        <div key={item.name} className="rounded-[28px] bg-slate-50 p-5">
                                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                            <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                            <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 sm:p-6">
                                <img src={keyboardImages.hero} alt="Hình sản phẩm mới" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
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
                                    <div key={item.name} className="rounded-[28px] bg-slate-50 p-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-medium text-slate-500">{item.quantity}</p>
                                            <CheckOutlined className="text-slate-400" />
                                        </div>
                                        <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 sm:p-6">
                            <img src={keyboardImages.side} alt="Hình bàn phím bán chạy" className="h-full min-h-[440px] w-full rounded-[28px] object-cover" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default HomePage;