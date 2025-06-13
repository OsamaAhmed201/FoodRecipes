import axios from "axios";

let baseURL = `https://upskilling-egypt.com:3006/api/v1`
export let baseIMG = `https://upskilling-egypt.com:3006/`


export const axiosInstance = axios.create(
    { baseURL, headers: { Authorization: localStorage.getItem('token') } });

//////////UserApi

    export const USERS_URLS = {
        LOGIN: `/Users/Login`,
        REGISTER: `/Users/Register`,
        FORGET_PASSWORD: `/Users/Reset/Request`,
        RESET_PASSWORD: `/Users/Reset`,
        VERIFY: `/Users/verify`,
        GET_ALL_USERS: `/Users/`,
        GET_USER_BY_ID: (id) => `/Users/${id}`,
        UPDATE_USER: (id) => `/Users/${id}`,
        DELETE_USER: (id) => `/Users/${id}`,
        CHANGE_PASSWORD: `/Users/ChangePassword`,
        UPDATE_PROFILE: `/Users/`,
        CURRENT_USER:`/Users/currentUser`
    }

//////////CategoriesApi
export const CATEGORIES_URLS = {
    ADD_CATEGORY: `/Category`,
    GET_ALL_CATEGORIES: `/Category`,
    GET_CATEGORY_BY_ID: (id) => `/Category/${id}`,
    UPDATE_CATEGORY: (id) => `/Category/${id}`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
}
//////////RecipeApi
export const RECIPES_URLS = {
    ADD_RECIPE: `/Recipe/`,
    GET_ALL_RECIPES: `/Recipe`,
    GET_RECIPE_BY_ID: (id) => `/Recipe/${id}`,
    UPDATE_RECIPE: (id) => `/Recipe/${id}`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
}
//////////TagsApi
export const TAGS_URLS = {
    GET_ALL_TAGS: `/tag/`,
}
/////////favs
export const FAVS_URLS = {
    ADD_FAVS: `/userRecipe/`,
    GET_ALL_FAVS: `/userRecipe/`,
    DELETE_FAV: (id) => `/userRecipe/${id}`,
}
