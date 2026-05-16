const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: String, required: true },
        salePrice: { type: String, required: true },
        stock: { type: Number, required: true },
        sold: { type: Number, required: true },
        description: { type: String, required: true },
        highlight: { type: String, required: true },
        images: { type: [String], default: [] },
        promotionTitle: { type: String, default: '' },
        promotionDescription: { type: String, default: '' },
        newestLabel: { type: String, default: '' },
        newestDetail: { type: String, default: '' },
        bestSellingQuantity: { type: String, default: '' },
        bestSellingDetail: { type: String, default: '' },
        homeOrder: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;