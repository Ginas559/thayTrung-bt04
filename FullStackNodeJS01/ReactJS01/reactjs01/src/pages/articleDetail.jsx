import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, BookOutlined } from '@ant-design/icons';
import { keyboardImages } from '../util/keyboardImages';

const tips = [
    'Layout 75% phù hợp người thích gọn nhưng vẫn đủ phím chức năng.',
    'Layout 60% phù hợp bàn làm việc nhỏ và cảm giác setup tối giản.',
    'TKL phù hợp khi cần trải nghiệm gõ đầm tay và vẫn giữ sự cân bằng.',
];

const ArticleDetailPage = () => {
    return (
        <main className="bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <Link to="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <ArrowLeftOutlined />
                    <span>Quay lại trang chủ</span>
                </Link>

                <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Bài viết</p>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Cách chọn bàn phím cơ theo nhu cầu sử dụng</h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-600">
                            Bố cục được tinh gọn để tập trung vào ảnh lớn, tiêu đề mạnh và một luồng nội dung mạch lạc hơn, giống cảm giác đọc một trang editorial hơn là một bài nhiều hộp.
                        </p>

                        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200 w-fit">
                            <BookOutlined />
                            <span>Hướng dẫn chọn layout và cảm giác gõ</span>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[40px] bg-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
                        <img src={keyboardImages.side} alt="Bài viết bàn phím cơ" className="h-[520px] w-full object-cover" />
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <article className="rounded-[40px] bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Gợi ý chọn bàn phím</h2>
                        <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                            {tips.map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>
                    </article>

                    <aside className="rounded-[40px] bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Điểm cần nhớ</h3>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-[28px] bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">Nhu cầu học tập</p>
                                <p className="mt-2 text-sm leading-7 text-slate-600">Ưu tiên bàn phím gọn, gõ êm, không chiếm diện tích.</p>
                            </div>
                            <div className="rounded-[28px] bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">Nhu cầu làm việc</p>
                                <p className="mt-2 text-sm leading-7 text-slate-600">Ưu tiên layout cân bằng, có đủ phím và ít mỏi tay.</p>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    );
};

export default ArticleDetailPage;