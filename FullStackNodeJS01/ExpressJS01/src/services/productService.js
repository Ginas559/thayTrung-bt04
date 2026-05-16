const Product = require('../models/product');

const seedProducts = [
    {
        slug: 'keynova-pro-75',
        name: 'KeyNova Pro 75',
        category: 'Bàn phím cơ / Gasket Mount',
        price: '2.490.000đ',
        salePrice: '1.992.000đ',
        stock: 18,
        sold: 1284,
        description: 'Layout 75%, gõ êm, LED đẹp và phù hợp làm việc lẫn giải trí.',
        highlight: 'Phù hợp người thích bố cục gọn mà vẫn có đủ phím chức năng.',
        images: [
            'https://product.hstatic.net/200000722513/product/164_acdde82a3fed4ca6b768cc6d27819253_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-1_39fbb2b4a5f64234bf139c972884fcc9_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-2_658ff33e95794ad2abdc18d61542ba4f_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-3_2a975fd9fe8d4fa8b90d5ba01609f81e_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-4_d2f58ded6fa345539e8e1831bb8ef739_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-5_22bf38ebc78b4a998f5bec65cedb2759_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-6_3dc3687a6f7e477183df288dd32378e4_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-7_72bdf88991544fd4849c5356fa00b7ec_master.jpg',
        ],
        promotionTitle: 'Giảm 20% cho KeyNova Pro 75',
        promotionDescription: 'Áp dụng cho thành viên đăng nhập trong tuần này.',
        newestLabel: 'Ra mắt 2 ngày trước',
        newestDetail: 'Layout 75%, gasket mount, gõ êm, hợp làm việc.',
        bestSellingQuantity: '1.284 lượt mua',
        bestSellingDetail: 'Mẫu bán chạy nhất nhờ cảm giác gõ dễ chịu và giá hợp lý.',
        homeOrder: 1,
    },
    {
        slug: 'keynova-mini-60',
        name: 'KeyNova Mini 60',
        category: 'Bàn phím cơ / Compact Layout',
        price: '1.890.000đ',
        salePrice: '1.590.000đ',
        stock: 9,
        sold: 982,
        description: 'Layout 60%, nhỏ gọn, keycap PBT và tối ưu góc setup.',
        highlight: 'Phù hợp bàn làm việc nhỏ và người thích không gian gọn gàng.',
        images: [
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-1_39fbb2b4a5f64234bf139c972884fcc9_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-2_658ff33e95794ad2abdc18d61542ba4f_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-4_d2f58ded6fa345539e8e1831bb8ef739_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-5_22bf38ebc78b4a998f5bec65cedb2759_master.jpg',
        ],
        promotionTitle: 'Miễn phí ship nội thành',
        promotionDescription: 'Giao nhanh trong 2 giờ cho khu vực trung tâm thành phố.',
        newestLabel: 'Ra mắt tuần này',
        newestDetail: 'Thiết kế nhỏ gọn, gọn bàn làm việc, keycap PBT.',
        bestSellingQuantity: '982 lượt mua',
        bestSellingDetail: 'Bàn phím nhỏ gọn, LED đẹp, rất hợp góc setup.',
        homeOrder: 2,
    },
    {
        slug: 'keynova-studio-tkl',
        name: 'KeyNova Studio TKL',
        category: 'Bàn phím cơ / TKL',
        price: '3.190.000đ',
        salePrice: '2.690.000đ',
        stock: 7,
        sold: 746,
        description: 'TKL cân bằng, gõ đầm tay, hợp học tập, code và làm việc dài giờ.',
        highlight: 'Phù hợp người cần trải nghiệm gõ chắc tay và ít chi tiết thừa.',
        images: [
            'https://product.hstatic.net/200000722513/product/164_acdde82a3fed4ca6b768cc6d27819253_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-3_2a975fd9fe8d4fa8b90d5ba01609f81e_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-4_d2f58ded6fa345539e8e1831bb8ef739_master.jpg',
            'https://product.hstatic.net/200000722513/product/gearvn-ban-phim-mikit-cl80-lavenderry-low-profile-ttc-mini-gold-pink-6_3dc3687a6f7e477183df288dd32378e4_master.jpg',
        ],
        promotionTitle: 'Tặng kê tay silicone',
        promotionDescription: 'Áp dụng cho đơn hàng bàn phím cơ từ 2.000.000đ.',
        newestLabel: 'Ra mắt tháng này',
        newestDetail: 'Tối ưu cho game và công việc với ánh sáng đẹp.',
        bestSellingQuantity: '746 lượt mua',
        bestSellingDetail: 'Phiên bản cao cấp, gõ đầm tay, cân bằng cho cả học tập và làm việc.',
        homeOrder: 3,
    },
];

const ensureSeedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany(seedProducts);
    }
};

const getProductsService = async () => {
    await ensureSeedProducts();
    return Product.find({}).sort({ homeOrder: 1 }).lean();
};

const getProductBySlugService = async (slug) => {
    await ensureSeedProducts();
    return Product.findOne({ slug }).lean();
};

module.exports = {
    getProductsService,
    getProductBySlugService,
};