/**
 * # storedataActions.js
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */
const {
    GET_AREAS_REQUEST,
    GET_AREAS_SUCCESS,
    GET_AREAS_FAILURE,

    GET_WAREHOUSES_REQUEST,
    GET_WAREHOUSES_SUCCESS,
    GET_WAREHOUSES_FAILURE,

    GET_TIME_SLOTS_REQUEST,
    GET_TIME_SLOTS_SUCCESS,
    GET_TIME_SLOTS_FAILURE,

    SET_TIME_SLOTS_REQUEST,
    SET_TIME_SLOTS_SUCCESS,
    SET_TIME_SLOTS_FAILURE,

    GET_PAYMENT_METHODS_REQUEST,
    GET_PAYMENT_METHODS_SUCCESS,
    GET_PAYMENT_METHODS_FAILURE,

    GET_DELIVERY_VARIANTS_REQUEST,
    GET_DELIVERY_VARIANTS_SUCCESS,
    GET_DELIVERY_VARIANTS_FAILURE,

    GET_GROUPS_SHOP_REQUEST,
    GET_GROUPS_SHOP_SUCCESS,
    GET_GROUPS_SHOP_FAILURE,

    GET_GROUPS_EXPLORE_REQUEST,
    GET_GROUPS_EXPLORE_SUCCESS,
    GET_GROUPS_EXPLORE_FAILURE,

    GET_GOODS_SHOP_REQUEST,
    GET_GOODS_SHOP_SUCCESS,
    GET_GOODS_SHOP_FAILURE,

    GET_GOODS_EXPLORE_REQUEST,
    GET_GOODS_EXPLORE_SUCCESS,
    GET_GOODS_EXPLORE_FAILURE,

    GET_GOODS_DETAILS_REQUEST,
    GET_GOODS_DETAILS_SUCCESS,
    GET_GOODS_DETAILS_FAILURE,

    GET_MY_CART_REQUEST,
    GET_MY_CART_SUCCESS,
    GET_MY_CART_FAILURE,

    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,

    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE,

    ADD_TO_FAVORITES_REQUEST,
    ADD_TO_FAVORITES_SUCCESS,
    ADD_TO_FAVORITES_FAILURE,

    ADD_TO_ORDERS_REQUEST,
    ADD_TO_ORDERS_SUCCESS,
    ADD_TO_ORDERS_FAILURE,

    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,

    DELETE_USER_DATA_REQUEST,
    DELETE_USER_DATA_SUCCESS,
    DELETE_USER_DATA_FAILURE,

    SEARCH_GOODS_REQUEST,
    SEARCH_GOODS_SUCCESS,
    SEARCH_GOODS_FAILURE,

    LOGOUT_CLEAR_REQUEST,
    LOGOUT_CLEAR_SUCCESS,
    LOGOUT_CLEAR_FAILURE,

    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,

    SET_MESSAGE_READ_REQUEST,
    SET_MESSAGE_READ_SUCCESS,
    SET_MESSAGE_READ_FAILURE,

    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAILURE,

    SET_CHAT_READ_REQUEST,
    SET_CHAT_READ_SUCCESS,
    SET_CHAT_READ_FAILURE,

    ADD_TO_CHAT_REQUEST,
    ADD_TO_CHAT_SUCCESS,
    ADD_TO_CHAT_FAILURE,

    GET_GOODS_EXPLORE_REMAINS_REQUEST,
    GET_GOODS_EXPLORE_REMAINS_SUCCESS,
    GET_GOODS_EXPLORE_REMAINS_FAILURE,

    SEARCH_GOODS_REMAINS_REQUEST,
    SEARCH_GOODS_REMAINS_SUCCESS,
    SEARCH_GOODS_REMAINS_FAILURE,

    GET_BANNERS_REQUEST,
    GET_BANNERS_SUCCESS,
    GET_BANNERS_FAILURE,

} = require('../../config/constants').default


