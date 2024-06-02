/**
 * # storedataReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 *
 * InitialState
 */
import { REHYDRATE } from 'redux-persist';
import CONFIG from '../../config/config';

import InitialState from './storedataInitialState'

/**
 * Device actions to test
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

const initialState = new InitialState()

/**
 * ## storedataReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function storedataReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state)

    //console.log("storedataReducer: ", state);

    switch (action.type) {

        case GET_AREAS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_AREAS_SUCCESS:
            const areas = action.payload;
            let areasDropDownItems = [];
            for (var i = 0; i < areas.length; i++) {
                areasDropDownItems.push({ label: areas[i].name, value: areas[i]._id });
            }
            //console.log("GET_AREAS_SUCCESS: ", areasDropDownItems);
            return state
                .set('isFetching', false)
                .set('areasDropDownItems', areasDropDownItems)
                .set('areas', [...areas]);

        case GET_AREAS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case GET_WAREHOUSES_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_WAREHOUSES_SUCCESS:
            const warehouses = action.payload;
            let warehousesDropDownItems = [];
            for (var i = 0; i < warehouses.length; i++) {
                warehousesDropDownItems.push({ label: warehouses[i].name, value: warehouses[i]._id });
            }
            //console.log("GET_WAREHOUSES_SUCCESS: ", warehousesDropDownItems);
            return state
                .set('isFetching', false)
                .set('warehousesDropDownItems', warehousesDropDownItems)
                .set('warehouses', [...warehouses]);

        case GET_WAREHOUSES_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case GET_TIME_SLOTS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_TIME_SLOTS_SUCCESS:
            const timeslots = action.payload;
            //console.log("GET_TIME_SLOTS_SUCCESS: ", timeslots);
            return state
                .set('isFetching', false)
                .set('timeSlots', [...timeslots]);

        case GET_TIME_SLOTS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_PAYMENT_METHODS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_PAYMENT_METHODS_SUCCESS:
            const payment_methods = action.payload;
            //console.log("GET_PAYMENT_METHODS_SUCCESS: ", payment_methods);
            return state
                .set('isFetching', false)
                .set('paymentMethods', [...payment_methods]);

        case GET_PAYMENT_METHODS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_DELIVERY_VARIANTS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_DELIVERY_VARIANTS_SUCCESS:
            const delivery_variants = action.payload;
            //console.log("GET_DELIVERY_VARIANTS_SUCCESS: ", delivery_variants);
            return state
                .set('isFetching', false)
                .set('deliveryVariants', [...delivery_variants]);

        case GET_DELIVERY_VARIANTS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case SET_TIME_SLOTS_SUCCESS:
            const settimeslots = action.payload;
            //console.log("SET_TIME_SLOTS_SUCCESS: ", settimeslots);
            return state
                .set('isFetching', false)
                .set('selectedTimeSlot', { ...settimeslots });

        case GET_GROUPS_SHOP_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GROUPS_SHOP_SUCCESS:
            const groups = action.payload;
            //console.log("GET_GROUPS_SUCCESS: ", groups);
            return state
                .set('isFetching', false)
                .set('groupsShop', [...groups])
                .set('groupsShopFiltered', [...groups]);

        case GET_GROUPS_SHOP_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_GROUPS_EXPLORE_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GROUPS_EXPLORE_SUCCESS:
            const groups2 = action.payload;

            //console.log("GET_GROUPS_SUCCESS: ", groups2);
            return state
                .set('isFetching', false)
                .set('groupsExplore', [...groups2])
                .set('groupsExploreFiltered', [...groups2]);

        case GET_GROUPS_EXPLORE_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_GOODS_SHOP_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GOODS_SHOP_SUCCESS:

            const goods = action.payload.json;
            const page = action.payload.page;
            const createdUser = action.payload.createdUser;
            const price_type_id_user = createdUser ? createdUser.price_type_id : undefined;

            //console.log("GET_GOODS_SHOP_SUCCESS: ", goods[0], createdUser);

            if (goods.length === 0 && page !== 0) {
                var next = state
                    .set("endReachedGoodShopPage", true)
                    .set("isFetching", false);

                return next;
            }

            // + PRICE LISTS
            if (price_type_id_user) {
                for (var i = 0; i < goods.length; i++) {
                    if (goods[i].pricelists) {
                        const index_goods = goods[i].pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user);
                        if (index_goods !== -1) {
                            if (goods[i].pricelists[index_goods].Active) {
                                goods[i] = {
                                    ...goods[i],
                                    price: goods[i].pricelists[index_goods].price,
                                    price_info: goods[i].pricelists[index_goods].price_info,
                                };
                                //console.log("GET_GOODS_SHOP_SUCCESS 1: ", goods[i].pricelists[index_goods]);
                            }
                        }
                    }
                }
            }
            // + PRICE LISTS

            let goodsShopState = [];
            if (page !== 0) { // если первая страница, то сбрасываем массив в 0
                goodsShopState = state.goodsShop.map(value => ({ ...value }));
            }
            goodsShopState = goodsShopState.concat(goods);
            let goodsFiltered = [...goodsShopState];
            const lastGoodShopPage = goods.length !== 0 ? page + 1 : page;

            var myCart1 = state.myCart;
            for (var j = 0; j < myCart1.length; j++) {
                const index_goods = goodsFiltered.map((i) => i._id).indexOf(myCart1[j].good_id);
                if (myCart1[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goodsFiltered[index_goods] = {
                        ...goodsFiltered[index_goods],
                        ordered_qty: myCart1[j].qty,
                    }
                }
                else {
                    delete goodsFiltered[index_goods].ordered_qty;
                }
            }
            var exclusiveGoodsFiltered = [...goodsFiltered].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.exclusive_group_id
            ).slice(0, 3);
            var bestsellingGoodsFiltered = [...goodsFiltered].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.bestselling_group_id
            ).slice(0, 3);
            var groceriesGoodsFiltered = [...goodsFiltered].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.groceries_group_id
            ).slice(0, 3);

            //console.log("GET_GOODS_SHOP_SUCCESS: ", goodsFiltered);
            return state
                .set('isFetching', false)
                .set('lastGoodShopPage', lastGoodShopPage)
                .set('endReachedGoodShopPage', false)
                .set('goodsShop', [...goodsFiltered])
                .set('goodsShopFiltered', [...goodsFiltered])
                .set('exclusiveGoodsFiltered', [...exclusiveGoodsFiltered])
                .set('bestsellingGoodsFiltered', [...bestsellingGoodsFiltered])
                .set('groceriesGoodsFiltered', [...groceriesGoodsFiltered]);

        case GET_GOODS_SHOP_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_GOODS_EXPLORE_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GOODS_EXPLORE_SUCCESS:
            const goods3 = action.payload.json;
            const page3 = action.payload.page;
            const createdUser2 = action.payload.createdUser;
            const group_id = action.payload.group_id;
            const price_type_id_user2 = createdUser2 ? createdUser2.price_type_id : undefined;
            const lastGoodExplorePage = page3 + 1;

            //console.log("GET_GOODS_EXPLORE_SUCCESS 1: ", lastGoodExplorePage, goods3.length, page3, group_id);

            if (state.goodsExploreGroupId === group_id && page3 === 0) {

                var next = state
                    .set("endReachedGoodExplorePage", true)
                    .set('lastGoodExplorePage', lastGoodExplorePage)
                    .set("isFetching", false);

                return next;
            }
            if (goods3.length === 0 && page3 !== 0) {
                if (state.goodsExploreGroupId === group_id) {
                    var next = state
                        .set("endReachedGoodExplorePage", true)
                        .set('lastGoodExplorePage', lastGoodExplorePage)
                        .set("isFetching", false);
                } else {
                    var next = state
                        .set("endReachedGoodExplorePage", true)
                        .set('lastGoodExplorePage', lastGoodExplorePage)
                        .set("goodsExploreGroupId", group_id)
                        .set("isFetching", false);
                }
                return next;
            }

            // + PRICE LISTS
            if (price_type_id_user2) {
                for (var i = 0; i < goods3.length; i++) {
                    if (goods3[i].pricelists) {
                        const index_goods = goods3[i].pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user2);
                        if (index_goods !== -1) {
                            if (goods3[i].pricelists[index_goods].Active) {
                                goods3[i] = {
                                    ...goods3[i],
                                    price: goods3[i].pricelists[index_goods].price,
                                    price_info: goods3[i].pricelists[index_goods].price_info,
                                };
                                //console.log("GET_GOODS_SHOP_SUCCESS 1: ", goods[i].pricelists[index_goods]);
                            }
                        }
                    }
                }
            }
            // + PRICE LISTS

            for (var i = 0; i < goods3.length; i++) {
                goods3[i] = {
                    ...goods3[i],
                    preorder: true,
                };
            }

            let goodsExploreState = [];
            if (page3 !== 0) { // если первая страница, то сбрасываем массив в 0
                goodsExploreState = state.goodsExplore.map(value => ({ ...value }));
            }
            goodsExploreState = goodsExploreState.concat(goods3);
            const goodsFiltered3 = [...goodsExploreState];


            var myCart3 = state.myCart;
            for (var j = 0; j < myCart3.length; j++) {
                const index_goods = goodsFiltered3.map((i) => i._id).indexOf(myCart3[j].good_id);
                if (myCart3[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goodsFiltered3[index_goods] = {
                        ...goodsFiltered3[index_goods],
                        ordered_qty: myCart3[j].qty,
                    }
                }
                else {
                    delete goodsFiltered3[index_goods].ordered_qty;
                }
            }

            //console.log("GET_GOODS_SUCCESS: ", goodsFiltered);
            return state
                .set('isFetching', false)
                .set('lastGoodExplorePage', lastGoodExplorePage)
                .set("goodsExploreGroupId", group_id)
                .set('endReachedGoodExplorePage', false)
                .set('goodsExplore', [...goodsFiltered3])
                .set('goodsExploreFiltered', [...goodsFiltered3])

        case GET_GOODS_EXPLORE_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case GET_GOODS_EXPLORE_REMAINS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GOODS_EXPLORE_REMAINS_SUCCESS:
            const goods7 = action.payload.json;
            const page7 = action.payload.page;
            const createdUser7 = action.payload.createdUser;
            const price_type_id_user7 = createdUser7 ? createdUser7.price_type_id : undefined;

            //console.log("GET_GOODS_EXPLORE_REMAINS_SUCCESS 1: ", goods7[0]);

            if (goods7.length === 0 && page7 !== 0) {
                var next = state
                    .set("endReachedGoodExploreRemainsPage", true)
                    .set("isFetching", false);

                return next;
            }

            // + PRICE LISTS
            if (price_type_id_user7) {
                for (var i = 0; i < goods7.length; i++) {
                    if (goods7[i].pricelists) {
                        const index_goods = goods7[i].pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user7);
                        if (index_goods !== -1) {
                            if (goods7[i].pricelists[index_goods].Active) {
                                goods7[i] = {
                                    ...goods7[i],
                                    price: goods7[i].pricelists[index_goods].price,
                                    price_info: goods7[i].pricelists[index_goods].price_info,
                                };
                                //console.log("GET_GOODS_SHOP_SUCCESS 1: ", goods[i].pricelists[index_goods]);
                            }
                        }
                    }
                }
            }
            // + PRICE LISTS

            for (var i = 0; i < page7.length; i++) {
                page7[i] = {
                    ...page7[i],
                    preorder: false,
                };
            }

            let goodsExploreState7 = [];
            if (page7 !== 0) { // если первая страница, то сбрасываем массив в 0
                goodsExploreState7 = state.goodsExploreRemains.map(value => ({ ...value }));
            }
            goodsExploreState7 = goodsExploreState7.concat(goods7);
            const goodsFiltered7 = [...goodsExploreState7];
            const lastGoodExplorePage7 = goods7.length !== 0 ? page7 + 1 : page7;

            var myCart7 = state.myCart;
            for (var j = 0; j < myCart7.length; j++) {
                const index_goods = goodsFiltered7.map((i) => i._id).indexOf(myCart7[j].good_id);
                if (myCart7[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goodsFiltered7[index_goods] = {
                        ...goodsFiltered7[index_goods],
                        ordered_qty: myCart7[j].qty,
                    }
                }
                else {
                    delete goodsFiltered7[index_goods].ordered_qty;
                }
            }

            const goodsFiltered7_final = goodsFiltered7.sort((a, b) => b.in_stock - a.in_stock);
            //console.log("GET_GOODS_SUCCESS: ", goodsFiltered);
            return state
                .set('isFetching', false)
                .set('lastGoodExploreRemainsPage', lastGoodExplorePage7)
                .set('endReachedGoodExploreRemainsPage', false)
                .set('goodsExploreRemains', [...goodsFiltered7])
                .set('goodsExploreRemainsFiltered', [...goodsFiltered7_final])

        case GET_GOODS_EXPLORE_REMAINS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_GOODS_DETAILS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_GOODS_DETAILS_SUCCESS:
            const good = action.payload.json;
            const createdUser1 = action.payload.createdUser;
            const price_type_id_user1 = createdUser1 ? createdUser1.price_type_id : undefined;

            let goodDetails = { ...good };

            // + PRICE LISTS
            if (price_type_id_user1) {
                if (goodDetails.pricelists) {
                    const index_goods = goodDetails.pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user1);
                    if (index_goods !== -1) {
                        if (goodDetails.pricelists[index_goods].Active) {
                            goodDetails = {
                                ...goodDetails,
                                price: goodDetails.pricelists[index_goods].price,
                                price_info: goodDetails.pricelists[index_goods].price_info,
                            };
                        }
                    }
                }
            }
            // + PRICE LISTS

            const myCart4 = state.myCart;
            for (var j = 0; j < myCart4.length; j++) {
                const index_goods = goodDetails._id === myCart4[j].good_id;
                if (index_goods) {
                    if (myCart4[j].qty !== 0.00)// with 0.00 - removed from cart
                    {
                        goodDetails = {
                            ...goodDetails,
                            ordered_qty: myCart4[j].qty,
                        }
                    }
                    else {
                        delete goodDetails.ordered_qty;
                    }
                }
            }

            let myFavorites = state.myFavorites;
            for (var j = 0; j < myFavorites.length; j++) {
                const index_goods = goodDetails._id === myFavorites[j].good_id;
                if (index_goods) {
                    if (myFavorites[j].active === true) {
                        goodDetails = {
                            ...goodDetails,
                            favorites: true,
                        }
                    }
                    else {
                        delete goodDetails.favorites;
                    }
                }
            }

            //console.log("GET_GOODS_DETAILS_SUCCESS: ", myFavorites, goodDetails);
            return state
                .set('isFetching', false)
                .set('goodsDetails', { ...goodDetails });

        case GET_GOODS_DETAILS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_MY_CART_REQUEST: {
            return state
                .set('isFetching', true);
        }

        case GET_MY_CART_SUCCESS:
            const _cart = action.payload.json;
            const page1 = action.payload.page;

            if (_cart.length === 0 && page1 !== 0) {
                var next = state
                    .set("endReachedCartPage", true)
                    .set("isFetching", false);

                return next;
            }

            let myCartState = [];
            if (page1 !== 0) { // если первая страница, то сбрасываем массив в 0
                myCartState = state.myCart.map(value => ({ ...value }));
            }
            myCartState = myCartState.concat(_cart);
            const lastCartPage = _cart.length !== 0 ? page1 + 1 : page1;

            let cart = myCartState.filter(
                (crt) =>
                    crt.qty !== 0.00
            );

            // goods shop
            var goods1 = state.goodsShop.map(value => ({ ...value }));
            for (var j = 0; j < cart.length; j++) {
                const index_goods = goods1.map((i) => i._id).indexOf(cart[j].good_id);
                if (cart[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goods1[index_goods] = {
                        ...goods1[index_goods],
                        ordered_qty: cart[j].qty,
                    }
                }
                else {
                    delete goods1[index_goods].ordered_qty;
                }
            }
            var exclusiveGoodsFiltered1 = [...goods1].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.exclusive_group_id
            ).slice(0, 3);
            var bestsellingGoodsFiltered1 = [...goods1].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.bestselling_group_id
            ).slice(0, 3);
            var groceriesGoodsFiltered1 = [...goods1].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.groceries_group_id
            ).slice(0, 3);

            // goods explore
            var goods4 = state.goodsExplore.map(value => ({ ...value }));
            for (var j = 0; j < cart.length; j++) {
                const index_goods = goods4.map((i) => i._id).indexOf(cart[j].good_id);
                if (cart[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goods4[index_goods] = {
                        ...goods4[index_goods],
                        ordered_qty: cart[j].qty,
                    }
                }
                else {
                    delete goods4[index_goods].ordered_qty;
                }
            }

            // goods explore remains
            var goods11 = state.goodsExploreRemains.map(value => ({ ...value }));
            for (var j = 0; j < cart.length; j++) {
                const index_goods = goods11.map((i) => i._id).indexOf(cart[j].good_id);
                if (cart[j].qty !== 0.00) { // with 0.00 - removed from cart
                    goods11[index_goods] = {
                        ...goods11[index_goods],
                        ordered_qty: cart[j].qty,
                    }
                }
                else {
                    delete goods11[index_goods].ordered_qty;
                }
            }

            // goods details
            var details = { ...state.goodsDetails };
            if (details) {
                for (var j = 0; j < cart.length; j++) {
                    const index_goods = details._id === cart[j].good_id;
                    if (index_goods) {
                        if (cart[j].qty !== 0.00)// with 0.00 - removed from cart
                        {
                            details = {
                                ...details,
                                ordered_qty: cart[j].qty,
                            }
                        }
                        else {
                            delete details.ordered_qty;
                        }
                    }
                }
            }

            //console.log("GET_MY_CART_SUCCESS: ", cart);
            return state
                .set('isFetching', false)
                .set('myCart', [...cart])
                .set('lastCartPage', lastCartPage)
                .set("endReachedCartPage", false)
                .set('goodsDetails', { ...details })
                .set('goodsShopFiltered', [...goods1])
                .set('goodsExploreFiltered', [...goods4])
                .set('goodsExploreRemainsFiltered', [...goods11])
                .set('exclusiveGoodsFiltered', [...exclusiveGoodsFiltered1])
                .set('bestsellingGoodsFiltered', [...bestsellingGoodsFiltered1])
                .set('groceriesGoodsFiltered', [...groceriesGoodsFiltered1]);

        case GET_MY_CART_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case ADD_TO_CART_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case ADD_TO_CART_SUCCESS:
            const myCart2 = action.payload;
            //console.log("ADD_TO_CART_SUCCESS: ", myCart2);

            // prepare cart
            var cart2 = state.myCart.map(value => ({ ...value }));
            const index_cart = cart2.map((i) => i._id).indexOf(myCart2._id);
            if (index_cart !== -1) {
                if (myCart2.qty !== 0.00) {
                    cart2[index_cart] = {
                        ...cart2[index_cart],
                        qty: myCart2.qty,
                        price: myCart2.price,
                    }
                } else { // delete from cart
                    cart2.splice(index_cart, 1);
                }
            } else {
                cart2.push({ ...myCart2 });
            }

            // prepare goods shop
            var goods2 = state.goodsShop.map(value => ({ ...value }));
            for (var j = 0; j < cart2.length; j++) {
                const index_goods = goods2.map((i) => i._id).indexOf(cart2[j].good_id);
                if (index_goods !== -1) {
                    if (cart2[j].qty !== 0.00) { // with 0.00 - removed from cart
                        goods2[index_goods] = {
                            ...goods2[index_goods],
                            ordered_qty: cart2[j].qty,
                        }
                    }
                    else {
                        delete goods2[index_goods].ordered_qty;
                    }
                }
            }
            var exclusiveGoodsFiltered2 = [...goods2].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.exclusive_group_id
            ).slice(0, 3);
            var bestsellingGoodsFiltered2 = [...goods2].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.bestselling_group_id
            ).slice(0, 3);
            var groceriesGoodsFiltered2 = [...goods2].filter(
                (good) =>
                    good.group_id === CONFIG.PGSTORE_CONSTANTS.groceries_group_id
            ).slice(0, 3);

            // prepare goods explore
            var goods5 = state.goodsExplore.map(value => ({ ...value }));
            for (var j = 0; j < cart2.length; j++) {
                const index_goods = goods5.map((i) => i._id).indexOf(cart2[j].good_id);
                if (index_goods !== -1) {
                    if (cart2[j].qty !== 0.00) { // with 0.00 - removed from cart
                        goods5[index_goods] = {
                            ...goods5[index_goods],
                            ordered_qty: cart2[j].qty,
                        }
                    }
                    else {
                        delete goods5[index_goods].ordered_qty;
                    }
                }
            }
            for (var j = 0; j < goods5.length; j++) {
                const index_goods = cart2.map((i) => i.good_id).indexOf(goods5[j]._id);
                if (index_goods === -1) {
                    delete goods5[j].ordered_qty;
                }
            }

            // prepare goods explore remains
            var goods9 = state.goodsExploreRemains.map(value => ({ ...value }));
            for (var j = 0; j < cart2.length; j++) {
                const index_goods = goods9.map((i) => i._id).indexOf(cart2[j].good_id);
                if (index_goods !== -1) {
                    if (cart2[j].qty !== 0.00) { // with 0.00 - removed from cart
                        goods9[index_goods] = {
                            ...goods9[index_goods],
                            ordered_qty: cart2[j].qty,
                        }
                    }
                    else {
                        delete goods9[index_goods].ordered_qty;
                    }
                }
            }
            for (var j = 0; j < goods9.length; j++) {
                const index_goods = cart2.map((i) => i.good_id).indexOf(goods9[j]._id);
                if (index_goods === -1) {
                    delete goods9[j].ordered_qty;
                }
            }

            // goods details
            var details1 = { ...state.goodsDetails };
            if (details1) {
                const index_goods = details1._id === myCart2.good_id;
                if (index_goods) {
                    if (myCart2.qty !== 0.00)// with 0.00 - removed from cart
                    {
                        details1 = {
                            ...details1,
                            ordered_qty: myCart2.qty,
                        }
                    }
                    else {
                        delete details1.ordered_qty;
                    }
                }
            }

            // + search
            const mySearchGoodsState1 = state.mySearchGoods.map(value => ({ ...value }));
            for (var j = 0; j < cart2.length; j++) {
                const index_goods = mySearchGoodsState1.map((i) => i._id).indexOf(cart2[j].good_id);
                if (index_goods !== -1) {
                    if (cart2[j].qty !== 0.00) { // with 0.00 - removed from cart
                        mySearchGoodsState1[index_goods] = {
                            ...mySearchGoodsState1[index_goods],
                            ordered_qty: cart2[j].qty,
                        }
                    }
                    else {
                        delete mySearchGoodsState1[index_goods].ordered_qty;
                    }
                }
            }
            let mySearchGoodsFiltered1 = [...mySearchGoodsState1];
            // - search

            //console.log("ADD_TO_CART_SUCCESS: ", goods9);

            return state
                .set('isFetching', false)
                .set('myCart', [...cart2])
                .set('goodsDetails', { ...details1 })
                .set('goodsShopFiltered', [...goods2])
                .set('goodsExploreFiltered', [...goods5])
                .set('goodsExploreRemainsFiltered', [...goods9])
                .set('goodsExplore', [...goods5])
                .set('goodsExploreRemains', [...goods9])
                .set('mySearchGoodsFiltered', [...mySearchGoodsFiltered1])
                .set('exclusiveGoodsFiltered', [...exclusiveGoodsFiltered2])
                .set('bestsellingGoodsFiltered', [...bestsellingGoodsFiltered2])
                .set('groceriesGoodsFiltered', [...groceriesGoodsFiltered2]);

        case ADD_TO_CART_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case GET_FAVORITES_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_FAVORITES_SUCCESS:
            const _favorites = action.payload.json;
            const page4 = action.payload.page;

            if (_favorites.length === 0 && page4 !== 0) {
                var next = state
                    .set("endReachedFavoritesPage", true)
                    .set("isFetching", false);

                return next;
            }

            let myFavoritesState = [];
            if (page4 !== 0) { // если первая страница, то сбрасываем массив в 0
                myFavoritesState = state.myFavorites.map(value => ({ ...value }));
            }
            myFavoritesState = myFavoritesState.concat(_favorites);
            const lastFavoritesPage = _favorites.length !== 0 ? page4 + 1 : page4;

            let favorites = myFavoritesState.filter(
                (fav) =>
                    fav.active === true
            );

            // // goods shop
            // var goods6 = [...state.goodsShop];
            // for (var j = 0; j < favorites.length; j++) {
            //     const index_goods = goods6.map((i) => i._id).indexOf(favorites[j].good_id);
            //     if (favorites[j].active === true) {
            //         goods6[index_goods] = {
            //             ...goods6[index_goods],
            //             favorites: true,
            //         }
            //     }
            //     else {
            //         delete goods6[index_goods].favorites;
            //     }
            // }
            // var exclusiveGoodsFiltered6 = [...goods6].filter(
            //     (good) =>
            //         good.group_id === CONFIG.PGSTORE_CONSTANTS.exclusive_group_id
            // ).slice(0, 3);
            // var bestsellingGoodsFiltered6 = [...goods6].filter(
            //     (good) =>
            //         good.group_id === CONFIG.PGSTORE_CONSTANTS.bestselling_group_id
            // ).slice(0, 3);
            // var groceriesGoodsFiltered6 = [...goods6].filter(
            //     (good) =>
            //         good.group_id === CONFIG.PGSTORE_CONSTANTS.groceries_group_id
            // ).slice(0, 3);

            // // goods explore
            // var goods7 = [...state.goodsExplore];
            // for (var j = 0; j < favorites.length; j++) {
            //     const index_goods = goods7.map((i) => i._id).indexOf(favorites[j].good_id);
            //     if (favorites[j].active === true) {
            //         goods7[index_goods] = {
            //             ...goods7[index_goods],
            //             favorites: true,
            //         }
            //     }
            //     else {
            //         delete goods7[index_goods].favorites;
            //     }
            // }

            // goods details
            var details2 = { ...state.goodsDetails };
            if (details2) {
                for (var j = 0; j < favorites.length; j++) {
                    const index_goods = details2._id === favorites[j].good_id;
                    if (index_goods) {
                        if (favorites[j].active === true) {
                            details2 = {
                                ...details2,
                                favorites: true,
                            }
                        }
                        else {
                            delete details2.favorites;
                        }
                    }
                }
            }

            //console.log("GET_MY_CART_SUCCESS: ", goods1, cart);
            return state
                .set('isFetching', false)
                .set('myFavorites', [...favorites])
                .set('lastFavoritesPage', lastFavoritesPage)
                .set('endReachedFavoritesPage', false)
                .set('goodsDetails', { ...details2 })
                //.set('goodsShopFiltered', [...goods6])
                //.set('goodsExploreFiltered', [...goods7])
                //.set('exclusiveGoodsFiltered', [...exclusiveGoodsFiltered6])
                //.set('bestsellingGoodsFiltered', [...bestsellingGoodsFiltered6])
                //.set('groceriesGoodsFiltered', [...groceriesGoodsFiltered6])
                ;

        case GET_FAVORITES_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case ADD_TO_FAVORITES_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case ADD_TO_FAVORITES_SUCCESS:
            const favorite1 = action.payload;
            //console.log("ADD_TO_FAVORITES_SUCCESS: ", favorite1);

            // prepare favorites
            var favorites2 = state.myFavorites.map(value => ({ ...value }));
            const index_favorite = favorites2.map((i) => i._id).indexOf(favorite1._id);
            if (index_favorite !== -1) {
                if (favorite1.active === true) {
                    favorites2[index_favorite] = {
                        ...favorites2[index_favorite],
                        active: true,
                    }
                } else { // delete from favorites
                    favorites2.splice(index_favorite, 1);
                }
            } else {
                favorites2.push({ ...favorite1 });
            }

            // goods details
            var details3 = { ...state.goodsDetails };
            if (details3) {
                const index_goods = details3._id === favorite1.good_id;
                if (index_goods) {
                    if (favorite1.active === true) {
                        details3 = {
                            ...details3,
                            favorites: true,
                        }
                    } else { // delete from favorites
                        delete details3.favorites;
                    }
                }
            }

            //console.log("ADD_TO_FAVORITES_SUCCESS: ", favorites2);

            return state
                .set('isFetching', false)
                .set('myFavorites', [...favorites2])
                .set('goodsDetails', { ...details3 });

        case ADD_TO_FAVORITES_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case ADD_TO_ORDERS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case ADD_TO_ORDERS_SUCCESS:
            const order = action.payload;
            //console.log("ADD_TO_ORDERS_SUCCESS: ", order);

            return state
                .set('isFetching', false)
                .set('order', { ...order })
                .set('myCart', []);

        case ADD_TO_ORDERS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_ORDERS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_ORDERS_SUCCESS:
            const orders = action.payload;

            if (orders.length === 0) {
                var next = state
                    .set("endReachedOrdersPage", true)
                    .set("isFetching", false);

                return next;
            }

            let myOrdersState = state.myOrders.map(value => ({ ...value }));
            myOrdersState = myOrdersState.concat(orders);
            const lastOrdersPage = orders.length !== 0 ? state.lastOrdersPage + 1 : state.lastOrdersPage;

            //console.log("GET_ORDERS_SUCCESS: ", myOrdersState);
            return state
                .set('isFetching', false)
                .set("lastOrdersPage", lastOrdersPage)
                .set("endReachedOrdersPage", false)
                .set('myOrders', [...myOrdersState]);

        case GET_ORDERS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case DELETE_USER_DATA_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case DELETE_USER_DATA_SUCCESS:
            const datas = action.payload;
            //console.log("DELETE_USER_DATA_SUCCESS: ", datas);
            return state
                .set('isFetching', false)
                .set('deletedUserData', datas);

        case DELETE_USER_DATA_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case SEARCH_GOODS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case SEARCH_GOODS_SUCCESS:
            //console.log("SEARCH_GOODS_SUCCESS: ", action.payload);
            const goods8 = action.payload.json;
            const page8 = action.payload.page;
            const createdUser3 = action.payload.createdUser;
            const price_type_id_user3 = createdUser3 ? createdUser3.price_type_id : undefined;

            if (goods8.length === 0 && page8 !== 0) {
                var next = state
                    .set("endReachedSearchGoodsPage", true)
                    .set("isFetching", false);

                return next;
            }

            // + PRICE LISTS
            if (price_type_id_user3) {
                for (var i = 0; i < goods8.length; i++) {
                    if (goods8[i].pricelists) {
                        const index_goods = goods8[i].pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user3);
                        if (index_goods !== -1) {
                            if (goods8[i].pricelists[index_goods].Active) {
                                goods8[i] = {
                                    ...goods8[i],
                                    price: goods8[i].pricelists[index_goods].price,
                                    price_info: goods8[i].pricelists[index_goods].price_info,
                                };
                                //console.log("GET_GOODS_SHOP_SUCCESS 1: ", goods[i].pricelists[index_goods]);
                            }
                        }
                    }
                }
            }
            // + PRICE LISTS

            for (var i = 0; i < goods8.length; i++) {
                goods8[i] = {
                    ...goods8[i],
                    preorder: true,
                };
            }

            let mySearchGoodsState = [];
            if (page8 !== 0) { // если первая страница, то сбрасываем массив в 0
                mySearchGoodsState = state.mySearchGoods.map(value => ({ ...value }));
            }
            mySearchGoodsState = mySearchGoodsState.concat(goods8);
            let mySearchGoodsFiltered = [...mySearchGoodsState];
            const lastSearchGoodsPage = goods8.length !== 0 ? page8 + 1 : page8;

            const myCart5 = state.myCart;
            for (var j = 0; j < myCart5.length; j++) {
                const index_goods = mySearchGoodsFiltered.map((i) => i._id).indexOf(myCart5[j].good_id);
                if (myCart5[j].qty !== 0.00) { // with 0.00 - removed from cart
                    mySearchGoodsFiltered[index_goods] = {
                        ...mySearchGoodsFiltered[index_goods],
                        ordered_qty: myCart5[j].qty,
                    }
                }
                else {
                    delete mySearchGoodsFiltered[index_goods].ordered_qty;
                }
            }

            //console.log("SEARCH_GOODS_SUCCESS: ", mySearchGoodsFiltered);
            return state
                .set('isFetching', false)
                .set('lastSearchGoodsPage', lastSearchGoodsPage)
                .set('endReachedSearchGoodsPage', false)
                .set('mySearchGoods', [...mySearchGoodsState])
                .set('mySearchGoodsFiltered', [...mySearchGoodsFiltered]);

        case SEARCH_GOODS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case SEARCH_GOODS_REMAINS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case SEARCH_GOODS_REMAINS_SUCCESS:
            //console.log("SEARCH_GOODS_SUCCESS: ", action.payload);
            const goods10 = action.payload.json;
            const page10 = action.payload.page;
            const createdUser10 = action.payload.createdUser;
            const price_type_id_user10 = createdUser10 ? createdUser10.price_type_id : undefined;

            if (goods10.length === 0 && goods10 !== 0) {
                var next = state
                    .set("endReachedSearchGoodsRemainsPage", true)
                    .set("isFetching", false);

                return next;
            }

            // + PRICE LISTS
            if (price_type_id_user10) {
                for (var i = 0; i < goods10.length; i++) {
                    if (goods10[i].pricelists) {
                        const index_goods = goods10[i].pricelists.map((i) => i.price_type_id).indexOf(price_type_id_user10);
                        if (index_goods !== -1) {
                            if (goods10[i].pricelists[index_goods].Active) {
                                goods10[i] = {
                                    ...goods10[i],
                                    price: goods10[i].pricelists[index_goods].price,
                                    price_info: goods10[i].pricelists[index_goods].price_info,
                                };
                                //console.log("GET_GOODS_SHOP_SUCCESS 1: ", goods[i].pricelists[index_goods]);
                            }
                        }
                    }
                }
            }
            // + PRICE LISTS

            for (var i = 0; i < page10.length; i++) {
                page10[i] = {
                    ...page10[i],
                    preorder: false,
                };
            }

            let mySearchGoodsState10 = [];
            if (page10 !== 0) { // если первая страница, то сбрасываем массив в 0
                mySearchGoodsState10 = state.mySearchGoods.map(value => ({ ...value }));
            }
            mySearchGoodsState10 = mySearchGoodsState10.concat(goods10);
            let mySearchGoodsFiltered10 = [...mySearchGoodsState10];
            const lastSearchGoodsPage10 = goods10.length !== 0 ? page10 + 1 : page10;

            const myCart10 = state.myCart;
            for (var j = 0; j < myCart10.length; j++) {
                const index_goods = mySearchGoodsFiltered10.map((i) => i._id).indexOf(myCart10[j].good_id);
                if (myCart10[j].qty !== 0.00) { // with 0.00 - removed from cart
                    mySearchGoodsFiltered10[index_goods] = {
                        ...mySearchGoodsFiltered10[index_goods],
                        ordered_qty: myCart10[j].qty,
                    }
                }
                else {
                    delete mySearchGoodsFiltered10[index_goods].ordered_qty;
                }
            }

            const mySearchGoodsFiltered10_final = mySearchGoodsFiltered10.sort((a, b) => b.in_stock - a.in_stock);

            //console.log("SEARCH_GOODS_SUCCESS: ", mySearchGoodsFiltered10);
            return state
                .set('isFetching', false)
                .set('lastSearchGoodsRemainsPage', lastSearchGoodsPage10)
                .set('endReachedSearchGoodsRemainsPage', false)
                .set('mySearchGoodsRemains', [...mySearchGoodsState10])
                .set('mySearchGoodsRemainsFiltered', [...mySearchGoodsFiltered10_final]);

        case SEARCH_GOODS_REMAINS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case GET_MESSAGES_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_MESSAGES_SUCCESS:
            const _messages = action.payload.json;
            const page5 = action.payload.page;

            if (_messages.length === 0 && page5 !== 0) {
                var next = state
                    .set("endReachedMessagesPage", true)
                    .set("isFetching", false);

                return next;
            }

            let messagesState = [];
            if (page5 !== 0) { // если первая страница, то сбрасываем массив в 0
                messagesState = state.messages.map(value => ({ ...value }));
            }
            messagesState = messagesState.concat(_messages);
            const lastMessagesPage = _messages.length !== 0 ? page5 + 1 : page5;

            const messagesFiltered1 = messagesState.sort((a, b) => b.date.localeCompare(a.date));

            //console.log("GET_MESSAGES_SUCCESS: ", _messages);
            return state
                .set('isFetching', false)
                .set('messages', [...messagesState])
                .set('messagesFiltered', [...messagesFiltered1])
                .set('lastMessagesPage', lastMessagesPage)
                .set("endReachedMessagesPage", false);

        case GET_MESSAGES_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case SET_MESSAGE_READ_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case SET_MESSAGE_READ_SUCCESS:
            const message1 = action.payload;
            //console.log("SET_MESSAGE_READ_SUCCESS: ", message1);

            // prepare messages
            var messagesState1 = state.messages.map(value => ({ ...value }));
            const index_message = messagesState1.map((i) => i._id).indexOf(message1._id);
            if (index_message !== -1) {
                messagesState1[index_message] = message1;
            } else {
                messagesState1.push({ ...message1 });
            }

            const messagesFiltered2 = messagesState1.sort((a, b) => a.active - b.active);
            //console.log("SET_MESSAGE_READ_SUCCESS: ", messagesState1);

            return state
                .set('isFetching', false)
                .set('messages', [...messagesState1])
                .set('messagesFiltered', [...messagesFiltered2]);

        case SET_MESSAGE_READ_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case LOGOUT_CLEAR_SUCCESS:
            //console.log("LOGOUT_CLEAR_SUCCESS");
            return state
                .set('isFetching', false)
                .set('areas', [])
                .set('areasDropDownItems', [])
                .set('timeSlots', [])
                .set('selectedTimeSlot', null)
                .set('paymentMethods', [])
                .set('deliveryVariants', [])
                .set('order', null)
                .set('warehouses', [])
                .set('warehousesDropDownItems', [])
                //.set('groupsShop', [])
                //.set('groupsShopFiltered', [])
                //.set('groupsExplore', [])
                //.set('groupsExploreFiltered', [])
                //.set('goodsShop', [])
                //.set('goodsShopFiltered', [])
                //.set('lastGoodShopPage', 0)
                //.set('endReachedGoodShopPage', false)
                //.set('exclusiveGoodsFiltered', [])
                //.set('bestsellingGoodsFiltered', [])
                //.set('groceriesGoodsFiltered', [])
                //.set('goodsExplore', [])
                //.set('goodsExploreFiltered', [])
                //.set('lastGoodExplorePage', 0)
                //.set('endReachedGoodExplorePage', false)
                //.set('goodsDetails', null)
                .set('myCart', [])
                .set('lastCartPage', 0)
                .set('endReachedCartPage', false)
                .set('myFavorites', [])
                .set('lastFavoritesPage', 0)
                .set('endReachedFavoritesPage', false)
                .set('myOrders', [])
                .set('lastOrdersPage', 0)
                .set('endReachedOrdersPage', false)
                .set('deletedUserData', null)
                .set('mySearchGoods', [])
                .set('mySearchGoodsFiltered', [])
                .set('lastSearchGoodsPage', 0)
                .set('endReachedSearchGoodsPage', false)
                .set('messages', [])
                .set('messagesFiltered', [])
                .set('lastMessagesPage', 0)
                .set('endReachedMessagesPage', false)
                .set('chat', [])
                .set('chatFiltered', [])
                .set('lastChatPage', 0)
                .set('endReachedChatPage', false);


        case GET_CHAT_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_CHAT_SUCCESS:
            const _chat = action.payload.json;
            const page6 = action.payload.page;

            //console.log("GET_CHAT_SUCCESS 1: ", _chat, page6);

            if (_chat.length === 0 && page6 !== 0) {
                var next = state
                    .set("endReachedChatPage", true)
                    .set("isFetching", false);

                return next;
            }

            let chatState = [];
            if (page6 !== 0) { // если первая страница, то сбрасываем массив в 0
                chatState = state.chat.map(value => ({ ...value }));
            }
            chatState = chatState.concat(_chat);
            const lastChatPage = _chat.length !== 0 ? page6 + 1 : page6;


            for (var i = 0; i < chatState.length; i++) {
                var message = chatState[i];

                const formatedDate = (new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6])).toLocaleDateString('default', {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                const dateDT = new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6]
                );

                chatState[i] = {
                    ...chatState[i],
                    formatedDate: formatedDate,
                    dateDT: dateDT,
                };
            };
            chatState = chatState.sort((a, b) => a.dateDT - b.dateDT);

            var chatFiltered4 = [];
            for (var i = 0; i < chatState.length; i++) {
                var formatedDate = chatState[i].formatedDate;
                const index_val = chatFiltered4.map((i) => i.title).indexOf(formatedDate);
                if (index_val === -1) {
                    const newObj = {
                        title: formatedDate,
                        data: [chatState[i]],
                    };
                    chatFiltered4.unshift(newObj);
                } else {
                    chatFiltered4[index_val].data.unshift(chatState[i]);
                }
            }

            //console.log("GET_CHAT_SUCCESS: ", chatFiltered1);
            return state
                .set('isFetching', false)
                .set('chat', [...chatState])
                .set('chatFiltered', [...chatFiltered4])
                .set('lastChatPage', lastChatPage)
                .set("endReachedChatPage", false);

        case GET_CHAT_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case SET_CHAT_READ_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case SET_CHAT_READ_SUCCESS:
            const chat1 = action.payload;
            //console.log("SET_CHAT_READ_SUCCESS: ", chat1);

            // prepare chat
            var chatState1 = state.chat.map(value => ({ ...value }));
            const index_chat = chatState1.map((i) => i._id).indexOf(chat1._id);
            if (index_chat !== -1) {
                chatState1[index_chat] = chat1;
            } else {
                chatState1.push({ ...chat1 });
            }

            for (var i = 0; i < chatState1.length; i++) {
                var message = chatState1[i];

                const formatedDate = (new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6]
                )).toLocaleDateString('default', {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                const dateDT = new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6]
                );

                chatState1[i] = {
                    ...chatState1[i],
                    formatedDate: formatedDate,
                    dateDT: dateDT,
                };
            };
            chatState1 = chatState1.sort((a, b) => a.dateDT - b.dateDT);

            var chatFiltered2 = [];
            for (var i = 0; i < chatState1.length; i++) {
                var formatedDate = chatState1[i].formatedDate;
                const index_val = chatFiltered2.map((i) => i.title).indexOf(formatedDate);
                if (index_val === -1) {
                    const newObj = {
                        title: formatedDate,
                        data: [chatState1[i]],
                    };
                    chatFiltered2.unshift(newObj);
                } else {
                    chatFiltered2[index_val].data.unshift(chatState1[i]);
                }
            }

            //console.log("SET_CHAT_READ_SUCCESS: ", chatFiltered2);

            return state
                .set('isFetching', false)
                .set('chat', [...chatState1])
                .set('chatFiltered', [...chatFiltered2]);

        case SET_CHAT_READ_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);

        case ADD_TO_CHAT_REQUEST:
            return state
                .set('isFetching', true);

        case ADD_TO_CHAT_SUCCESS:
            const chat2 = action.payload;
            //console.log("ADD_TO_CHAT_SUCCESS: ", chat2);

            // prepare chat
            let chatState2 = state.chat.map(value => ({ ...value }));
            const index_chat1 = chatState2.map((i) => i._id).indexOf(chat2._id);
            if (index_chat1 !== -1) {
                chatState2[index_chat1] = { ...chat2 };
            } else {
                chatState2.push({ ...chat2 });
            }

            for (var i = 0; i < chatState2.length; i++) {
                var message = chatState2[i];

                const formatedDate = (new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6]
                )).toLocaleDateString('default', {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                const dateDT = new Date(
                    message.date_ts[0],
                    message.date_ts[1] - 1,
                    message.date_ts[2],
                    message.date_ts[3],
                    message.date_ts[4],
                    message.date_ts[5],
                    message.date_ts[6]
                );

                chatState2[i] = {
                    ...chatState2[i],
                    formatedDate: formatedDate,
                    dateDT: dateDT,
                };
            };
            chatState2 = chatState2.sort((a, b) => a.dateDT - b.dateDT);

            var chatFiltered3 = [];
            for (var i = 0; i < chatState2.length; i++) {
                var formatedDate = chatState2[i].formatedDate;
                const index_val = chatFiltered3.map((i) => i.title).indexOf(formatedDate);
                if (index_val === -1) {
                    const newObj = {
                        title: formatedDate,
                        data: [chatState2[i]],
                    };
                    chatFiltered3.unshift(newObj);
                } else {
                    chatFiltered3[index_val].data.unshift(chatState2[i]);
                }
            }

            return state
                .set('isFetching', false)
                .set('chat', [...chatState2])
                .set('chatFiltered', [...chatFiltered3]);

        case ADD_TO_CHAT_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        case GET_BANNERS_REQUEST: {
            let nextState = state
                .set('isFetching', true);
            return nextState;
        }

        case GET_BANNERS_SUCCESS:
            const banners = action.payload;

            console.log("GET_BANNERS_SUCCESS: ", banners);
            return state
                .set('isFetching', false)
                .set('banners', [...banners])
                .set('bannersFiltered', [...banners]);

        case GET_BANNERS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.payload);


        // case REHYDRATE:
        //   return {
        //     ...state,
        //   };

    }

    return state
}
