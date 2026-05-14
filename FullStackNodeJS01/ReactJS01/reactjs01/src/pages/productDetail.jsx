import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    CheckOutlined,
    LeftOutlined,
    MinusOutlined,
    RightOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { logout } from '../redux/authSlice';
import { keyboardImages, keyboardImageList } from '../util/keyboardImages';

const productData = {
    'keynova-pro-75': {
        name: 'KeyNova Pro 75',
        category: 'Bàn phím cơ / Gasket Mount',
        price: '2.490.000đ',
        salePrice: '1.992.000đ',
        stock: 18,
        sold: 1284,
        description: 'Layout 75%, gõ êm, LED đẹp và phù hợp làm việc lẫn giải trí.',
        images: keyboardImageList,
        highlight: 'Phù hợp người thích bố cục gọn mà vẫn có đủ phím chức năng.',
    },
    'keynova-mini-60': {
        name: 'KeyNova Mini 60',
        category: 'Bàn phím cơ / Compact Layout',
        price: '1.890.000đ',
        salePrice: '1.590.000đ',
        stock: 9,
        sold: 982,
        description: 'Layout 60%, nhỏ gọn, keycap PBT và tối ưu góc setup.',
        images: [keyboardImages.compact, keyboardImages.side, keyboardImages.alt, keyboardImages.detail],
        highlight: 'Phù hợp bàn làm việc nhỏ và người thích không gian gọn gàng.',
    },
    'keynova-studio-tkl': {
        name: 'KeyNova Studio TKL',
        category: 'Bàn phím cơ / TKL',
        price: '3.190.000đ',
        salePrice: '2.690.000đ',
        stock: 7,
        sold: 746,
        description: 'TKL cân bằng, gõ đầm tay, hợp học tập, code và làm việc dài giờ.',
        images: [keyboardImages.feature, keyboardImages.hero, keyboardImages.alt, keyboardImages.detail],
        highlight: 'Phù hợp người cần trải nghiệm gõ chắc tay và ít chi tiết thừa.',
    },
};

const similarProducts = [
    {
        slug: 'keynova-mini-60',
        name: 'KeyNova Mini 60',
        category: 'Compact',
        image: keyboardImages.side,
    },
    {
        slug: 'keynova-studio-tkl',
        name: 'KeyNova Studio TKL',
        category: 'TKL',
        image: keyboardImages.feature,
    },
    {
        slug: 'keynova-pro-75',
        name: 'KeyNova Pro 75',
        category: 'Gasket Mount',
        image: keyboardImages.compact,
    },
];

const ProductDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const product = useMemo(() => {
        return productData[slug] || productData['keynova-pro-75'];
    }, [slug]);

    useEffect(() => {
        swiperInstance?.slideTo(0, 0);
        swiperInstance?.update();
    }, [product, swiperInstance]);

    const displayedImageIndex = Math.min(activeImageIndex, product.images.length - 1);

    const stockStatus = product.stock > 10 ? 'Còn hàng' : 'Sắp hết hàng';
    const remainingText = product.stock > 0 ? `${product.stock} sản phẩm` : 'Hết hàng';

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(logout());
        navigate('/');
    };

    const handleIncreaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Chi tiết sản phẩm</p>
                                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{product.name}</h1>
                                <p className="mt-3 text-base leading-8 text-slate-600">{product.category}</p>
                            </div>
                            <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 md:block">
                                {auth.isAuthenticated ? `Xin chào, ${auth?.user?.name || 'thành viên'}` : 'Khách truy cập'}
                            </div>
                        </div>

                        <div className="min-w-0 overflow-hidden rounded-[40px] bg-[#0f172a] shadow-[0_20px_60px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/10 lg:max-w-[760px]">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation={{ nextEl: '.product-next', prevEl: '.product-prev' }}
                                pagination={{ clickable: true }}
                                slidesPerView={1}
                                centeredSlides
                                spaceBetween={0}
                                onSwiper={setSwiperInstance}
                                onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                                watchOverflow
                                observer
                                observeParents
                                updateOnWindowResize
                                className="product-detail-swiper w-full max-w-full min-w-0 overflow-hidden mx-auto"
                                style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}
                            >
                                {product.images.map((item, index) => (
                                    <SwiperSlide key={item}>
                                        <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%),linear-gradient(180deg,#111827_0%,#0f172a_100%)] px-4 py-4 sm:aspect-[16/9] sm:px-8 sm:py-8">
                                            <img
                                                src={item}
                                                alt={`${product.name} ${index + 1}`}
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                referrerPolicy="no-referrer"
                                                className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}

                                <button
                                    type="button"
                                    className="product-prev absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition hover:bg-white"
                                    aria-label="Ảnh trước"
                                >
                                    <LeftOutlined />
                                </button>

                                <button
                                    type="button"
                                    className="product-next absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition hover:bg-white"
                                    aria-label="Ảnh tiếp theo"
                                >
                                    <RightOutlined />
                                </button>
                            </Swiper>
                        </div>

                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                            {product.images.map((item, index) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setActiveImageIndex(index);
                                        swiperInstance?.slideTo(index);
                                    }}
                                    className={`overflow-hidden rounded-[24px] ring-1 transition ${
                                        displayedImageIndex === index ? 'ring-slate-950 shadow-md' : 'ring-slate-200/70 hover:ring-slate-400'
                                    }`}
                                >
                                    <div className="bg-[#0f172a] p-2">
                                        <img
                                            src={item}
                                            alt={`${product.name} thumb ${index + 1}`}
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                            className="h-16 w-full object-contain"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[24px] bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600 ring-1 ring-slate-200/70">
                                {product.highlight}
                            </div>
                            <div className="rounded-[24px] bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600 ring-1 ring-slate-200/70">
                                Layout: {product.category.split(' / ')[1]}
                            </div>
                            <div className="rounded-[24px] bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600 ring-1 ring-slate-200/70">
                                Số lượng bán được: {product.sold.toLocaleString('vi-VN')}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-[36px] bg-slate-50 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Thuộc danh mục</p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{product.category}</h2>
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/70">
                                    <ShoppingCartOutlined />
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-[26px] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200/60">
                                    <p className="text-sm text-slate-500">Giá gốc</p>
                                    <p className="mt-1 text-lg text-slate-400 line-through">{product.price}</p>
                                </div>
                                <div className="rounded-[26px] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200/60">
                                    <p className="text-sm text-slate-500">Giá bán</p>
                                    <p className="mt-1 text-3xl font-semibold text-slate-950">{product.salePrice}</p>
                                </div>
                                <div className="rounded-[26px] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200/60">
                                    <p className="text-sm text-slate-500">Tồn kho</p>
                                    <p className="mt-1 text-lg font-semibold text-slate-950">{remainingText}</p>
                                    <p className="mt-1 text-sm text-slate-500">Trạng thái: {stockStatus}</p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                                <p className="text-sm font-medium text-slate-500">{product.description}</p>
                                <div className="mt-5 flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleDecreaseQuantity}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                                    >
                                        <MinusOutlined />
                                    </button>
                                    <div className="flex h-11 min-w-16 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm">
                                        {quantity}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleIncreaseQuantity}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                                    >
                                        <PlusOutlined />
                                    </button>
                                    <div className="ml-auto text-right">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Tạm tính</p>
                                        <p className="text-lg font-semibold text-slate-950">{product.salePrice}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    <ShoppingCartOutlined />
                                    <span>Thêm vào giỏ</span>
                                </button>
                                {auth.isAuthenticated ? (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                                    >
                                        <UserOutlined />
                                        <span>Đăng xuất</span>
                                    </button>
                                ) : null}
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/60">
                                <CheckOutlined className="text-emerald-500" />
                                <span className="text-sm text-slate-600">Bảo hành 12 tháng, kiểm tra trước khi giao.</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overflow-hidden rounded-[36px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-900 shadow-sm ring-1 ring-slate-200/70">
                                <StarOutlined />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Sản phẩm tương tự</p>
                                <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Những mẫu cùng danh mục</h3>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {similarProducts.map((item) => (
                                <Link key={item.slug} to={`/product/${item.slug}`} className="overflow-hidden rounded-[28px] bg-slate-50 transition hover:-translate-y-0.5 hover:shadow-md">
                                    <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
                                    <div className="p-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.category}</p>
                                        <p className="mt-2 text-lg font-semibold text-slate-950">{item.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProductDetailPage;
