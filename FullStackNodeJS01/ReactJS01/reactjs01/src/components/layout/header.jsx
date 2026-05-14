import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white shadow-sm">
                        N
                    </div>
                    <div className="text-left leading-tight">
                        <p className="text-sm font-semibold text-slate-950">NovaBeat Store</p>
                        <p className="text-xs text-slate-500">Tai nghe bluetooth</p>
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
        </header>
    );
};

export default Header;