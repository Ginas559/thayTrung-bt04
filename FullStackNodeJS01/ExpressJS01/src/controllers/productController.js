const { getProductsService, getProductBySlugService } = require('../services/productService');
const { createProductService, updateProductService, deleteProductService } = require('../services/productService');

const getProducts = async (req, res) => {
    const data = await getProductsService(req.query);
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

const createProduct = async (req, res) => {
    const payload = req.body;
    const created = await createProductService(payload);
    if (!created) return res.status(400).json({ message: 'Create product failed' });
    return res.status(201).json(created);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const updated = await updateProductService(id, payload);
    if (!updated) return res.status(400).json({ message: 'Update product failed' });
    return res.status(200).json(updated);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteProductService(id);
    if (!deleted) return res.status(400).json({ message: 'Delete product failed' });
    return res.status(200).json({ message: 'Deleted' });
};

module.exports = {
    getProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
};
