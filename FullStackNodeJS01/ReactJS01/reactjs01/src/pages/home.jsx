import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    AppleOutlined,
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

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const promotionItems = [
        {
            title: 'Giảm 25% cho NovaBeat Pro X',
            price: '1.490.000đ',
            salePrice: '1.117.000đ',
            description: 'Áp dụng cho toàn bộ thành viên đăng nhập trong tuần này.',
        },
        {
            title: 'Miễn phí ship nội thành',
            price: '0đ',
            salePrice: '0đ',
            description: 'Giao nhanh trong 2 giờ cho khu vực trung tâm thành phố.',
        },
        {
            title: 'Tặng túi đựng chống sốc',
            price: '890.000đ',
            salePrice: '0đ',
            description: 'Áp dụng cho đơn hàng tai nghe bluetooth từ 699.000đ.',
        },
    ];

    const newestItems = [
        {
            name: 'NovaBeat Air 5',
            label: 'Ra mắt 2 ngày trước',
            detail: 'Thiết kế nhẹ, pin 40 giờ, kết nối ổn định.',
        },
        {
            name: 'NovaBeat Sport S',
            label: 'Ra mắt tuần này',
            detail: 'Chống nước IPX5, hợp cho vận động và di chuyển.',
        },
        {
            name: 'NovaBeat Studio Max',
            label: 'Ra mắt tháng này',
            detail: 'Âm thanh rộng, đeo êm, phù hợp học tập và làm việc.',
        },
    ];

    const bestSellingItems = [
        {
            name: 'NovaBeat Classic One',
            quantity: '1.284 lượt mua',
            detail: 'Mẫu bán chạy nhất nhờ pin ổn và giá dễ tiếp cận.',
        },
        {
            name: 'NovaBeat Air 3',
            quantity: '982 lượt mua',
            detail: 'Tai nghe nhỏ gọn, được chọn nhiều cho học sinh sinh viên.',
        },
        {
            name: 'NovaBeat Pro X',
            quantity: '746 lượt mua',
            detail: 'Phiên bản cao cấp có chống ồn chủ động.',
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
        <main className="bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <AppleOutlined className="text-base text-slate-900" />
                            <span>NovaBeat Store</span>
                        </div>

                        <div className="max-w-3xl space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Cửa hàng tai nghe bluetooth</p>
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Trang chủ bán hàng cho thành viên.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Ưu đãi, mới nhất, bán chạy nhất và thông tin tài khoản đều được đặt trên cùng một trang theo đúng yêu cầu bài tập.
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
                    </div>

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
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    <article className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                                <GiftOutlined />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Khuyến mãi</p>
                                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Ưu đãi đang áp dụng</h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {promotionItems.map((item) => (
                                <div key={item.title} className="rounded-3xl bg-white p-5">
                                    <p className="text-sm font-medium text-slate-500">{item.title}</p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-sm text-slate-400 line-through">{formatMoney(item.price)}</span>
                                        <span className="text-2xl font-semibold text-slate-950">{formatMoney(item.salePrice)}</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                                <UpOutlined />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Mới nhất</p>
                                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Sản phẩm mới ra mắt</h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {newestItems.map((item) => (
                                <div key={item.name} className="rounded-3xl bg-white p-5">
                                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-[30px] border border-slate-200 bg-slate-50 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                                <StarOutlined />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Bán chạy nhất</p>
                                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Mẫu được mua nhiều nhất</h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {bestSellingItems.map((item) => (
                                <div key={item.name} className="rounded-3xl bg-white p-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-medium text-slate-500">{item.quantity}</p>
                                        <CheckOutlined className="text-slate-400" />
                                    </div>
                                    <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default HomePage;