/**
 * # storedataInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'

/**
 * ## Import immutable record
 */
import { Record } from 'immutable'


/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  isFetching: false,

  areas: [],
  areasDropDownItems: [],
  timeSlots: [],
  selectedTimeSlot: null,
  paymentMethods: [],
  deliveryVariants: [],

  order: null,

  warehouses: [],
  warehousesDropDownItems: [],

  groupsShop: [],
  groupsShopFiltered: [],
  groupsExplore: [],
  groupsExploreFiltered: [],

  goodsShop: [],
  goodsShopFiltered: [],
  lastGoodShopPage: 0,
  endReachedGoodShopPage: false,

  exclusiveGoodsFiltered: [],
  bestsellingGoodsFiltered: [],
  groceriesGoodsFiltered: [],

  goodsExplore: [], // без остатка
  goodsExploreFiltered: [],
  lastGoodExplorePage: 0,
  endReachedGoodExplorePage: false,
  goodsExploreGroupId: null,

  goodsExploreRemains: [], // с остатком
  goodsExploreRemainsFiltered: [],
  lastGoodExploreRemainsPage: 0,
  endReachedGoodExploreRemainsPage: false,

  goodsDetails: null,

  myCart: [],
  lastCartPage: 0,
  endReachedCartPage: false,

  myFavorites: [],
  lastFavoritesPage: 0,
  endReachedFavoritesPage: false,

  myOrders: [],
  lastOrdersPage: 0,
  endReachedOrdersPage: false,

  deletedUserData: null,

  mySearchGoods: [],
  mySearchGoodsFiltered: [],
  lastSearchGoodsPage: 0,
  endReachedSearchGoodsPage: false,

  mySearchGoodsRemains: [],
  mySearchGoodsRemainsFiltered: [],
  lastSearchGoodsRemainsPage: 0,
  endReachedSearchGoodsRemainsPage: false,

  messages: [],
  messagesFiltered: [],
  lastMessagesPage: 0,
  endReachedMessagesPage: false,

  chat: [],
  chatFiltered: [],
  lastChatPage: 0,
  endReachedChatPage: false,

  banners: [],
  bannersFiltered: [],
  
})

export default InitialState
