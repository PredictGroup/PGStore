module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    firebaseRemote: true,
  },
  FIREBASE: {
    appId: 'com.predictgroup.pgstore', // match APP_ID in parse-server's index.js
  },
  PGSTORE_API: {
    app_name: "pgstore",
    create_new_user: 'https://api1.predictgroup.com/api/v1/users/user', // POST
    get_user_info: 'https://api1.predictgroup.com/api/v1/users/user', // GET
    delete_user_data: 'https://api1.predictgroup.com/api/v1/users/user', // DELETE
    check_client_token: 'https://api1.predictgroup.com/api/v1/pgstore/check_client_token', // GET 
    update_user: 'https://api1.predictgroup.com/api/v1/users/user_info', // POST  

    get_areas: 'https://api1.predictgroup.com/api/v1/pgstore/areas', // GET 
    get_warehouses: 'https://api1.predictgroup.com/api/v1/pgstore/warehouses', // GET 
    get_groups: 'https://api1.predictgroup.com/api/v1/pgstore/groups', // GET 
    get_goods: 'https://api1.predictgroup.com/api/v1/pgstore/goods', // GET 
    get_good_by_id: 'https://api1.predictgroup.com/api/v1/pgstore/goods/id/', // GET 
    get_time_slots: 'https://api1.predictgroup.com/api/v1/pgstore/timeslots', // GET 
    get_payment_methods: 'https://api1.predictgroup.com/api/v1/pgstore/payment_methods', // GET 
    get_delivery_variants: 'https://api1.predictgroup.com/api/v1/pgstore/delivery_variants', // GET 
    get_goods_remains: 'https://api1.predictgroup.com/api/v1/pgstore/goods_remains', // GET 

    get_cart: 'https://api1.predictgroup.com/api/v1/pgstore/cart', // GET 
    add_to_cart: 'https://api1.predictgroup.com/api/v1/pgstore/cart', // POST 

    get_favorites: 'https://api1.predictgroup.com/api/v1/pgstore/favorites', // GET 
    add_to_favorites: 'https://api1.predictgroup.com/api/v1/pgstore/favorites', // POST 

    add_to_orders: 'https://api1.predictgroup.com/api/v1/pgstore/orders', // POST 
    get_orders: 'https://api1.predictgroup.com/api/v1/pgstore/orders', // GET 

    set_message_read: 'https://api1.predictgroup.com/api/v1/pgstore/messages', // POST 
    get_messages: 'https://api1.predictgroup.com/api/v1/pgstore/messages', // GET 

    set_chat_read: 'https://api1.predictgroup.com/api/v1/pgstore/chat_set_read', // POST 
    get_chat: 'https://api1.predictgroup.com/api/v1/pgstore/chat', // GET 
    add_to_chat: 'https://api1.predictgroup.com/api/v1/pgstore/chat', // POST 

    get_banners: 'https://api1.predictgroup.com/api/v1/pgstore/banners', // POST
  },
  PGSTORE_CONSTANTS: {
    exclusive_group_id: '62dd718758dffd17c348e471',
    bestselling_group_id: '62dd7c3a58dffd17c348e47f',
    groceries_group_id: '62dd7c5e58dffd17c348e480',
  },
};
