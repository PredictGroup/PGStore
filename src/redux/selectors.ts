import {RootState} from '../config/configureStore';

export const Auth = (state: RootState) => state.auth || undefined;
export const Device = (state: RootState) => state.device || undefined;
export const StoreData = (state: RootState) => state.storedata || undefined;

export const UserInfo = (state: RootState) => state.auth.userInfo || undefined;
export const CreatedUser = (state: RootState) =>
  state.auth.createdUser || undefined;

export const UserArea = (state: RootState) =>
  state.auth.userAreaId || undefined;
export const UserWarehouse = (state: RootState) =>
  state.auth.userWarehouseId || undefined;

export const TimeSlots = (state: RootState) => state.storedata.timeSlots || [];

export const SelectedTimeSlot = (state: RootState) =>
  state.storedata.selectedTimeSlot || undefined;

export const PaymentMethods = (state: RootState) =>
  state.storedata.paymentMethods || [];
export const DeliveryVariants = (state: RootState) =>
  state.storedata.deliveryVariants || [];

export const AreasDropDownItems = (state: RootState) =>
  state.storedata.areasDropDownItems || [];
export const WarehousesDropDownItems = (state: RootState) =>
  state.storedata.warehousesDropDownItems || [];

export const groupsShopFiltered = (state: RootState) =>
  state.storedata.groupsShopFiltered || [];
export const groupsExploreFiltered = (state: RootState) =>
  state.storedata.groupsExploreFiltered || [];
export const goodsShopFiltered = (state: RootState) =>
  state.storedata.goodsShopFiltered || [];
export const goodsExploreFiltered = (state: RootState) =>
  state.storedata.goodsExploreFiltered || [];
export const goodsExploreRemainsFiltered = (state: RootState) =>
  state.storedata.goodsExploreRemainsFiltered || [];
export const lastGoodShopPage = (state: RootState) =>
  state.storedata.lastGoodShopPage || 0;
export const lastGoodExplorePage = (state: RootState) =>
  state.storedata.lastGoodExplorePage || 0;
export const lastGoodExploreRemainsPage = (state: RootState) =>
  state.storedata.lastGoodExploreRemainsPage || 0;

export const ExclusiveGoodsFiltered = (state: RootState) =>
  state.storedata.exclusiveGoodsFiltered || [];
export const BestsellingGoodsFiltered = (state: RootState) =>
  state.storedata.bestsellingGoodsFiltered || [];
export const GroceriesGoodsFiltered = (state: RootState) =>
  state.storedata.groceriesGoodsFiltered || [];

export const GoodsDetails = (state: RootState) =>
  state.storedata.goodsDetails || undefined;

export const qtyInCart = (state: RootState) => {
  let total: number = 0;
  Object.values(state.storedata.myCart).forEach(o => {
    if (o.qty !== 0) {
      total += 1;
    }
  });
  return total;
};

export const sumInCart = (state: RootState) => {
  let total: number = 0;
  Object.values(state.storedata.myCart).forEach(o => {
    if (o.qty !== 0) {
      total += o.qty * o.price;
    }
  });
  return total;
};

export const MyCart = (state: RootState) => state.storedata.myCart || [];

export const MyFavorites = (state: RootState) =>
  state.storedata.myFavorites || [];

export const MyOrders = (state: RootState) => state.storedata.myOrders || [];

export const lastCartPage = (state: RootState) =>
  state.storedata.lastCartPage || 0;
export const lastFavoritesPage = (state: RootState) =>
  state.storedata.lastFavoritesPage || 0;
export const lastOrdersPage = (state: RootState) =>
  state.storedata.lastOrdersPage || 0;

export const MySearchGoodsFiltered = (state: RootState) =>
  state.storedata.mySearchGoodsFiltered || [];
export const MySearchGoodsRemainsFiltered = (state: RootState) =>
  state.storedata.mySearchGoodsRemainsFiltered || [];

export const lastSearchGoodsPage = (state: RootState) =>
  state.storedata.lastSearchGoodsPage || 0;
export const lastSearchGoodsRemainsPage = (state: RootState) =>
  state.storedata.lastSearchGoodsRemainsPage || 0;

export const Messages = (state: RootState) =>
  state.storedata.messagesFiltered || [];
export const lastMessagesPage = (state: RootState) =>
  state.storedata.lastMessagesPage || 0;
export const endReachedMessagesPage = (state: RootState) =>
  state.storedata.endReachedMessagesPage || 0;
export const qtyUnreadMessages = (state: RootState) => {
  let total: number = 0;
  Object.values(state.storedata.messagesFiltered).forEach(o => {
    if (o.active === true) {
      total += 1;
    }
  });
  return total;
};

export const Chat = (state: RootState) => state.storedata.chatFiltered || [];
export const lastChatPage = (state: RootState) =>
  state.storedata.lastChatPage || 0;
export const qtyUnreadChat = (state: RootState) => {
  let total: number = 0;
  Object.values(state.storedata.chat).forEach(o => {
    if (o.active === true) {
      total += 1;
    }
  });
  return total;
};


export const BannersFiltered = (state: RootState) =>
  state.storedata.bannersFiltered || [];