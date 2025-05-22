import axios from "axios";

let baseURL = `https://upskilling-egypt.com:3006/api/v1`

export const axiosInstance = axios.create(
    { baseURL, headers: { Authorization: localStorage.getItem('token') } });

//////////UserApi

export const USERS_URLS = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    RESET_PASSWORD: `/Users/Reset`,
    VERIFY: `/Users/verify`
}

//////////CategoriesApi
export const CATEGORIES_URLS = {
    ADD_CATEGORY: `/Category`,
    GET_ALL_CATEGORIES: `/Category`,
    GET_CATEGORY_BY_ID: (id) => `/Category/${id}`,
    UPDATE_CATEGORY: (id) => `/Category/${id}`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
}
