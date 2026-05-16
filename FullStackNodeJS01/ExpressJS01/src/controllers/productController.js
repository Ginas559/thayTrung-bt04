const { getProductsService, getProductBySlugService } = require('../services/productService');

const getProducts = async (req, res) => {
    const data = await getProductsService();
    return res.status(200).json(data);
};

const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await getProductBySlugService(slug);

    if (!data) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(data);
};

module.exports = {
    getProducts,
    getProductBySlug,
};