/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default;
const APIBackendFactory = require('../../lib/APIBackendFactory').default;

import * as AppNavigation from "../../components/nav/AppNavigation";

import Toast from 'react-native-root-toast'

const _ = require('underscore');

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

/**
 * ## getAreas actions
 */
export function getAreasRequest() {
    return {
        type: GET_AREAS_REQUEST,
    };
}
export function getAreasSuccess(json) {
    return {
        type: GET_AREAS_SUCCESS,
        payload: json,
    };
}
export function getAreasFailure(error) {
    return {
        type: GET_AREAS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getAreas
 *
 */
export function getAreas() {
    //console.log("getAreas 1");
    return dispatch => {
        dispatch(getAreasRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getAreas token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_areas({ token });
        //     })
        return APIBackendFactory().get_areas()
            .then((json) => {
                //console.log("getAreas: ", json);

                const status = json.status;
                const data = json.data.areas;

                //console.log("getAreas resp: ", status, data);

                dispatch(getAreasSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getAreasFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getWarehouses actions
 */
export function getWarehousesRequest() {
    return {
        type: GET_WAREHOUSES_REQUEST,
    };
}
export function getWarehousesSuccess(json) {
    return {
        type: GET_WAREHOUSES_SUCCESS,
        payload: json,
    };
}
export function getWarehousesFailure(error) {
    return {
        type: GET_WAREHOUSES_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getWarehouses
 *
 */
export function getWarehouses() {
    //console.log("getWarehouses 1");
    return dispatch => {
        dispatch(getWarehousesRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getWarehouses token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_warehouses({ token });
        //     })
        return APIBackendFactory().get_warehouses()
            .then((json) => {
                //console.log("getWarehouses: ", json);

                const status = json.status;
                const data = json.data.warehouses;

                //console.log("getWarehouses resp: ", status, data);

                dispatch(getWarehousesSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getWarehousesFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getTimeSlots actions
 */
export function getTimeSlotsRequest() {
    return {
        type: GET_TIME_SLOTS_REQUEST,
    };
}
export function getTimeSlotsSuccess(json) {
    return {
        type: GET_TIME_SLOTS_SUCCESS,
        payload: json,
    };
}
export function getTimeSlotsFailure(error) {
    return {
        type: GET_TIME_SLOTS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getTimeSlots
 *
 */
export function getTimeSlots() {
    //console.log("getTimeSlots 1");
    return dispatch => {
        dispatch(getTimeSlotsRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getTimeSlots token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_time_slots({ token });
            })

            .then((json) => {
                //console.log("getTimeSlots: ", json);

                const status = json.status;
                const data = json.data.timeslots;

                //console.log("getTimeSlots resp: ", status, data);

                dispatch(getTimeSlotsSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getTimeSlotsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

export function setTimeSlots(json) {
    return {
        type: SET_TIME_SLOTS_SUCCESS,
        payload: json,
    };
}


/**
 * ## getPaymentMethods actions
 */
export function getPaymentMethodsRequest() {
    return {
        type: GET_PAYMENT_METHODS_REQUEST,
    };
}
export function getPaymentMethodsSuccess(json) {
    return {
        type: GET_PAYMENT_METHODS_SUCCESS,
        payload: json,
    };
}
export function getPaymentMethodsFailure(error) {
    return {
        type: GET_PAYMENT_METHODS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getPaymentMethods
 *
 */
export function getPaymentMethods() {
    //console.log("getPaymentMethods 1");
    return dispatch => {
        dispatch(getPaymentMethodsRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getPaymentMethods token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_payment_methods({ token });
            })

            .then((json) => {
                //console.log("getPaymentMethods: ", json);

                const status = json.status;
                const data = json.data.payment_methods;

                //console.log("getPaymentMethods resp: ", status, data);

                dispatch(getPaymentMethodsSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getPaymentMethodsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getDeliveryVariants actions
 */
export function getDeliveryVariantsRequest() {
    return {
        type: GET_DELIVERY_VARIANTS_REQUEST,
    };
}
export function getDeliveryVariantsSuccess(json) {
    return {
        type: GET_DELIVERY_VARIANTS_SUCCESS,
        payload: json,
    };
}
export function getDeliveryVariantsFailure(error) {
    return {
        type: GET_DELIVERY_VARIANTS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getDeliveryVariants
 *
 */
export function getDeliveryVariants() {
    //console.log("getDeliveryVariants 1");
    return dispatch => {
        dispatch(getDeliveryVariantsRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getDeliveryVariants token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_delivery_variants({ token });
            })

            .then((json) => {
                //console.log("getDeliveryVariants: ", json);

                const status = json.status;
                const data = json.data.delivery_variants;

                //console.log("getDeliveryVariants resp: ", status, data);

                dispatch(getDeliveryVariantsSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getDeliveryVariantsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getGroupsShop actions
 */
export function getGroupsShopRequest() {
    return {
        type: GET_GROUPS_SHOP_REQUEST,
    };
}
export function getGroupsShopSuccess(json) {
    return {
        type: GET_GROUPS_SHOP_SUCCESS,
        payload: json,
    };
}
export function getGroupsShopFailure(error) {
    return {
        type: GET_GROUPS_SHOP_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGroupsShop
 *
 */
export function getGroupsShop(searchText = "") {
    //console.log("getGroupsShop 1");
    var params = { text: searchText };
    return dispatch => {
        dispatch(getGroupsShopRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGroupsShop token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_groups(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_groups(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGroupsShop: ", json);

                const status = json.status;
                const data = json.data.groups;

                console.log("getGroupsShop resp: ", status, data);

                dispatch(getGroupsShopSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGroupsShopFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getGroupsExplore actions
 */
export function getGroupsExploreRequest() {
    return {
        type: GET_GROUPS_EXPLORE_REQUEST,
    };
}
export function getGroupsExploreSuccess(json) {
    return {
        type: GET_GROUPS_EXPLORE_SUCCESS,
        payload: json,
    };
}
export function getGroupsExploreFailure(error) {
    return {
        type: GET_GROUPS_EXPLORE_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGroupsExplore
 *
 */
export function getGroupsExplore(searchText = "", is_explore) {
    //console.log("getGroupsExplore 1");
    var params = { text: searchText };
    if (is_explore !== undefined) {
        params = {
            ...params,
            explore: is_explore,
        }
    }

    return dispatch => {
        dispatch(getGroupsExploreRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGroupsExplore token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_groups(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_groups(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGroupsExplore: ", json);

                const status = json.status;
                const data = json.data.groups;

                //console.log("getGroupsExplore resp: ", status, data);

                dispatch(getGroupsExploreSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGroupsExploreFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## getGoodsShop actions
 */
export function getGoodsShopRequest() {
    return {
        type: GET_GOODS_SHOP_REQUEST,
    };
}
export function getGoodsShopSuccess(json, page, createdUser) {
    return {
        type: GET_GOODS_SHOP_SUCCESS,
        payload: { json: json, page: page, createdUser: createdUser },
    };
}
export function getGoodsShopFailure(error) {
    return {
        type: GET_GOODS_SHOP_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGoods
 *
 */
export function getGoodsShop(group_id, createdUser, searchText = "", page = 0) {
    //console.log("getGoodsShop 1");
    var params = { text: searchText, group_id: group_id, page: page };
    if (searchText === "") {
        params = { group_id: group_id, page: page };
    }
    return dispatch => {
        dispatch(getGoodsShopRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGoodsShop token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_goods(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_goods(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGoodsShop: ", json);

                const status = json.status;
                const data = json.data.goods;

                //console.log("getGoodsShop resp: ", params, json.data);

                dispatch(getGoodsShopSuccess(data, page, createdUser));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGoodsShopFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getGoodByID actions
 */
export function getGoodByIDRequest() {
    return {
        type: GET_GOODS_DETAILS_REQUEST,
    };
}
export function getGoodByIDSuccess(json, createdUser) {
    return {
        type: GET_GOODS_DETAILS_SUCCESS,
        payload: { json, createdUser }
    };
}
export function getGoodByIDFailure(error) {
    return {
        type: GET_GOODS_DETAILS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGoodByID
 *
 */
export function getGoodByID(good_id, createdUser) {
    //console.log("getGoodByID 1");
    var params = { id: good_id };
    return dispatch => {
        dispatch(getGoodByIDRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGoodByID token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_good_by_id(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_good_by_id(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGoodByID: ", json);

                const status = json.status;
                const data = json.data.good;

                //console.log("getGoodByID resp: ", status, data);

                dispatch(getGoodByIDSuccess(data, createdUser));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGoodByIDFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## getGoodsExplore actions
 */
export function getGoodsExploreRequest() {
    return {
        type: GET_GOODS_EXPLORE_REQUEST,
    };
}
export function getGoodsExploreSuccess(json, page, createdUser, group_id) {
    return {
        type: GET_GOODS_EXPLORE_SUCCESS,
        payload: { json: json, page: page, createdUser: createdUser, group_id: group_id },
    };
}
export function getGoodsExploreFailure(error) {
    return {
        type: GET_GOODS_EXPLORE_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGoodsExplore
 *
 */
export function getGoodsExplore(group_id, createdUser, searchText = "", page = 0) {
    //console.log("getGoodsExplore 1");
    var params = { text: searchText, group_id: group_id, page: page };
    return dispatch => {
        dispatch(getGoodsExploreRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGoodsExplore token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_goods(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_goods(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGoodsExplore: ", json);

                const status = json.status;
                const data = json.data.goods;

                //console.log("getGoodsExplore resp: ", status, data, page);

                dispatch(getGoodsExploreSuccess(data, page, createdUser, group_id));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGoodsExploreFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getGoodsExploreRemains actions
 */
export function getGoodsExploreRemainsRequest() {
    return {
        type: GET_GOODS_EXPLORE_REMAINS_REQUEST,
    };
}
export function getGoodsExploreRemainsSuccess(json, page, createdUser) {
    return {
        type: GET_GOODS_EXPLORE_REMAINS_SUCCESS,
        payload: { json: json, page: page, createdUser: createdUser },
    };
}
export function getGoodsExploreRemainsFailure(error) {
    return {
        type: GET_GOODS_EXPLORE_REMAINS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getGoodsExploreRemains
 *
 */
export function getGoodsExploreRemains(group_id, createdUser, searchText = "", page = 0) {
    var params = { text: searchText, group_id: group_id, page: page, remains: true };
    //console.log("getGoodsExploreRemains 1", params);
    return dispatch => {
        dispatch(getGoodsExploreRemainsRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("getGoodsExplore token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_goods(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_goods(
            {
                params: params,
            })

            .then((json) => {
                //console.log("getGoodsExploreRemains: ", json);

                const status = json.status;
                const data = json.data.goods;

                //console.log("getGoodsExploreRemains resp: ", status, data, page);

                dispatch(getGoodsExploreRemainsSuccess(data, page, createdUser));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getGoodsExploreRemainsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## getCart actions
 */
export function getCartRequest() {
    return {
        type: GET_MY_CART_REQUEST,
    };
}
export function getCartSuccess(json, page) {
    return {
        type: GET_MY_CART_SUCCESS,
        payload: { json: json, page: page }
    };
}
export function getCartFailure(error) {
    return {
        type: GET_MY_CART_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getCart
 *
 */
export function getCart(page = 0) {
    //console.log("getCart 1");
    var params = {};
    if (page !== 0) {
        params = { page: page };
    }
    return dispatch => {
        dispatch(getCartRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getCart token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_cart(
                    {
                        token: token,
                        params: params,
                    });
            })

            .then((json) => {
                //console.log("getCart: ", json);

                const status = json.status;
                const data = json.data.cart;

                //console.log("getCart resp: ", status, data);

                dispatch(getCartSuccess(data, page));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getCartFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## addToCart actions
 */
export function addToCartRequest() {
    return {
        type: ADD_TO_CART_REQUEST,
    };
}
export function addToCartSuccess(json) {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: json,
    };
}
export function addToCartFailure(error) {
    return {
        type: ADD_TO_CART_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## addToCart
 *
 */
export function addToCart(good_id, qty, price, price_info, in_stock, preorder = false) {
    //console.log("addToCart 1: ", good_id, qty, price);
    return dispatch => {
        dispatch(addToCartRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("addToCart token: ", token);
                return APIBackendFactory({ sessionToken: token }).add_to_cart(
                    {
                        token: token,
                        good_id: good_id,
                        qty: qty,
                        price: price,
                        price_info: price_info,
                        in_stock: in_stock,
                        preorder: preorder,
                    });
            })

            .then((json) => {
                //console.log("addToCart: ", json);

                const status = json.status;
                const data = json.data.cart;

                //console.log("addToCart resp: ", status, data);

                dispatch(addToCartSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(addToCartFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getFavorites actions
 */
export function getFavoritesRequest() {
    return {
        type: GET_FAVORITES_REQUEST,
    };
}
export function getFavoritesSuccess(json, page) {
    return {
        type: GET_FAVORITES_SUCCESS,
        payload: { json: json, page: page }
    };
}
export function getFavoritesFailure(error) {
    return {
        type: GET_FAVORITES_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getFavorites
 *
 */
export function getFavorites(page = 0) {
    //console.log("getFavorites 1");
    var params = { page: page };
    return dispatch => {
        dispatch(getFavoritesRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getFavorites token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_favorites(
                    {
                        token: token,
                        params: params,
                    });
            })

            .then((json) => {
                //console.log("getFavorites: ", json);

                const status = json.status;
                const data = json.data.favorites;

                //console.log("getFavorites resp: ", status, data);

                dispatch(getFavoritesSuccess(data, page));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getFavoritesFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## addToFavorites actions
 */
export function addToFavoritesRequest() {
    return {
        type: ADD_TO_FAVORITES_REQUEST,
    };
}
export function addToFavoritesSuccess(json) {
    return {
        type: ADD_TO_FAVORITES_SUCCESS,
        payload: json,
    };
}
export function addToFavoritesFailure(error) {
    return {
        type: ADD_TO_FAVORITES_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## addToFavorites
 *
 */
export function addToFavorites(good_id, active = true) {
    //console.log("addToFavorites 1: ", good_id, active);
    return dispatch => {
        dispatch(addToFavoritesRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("addToFavorites token: ", token);
                return APIBackendFactory({ sessionToken: token }).add_to_favorites(
                    {
                        token: token,
                        good_id: good_id,
                        active: active,
                    });
            })

            .then((json) => {
                //console.log("addToFavorites: ", json);

                const status = json.status;
                const data = json.data.favorite;

                //console.log("addToFavorites resp: ", status, data);

                dispatch(addToFavoritesSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(addToFavoritesFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## addToOrders actions
 */
export function addToOrdersRequest() {
    return {
        type: ADD_TO_ORDERS_REQUEST,
    };
}
export function addToOrdersSuccess(json) {
    return {
        type: ADD_TO_ORDERS_SUCCESS,
        payload: json,
    };
}
export function addToOrdersFailure(error) {
    return {
        type: ADD_TO_ORDERS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## addToOrders
 *
 */
export function addToOrders(phone, address, date_delivery, time_slot, delivery_variant, payment_method, cart, amount, delivery_amount) {
    //console.log("addToOrders 1: ", phone, address, date_delivery, time_slot, delivery_variant, payment_method, cart);
    let _cart = [];

    for (var j = 0; j < cart.length; j++) {
        _cart.push({
            good_id: cart[j].good_id,
            price: cart[j].price,
            price_info: cart[j].price_info,
            qty: cart[j].qty,
            in_stock: cart[j].in_stock,
            preorder: cart[j].preorder ? true : cart[j].in_stock === 0 ? true : false,
            user_id: cart[j].user_id,
        })
    }

    return dispatch => {
        dispatch(addToOrdersRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("addToOrders token: ", token);
                return APIBackendFactory({ sessionToken: token }).add_to_orders(
                    {
                        phone: phone,
                        address: address,
                        date_delivery: date_delivery,
                        time_slot: time_slot,
                        delivery_variant: delivery_variant,
                        payment_method: payment_method,
                        cart: _cart,
                        amount: amount,
                        delivery_amount: delivery_amount,
                    });
            })

            .then((json) => {
                //console.log("addToOrders: ", json);

                const status = json.status;
                const data = json.data.order;

                //console.log("addToOrders resp: ", status, data);

                dispatch(addToOrdersSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(addToOrdersFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getOrders actions
 */
export function getOrdersRequest() {
    return {
        type: GET_ORDERS_REQUEST,
    };
}
export function getOrdersSuccess(json) {
    return {
        type: GET_ORDERS_SUCCESS,
        payload: json,
    };
}
export function getOrdersFailure(error) {
    return {
        type: GET_ORDERS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getOrders
 *
 */
export function getOrders(page = 0) {
    //console.log("getOrders 1");
    var params = { page: page };
    return dispatch => {
        dispatch(getOrdersRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getOrders token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_orders({ token: token, params: params });
            })

            .then((json) => {
                //console.log("getOrders: ", json);

                const status = json.status;
                const data = json.data.orders;

                //console.log("getOrders resp: ", status, data);

                dispatch(getOrdersSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getOrdersFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## deleteUserData actions
 */
export function deleteUserDataRequest() {
    return {
        type: DELETE_USER_DATA_REQUEST,
    };
}
export function deleteUserDataSuccess(json) {
    return {
        type: DELETE_USER_DATA_SUCCESS,
        payload: json,
    };
}
export function deleteUserDataFailure(error) {
    return {
        type: DELETE_USER_DATA_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## deleteUserData
 *
 */
export function deleteUserData() {
    //console.log("deleteUserData 1");
    return dispatch => {
        dispatch(getAreasRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("deleteUserData token: ", token);
                return APIBackendFactory({ sessionToken: token }).delete_user_data({ token });
            })

            .then((json) => {
                console.log("deleteUserData json: ", json);

                const status = json.status;
                const data = json.data;

                console.log("deleteUserData resp: ", status, data);

                dispatch(deleteUserDataSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(deleteUserDataFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## searchGoods actions
 */
export function searchGoodsRequest() {
    return {
        type: SEARCH_GOODS_REQUEST,
    };
}
export function searchGoodsSuccess(json, page, createdUser) {
    return {
        type: SEARCH_GOODS_SUCCESS,
        payload: { json: json, page: page, createdUser: createdUser },
    };
}
export function searchGoodsFailure(error) {
    return {
        type: SEARCH_GOODS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## searchGoods
 *
 */
export function searchGoods(searchText, createdUser, page = 0) {
    //console.log("searchGoods 1");
    var params = { text: searchText, page: page };
    return dispatch => {
        dispatch(searchGoodsRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("searchGoods token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_goods(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_goods(
            {
                params: params,
            })

            .then((json) => {
                //console.log("searchGoods: ", json);

                const status = json.status;
                const data = json.data.goods;

                //console.log("searchGoods resp: ", status, data);

                dispatch(searchGoodsSuccess(data, page, createdUser));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(searchGoodsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## searchGoodsRemains actions
 */
export function searchGoodsRemainsRequest() {
    return {
        type: SEARCH_GOODS_REMAINS_REQUEST,
    };
}
export function searchGoodsRemainsSuccess(json, page, createdUser) {
    return {
        type: SEARCH_GOODS_REMAINS_SUCCESS,
        payload: { json: json, page: page, createdUser: createdUser },
    };
}
export function searchGoodsRemainsFailure(error) {
    return {
        type: SEARCH_GOODS_REMAINS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## searchGoodsRemains
 *
 */
export function searchGoodsRemains(searchText, createdUser, page = 0) {
    //console.log("searchGoods 1");
    var params = { text: searchText, page: page, remains: true };
    return dispatch => {
        dispatch(searchGoodsRemainsRequest());
        // return BackendFactory().getFirebaseToken()
        //     .then(token => {
        //         //console.log("searchGoods token: ", token);
        //         return APIBackendFactory({ sessionToken: token }).get_goods(
        //             {
        //                 token: token,
        //                 params: params,
        //             });
        //     })
        return APIBackendFactory().get_goods(
            {
                params: params,
            })

            .then((json) => {
                //console.log("searchGoodsRemains: ", json);

                const status = json.status;
                const data = json.data.goods;

                //console.log("searchGoodsRemains resp: ", status, data);

                dispatch(searchGoodsRemainsSuccess(data, page, createdUser));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(searchGoodsRemainsFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

export function logoutClear() {
    return {
        type: LOGOUT_CLEAR_SUCCESS,
    };
}


/**
 * ## getMessages actions
 */
export function getMessagesRequest() {
    return {
        type: GET_MESSAGES_REQUEST,
    };
}
export function getMessagesSuccess(json, page) {
    return {
        type: GET_MESSAGES_SUCCESS,
        payload: { json: json, page: page }
    };
}
export function getMessagesFailure(error) {
    return {
        type: GET_MESSAGES_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getMessages
 *
 */
export function getMessages(page = 0) {
    //console.log("getMessages 1");
    var params = {};
    if (page !== 0) {
        params = { page: page };
    }
    return dispatch => {
        dispatch(getMessagesRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getMessages token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_messages(
                    {
                        token: token,
                        params: params,
                    });
            })

            .then((json) => {
                //console.log("getMessages: ", json);

                const status = json.status;
                const data = json.data.messages;

                //console.log("getMessages resp: ", status, data);

                dispatch(getMessagesSuccess(data, page));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getMessagesFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## setMessageRead actions
 */
export function setMessageReadRequest() {
    return {
        type: SET_MESSAGE_READ_REQUEST,
    };
}
export function setMessageReadSuccess(json) {
    return {
        type: SET_MESSAGE_READ_SUCCESS,
        payload: json,
    };
}
export function setMessageReadFailure(error) {
    return {
        type: SET_MESSAGE_READ_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## setMessageRead
 *
 */
export function setMessageRead(message_id, active = false) {
    console.log("setMessageRead 1: ", message_id, active);
    return dispatch => {
        dispatch(setMessageReadRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                console.log("setMessageRead token: ", token);
                return APIBackendFactory({ sessionToken: token }).set_message_read(
                    {
                        token: token,
                        message_id: message_id,
                        active: active,
                    });
            })

            .then((json) => {
                //console.log("setMessageRead: ", json);

                const status = json.status;
                const result = json.result;
                const data = json.data.message;

                console.log("setMessageRead resp: ", result, status, data);

                dispatch(setMessageReadSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(setMessageReadFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getChat actions
 */
export function getChatRequest() {
    return {
        type: GET_CHAT_REQUEST,
    };
}
export function getChatSuccess(json, page) {
    return {
        type: GET_CHAT_SUCCESS,
        payload: { json: json, page: page }
    };
}
export function getChatFailure(error) {
    return {
        type: GET_CHAT_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getChat
 *
 */
export function getChat(page = 0) {
    //console.log("getChat 1");
    var params = {};
    if (page !== 0) {
        params = { page: page };
    }
    return dispatch => {
        dispatch(getChatRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("getChat token: ", token);
                return APIBackendFactory({ sessionToken: token }).get_chat(
                    {
                        token: token,
                        params: params,
                    });
            })

            .then((json) => {
                //console.log("getChat: ", json);

                const status = json.status;
                const data = json.data.chat;

                //console.log("getChat resp: ", page, status, data);

                dispatch(getChatSuccess(data, page));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getChatFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## setChatRead actions
 */
export function setChatReadRequest() {
    return {
        type: SET_CHAT_READ_REQUEST,
    };
}
export function setChatReadSuccess(json) {
    return {
        type: SET_CHAT_READ_SUCCESS,
        payload: json,
    };
}
export function setChatReadFailure(error) {
    return {
        type: SET_CHAT_READ_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## setChatRead
 *
 */
export function setChatRead(chat_id, active = false) {
    //console.log("setChatRead 1: ", chat_id, active);
    return dispatch => {
        dispatch(setChatReadRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("setChatRead token: ", token);
                return APIBackendFactory({ sessionToken: token }).set_chat_read(
                    {
                        token: token,
                        chat_id: chat_id,
                        active: active,
                    });
            })

            .then((json) => {
                //console.log("setChatRead: ", json);

                const status = json.status;
                const result = json.result;
                const data = json.data.chat;

                console.log("setChatRead resp: ", result, status, data);

                dispatch(setChatReadSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(setChatReadFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}

/**
 * ## addToChat actions
 */
export function addToChatRequest() {
    return {
        type: ADD_TO_CHAT_REQUEST,
    };
}
export function addToChatSuccess(json) {
    return {
        type: ADD_TO_CHAT_SUCCESS,
        payload: json,
    };
}
export function addToChatFailure(error) {
    return {
        type: ADD_TO_CHAT_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## addToChat
 *
 */
export function addToChat(message_text) {
    //console.log("addToChat 1: ", message_text);
    return dispatch => {
        dispatch(addToChatRequest());
        return BackendFactory().getFirebaseToken()
            .then(token => {
                //console.log("addToChat token: ", token);
                return APIBackendFactory({ sessionToken: token }).add_to_chat(
                    {
                        token: token,
                        message_text: message_text,
                    });
            })

            .then((json) => {
                //console.log("addToChat: ", json);

                const status = json.status;
                const data = json.data.chat;

                //console.log("addToChat resp: ", status, data);

                dispatch(addToChatSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(addToChatFailure(error));
                //return Promise.reject(error);
                AppNavigation.navigate("ConnectionErr", {
                    error: error.message,
                });
            });
    };
}


/**
 * ## getBanners actions
 */
export function getBannersRequest() {
    return {
        type: GET_BANNERS_REQUEST,
    };
}
export function getBannersSuccess(json) {
    return {
        type: GET_BANNERS_SUCCESS,
        payload: json,
    };
}
export function getBannersFailure(error) {
    return {
        type: GET_BANNERS_FAILURE,
        payload: _.isUndefined(error) ? null : error,
    };
}

/**
 * ## getBanners
 *
 */
export function getBanners() {
    //console.log("getBanners 1");
    return dispatch => {
        dispatch(getBannersRequest());

        return APIBackendFactory().get_banners({
            Active: true,
            banner_date_sort: 1, // обратная сортировка будет -1
        })
            .then((json) => {
                //console.log("getBanners: ", json);

                const status = json.status;
                const data = json.data.banners;

                //console.log("getBanners resp: ", status, data);

                dispatch(getBannersSuccess(data));

                return Promise.resolve({ status, data });
            })

            .catch(error => {
                dispatch(getBannersFailure(error));
                return Promise.reject(error);
                // AppNavigation.navigate("ConnectionErr", {
                //     error: error.message,
                // });
            });
    };
}