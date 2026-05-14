import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { LoginOutlined, LogoutOutlined, ReadOutlined, ShoppingOutlined, SoundOutlined } from '@ant-design/icons';

const detailLinks = [
    {
        label: 'Sản phẩm',
        to: '/product/keynova-pro-75',
        icon: ShoppingOutlined,
    },
    {
        label: 'Tin tức',
        to: '/news/keynova-launch-news',
        icon: SoundOutlined,
    },
    {
        label: 'Bài viết',
        to: '/article/choose-mechanical-keyboard',
        icon: ReadOutlined,
    },
];

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white shadow-sm">
                        K
                    </div>
                    <div className="text-left leading-tight">
                        <p className="text-sm font-semibold text-slate-950">KeyNova Store</p>
                        <p className="text-xs text-slate-500">Bàn phím cơ</p>
                    </div>
                </Link>

                    <div className="flex items-center gap-3">
                        {auth.isAuthenticated ? (
                            <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 sm:block">
                                Xin chào, {auth?.user?.name || 'thành viên'}
                            </div>
                        ) : null}

                        {auth.isAuthenticated ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <LogoutOutlined />
                                <span>Đăng xuất</span>
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <LoginOutlined />
                                <span>Đăng nhập</span>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span className="h-2 w-2 rounded-full bg-slate-950" />
                        <span>Đi nhanh tới các trang detail</span>
                    </div>

                    <nav className="flex flex-wrap gap-2">
                        {detailLinks.map((item) => {
                            const Icon = item.icon;
                            const active = location.pathname === item.to;

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                        active
                                            ? 'bg-slate-950 text-white shadow-sm'
                                            : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    <Icon />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;