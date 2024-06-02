/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {RouteProp} from '@react-navigation/native';

export type NO_PARAMS = undefined;

export type RootStackParamList = {
  Root: NO_PARAMS;
  SelectLocation: NO_PARAMS;
  AllowNotifications: NO_PARAMS;
  TabNavigation: NO_PARAMS;
};

export type AuthStackParamList = {
  Main: NO_PARAMS;
  SignUpSocial: NO_PARAMS;
  Login: NO_PARAMS;
  ForgotPassword: NO_PARAMS;
  Register: NO_PARAMS;
  Registered: NO_PARAMS;
  SelectLocation: NO_PARAMS;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type BottomTabParamList = {
  ShopTab: NO_PARAMS;
  ExploreTab: {
    screen: string | undefined;
    //group_id: string | undefined;
  };
  CartTab: NO_PARAMS;
  FavoriteTab: NO_PARAMS;
  AccountTab: NO_PARAMS;
};

export type InitBottomTabParamList = {
  InitShopTab: NO_PARAMS;
  InitExploreTab: {
    screen: string | undefined;
    //group_id: string | undefined;
  };
  InitCartTab: NO_PARAMS;
  InitFavoriteTab: NO_PARAMS;
  InitAccountTab: NO_PARAMS;
};

//+ Account Tab
export type AccountSettingsParamList = {
  AccountScreen: NO_PARAMS;
  RemoveUserDataScreen: NO_PARAMS;
  OrdersScreen: NO_PARAMS;
  AboutScreen: NO_PARAMS;
  ConnectionErr: NO_PARAMS;
  MessagesScreen: NO_PARAMS;
  ChatScreen: NO_PARAMS;
  UserDetailsScreen: NO_PARAMS;
};

export type AccountSettingsStackScreenProps<
  T extends keyof AccountSettingsParamList,
> = StackScreenProps<AccountSettingsParamList, T>;

export type AccountTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    AccountSettingsStackScreenProps<keyof AccountSettingsParamList>
  >;

export type AccountScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'AccountScreen'
>;
export type MessagesScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'MessagesScreen'
>;
export type OrdersScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'OrdersScreen'
>;
export type RemoveUserDataScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'RemoveUserDataScreen'
>;
export type AboutScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'AboutScreen'
>;
export type ChatScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'ChatScreen'
>;
export type UserDetailsScreenRouteProp = RouteProp<
  AccountSettingsParamList,
  'UserDetailsScreen'
>;
//- Account Tab

//+ Shop Tab
export type ShopParamList = {
  ShopListsScreen: NO_PARAMS;
  GoodsScreen: {
    blockName: string;
    blockTitle: string;
    groupGoodsFiltered: never[];
  };
  GoodsDetailsScreen: {
    good_id: string | undefined;
  };
  SearchGoodsScreen: {
    searchText: string | undefined;
  };
  ConnectionErr: NO_PARAMS;
};

export type ShopStackScreenProps<T extends keyof ShopParamList> =
  StackScreenProps<ShopParamList, T>;

export type ShopTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    ShopStackScreenProps<keyof ShopParamList>
  >;

export type ShopGoodsScreenRouteProp = RouteProp<ShopParamList, 'GoodsScreen'>;
export type ShopSearchGoodsScreenRouteProp = RouteProp<
  ShopParamList,
  'SearchGoodsScreen'
>;
export type ShopGoodsDetailsScreenRouteProp = RouteProp<
  ShopParamList,
  'GoodsDetailsScreen'
>;
//- Shop Tab

//+ Explore Tab
export type ExploreParamList = {
  ExploreGroupsScreen: NO_PARAMS;
  GoodsScreen: {
    group_id: string | undefined;
  };
  GoodsDetailsScreen: {
    good_id: string | undefined;
  };
  SearchGoodsScreen: {
    searchText: string | undefined;
  };
  ConnectionErr: NO_PARAMS;
};

export type ExploreStackScreenProps<T extends keyof ExploreParamList> =
  StackScreenProps<ExploreParamList, T>;

export type ExploreTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    ExploreStackScreenProps<keyof ExploreParamList>
  >;

export type ExploreGroupsScreenRouteProp = RouteProp<
  ExploreParamList,
  'ExploreGroupsScreen'
>;
export type ExploreGoodsScreenRouteProp = RouteProp<
  ExploreParamList,
  'GoodsScreen'
>;
export type ExploreSearchGoodsScreenRouteProp = RouteProp<
  ShopParamList,
  'SearchGoodsScreen'
>;
export type ExploreGoodsDetailsScreenRouteProp = RouteProp<
  ExploreParamList,
  'GoodsDetailsScreen'
>;
//- Explore Tab

//+ Cart Tab
export type CartParamList = {
  CartScreen: NO_PARAMS;
  CartListScreen: NO_PARAMS;
  GoodsDetailsScreen: {
    good_id: string | undefined;
  };
  CheckOutScreen: NO_PARAMS;
  SuccessScreen: NO_PARAMS;
  ConnectionErr: NO_PARAMS;
};

export type CartStackScreenProps<T extends keyof CartParamList> =
  StackScreenProps<CartParamList, T>;

export type CartTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    CartStackScreenProps<keyof CartParamList>
  >;

export type CartListScreenRouteProp = RouteProp<
  CartParamList,
  'CartListScreen'
>;
export type CartGoodsDetailsScreenRouteProp = RouteProp<
  CartParamList,
  'GoodsDetailsScreen'
>;
export type CheckOutScreenRouteProp = RouteProp<
  CartParamList,
  'CheckOutScreen'
>;
export type SuccessScreenRouteProp = RouteProp<CartParamList, 'SuccessScreen'>;
//- Cart Tab

//+ Favorites Tab
export type FavoritesParamList = {
  FavoritesScreen: NO_PARAMS;
  FavoritesListScreen: NO_PARAMS;
  GoodsDetailsScreen: {
    good_id: string | undefined;
  };
  ConnectionErr: NO_PARAMS;
};

export type FavoritesStackScreenProps<T extends keyof FavoritesParamList> =
  StackScreenProps<FavoritesParamList, T>;

export type FavoritesTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    FavoritesStackScreenProps<keyof FavoritesParamList>
  >;

export type FavoritesScreenRouteProp = RouteProp<
  FavoritesParamList,
  'FavoritesScreen'
>;
export type FavoritesListScreenRouteProp = RouteProp<
  FavoritesParamList,
  'FavoritesListScreen'
>;
export type FavoritesGoodsDetailsScreenRouteProp = RouteProp<
  FavoritesParamList,
  'GoodsDetailsScreen'
>;
//- Favorites Tab
