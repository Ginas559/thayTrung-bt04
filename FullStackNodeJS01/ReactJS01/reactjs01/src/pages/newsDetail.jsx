import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import { keyboardImages } from '../util/keyboardImages';

const newsTags = [
    'Mở bán',
    'Ưu đãi',
    'Keycap mới',
];

const relatedNews = [
    {
        title: 'KeyNova Pro 75 lên kệ đợt mới',
        time: 'Hôm nay',
    },
    {
        title: 'Mini 60 bán chạy trong tuần đầu',
        time: '2 ngày trước',
    },
    {
        title: 'Bàn phím TKL nào hợp học tập',
        time: '5 ngày trước',
    },
];

const NewsDetailPage = () => {
    return (
        <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <Link to="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <ArrowLeftOutlined />
                    <span>Quay lại trang chủ</span>
                </Link>

                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tin tức</p>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">KeyNova mở bán đợt mới với nhiều màu keycap</h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-600">
                            Một bản tin ngắn, nhiều khoảng thở, hình lớn và ít khối hơn để giữ cảm giác premium, giống một trang giới thiệu sản phẩm của Apple hơn là một bài viết nặng chữ.
                        </p>

                        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                                <ClockCircleOutlined />
                                <span>Đăng hôm nay</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                                <FireOutlined />
                                <span>Ưu đãi đang nóng</span>
                            </span>
                            {newsTags.map((item) => (
                                <span key={item} className="rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[40px] bg-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
                        <img src={keyboardImages.hero} alt="Tin tức bàn phím cơ" className="h-[520px] w-full object-cover" />
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <article className="rounded-[40px] bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Nội dung tin</h2>
                        <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                            <p>KeyNova công bố đợt hàng mới gồm nhiều lựa chọn về layout và màu keycap cho người dùng thích setup gọn.</p>
                            <p>Lượng hàng tồn ban đầu đủ cho đơn đặt trước, số lượng bán dự kiến sẽ tăng trong tuần đầu mở bán.</p>
                            <p>Trang này tách riêng với trang chi tiết sản phẩm để em có nhiều link detail đúng yêu cầu đề.</p>
                        </div>
                    </article>

                    <aside className="rounded-[40px] bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Tin liên quan</h3>
                        <div className="mt-6 space-y-3">
                            {relatedNews.map((item) => (
                                <div key={item.title} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                                        <p className="mt-1 text-sm text-slate-500">{item.time}</p>
                                    </div>
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-300" />
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    );
};

export default NewsDetailPage;