import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    }
    return axios.post(URL_API, data)
}

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password
    }
    return axios.post(URL_API, data)
}

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API)
}

const getAccountApi = () => {
    const URL_API = "/v1/api/account";
    return axios.get(URL_API)
}

const getProductsApi = (params = {}) => {
    const URL_API = "/v1/api/products";
    return axios.get(URL_API, { params });
};

const getProductBySlugApi = (slug) => {
    const URL_API = `/v1/api/products/${slug}`;
    return axios.get(URL_API);
};

const createProductApi = (data) => axios.post('/v1/api/admin/products', data);
const updateProductApi = (id, data) => axios.put(`/v1/api/admin/products/${id}`, data);
const deleteProductApi = (id) => axios.delete(`/v1/api/admin/products/${id}`);

export {
    createUserApi, loginApi, getUserApi, getAccountApi, getProductsApi, getProductBySlugApi,
    createProductApi, updateProductApi, deleteProductApi
}