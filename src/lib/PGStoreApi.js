/**
 * # PGStoreApi.js
 *
 * This class interfaces with parse-server using the rest api
 *
 *
 */
'use strict';

/**
 * ## Imports
 *
 */

import CONFIG from '../config/config';
import _ from 'underscore';
import APIBackend from './APIBackend';

const axios = require('axios').default;
import { Alert } from 'react-native';


export class PGStoreApi extends APIBackend {
  /**
   * ## PGStoreApi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize(token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing');
    }
    this._sessionToken = _.isNull(token) ? null : token.sessionToken;

    //console.log('PGStoreApi this._sessionToken: ', this._sessionToken);
  }

  /**
    * ### check_client_token
    *
    * @param data object
    *
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async check_client_token(data) {
    console.log("check_client_token API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.check_client_token,
        body: {
          token: data.token,
        },
      },
      "GET"
    )

      .then((response) => {
        console.log("check_client_token API: ", response);
        return response;
      })

      .catch((error) => {
        console.log("check_client_token API error! ", error);
        throw error;
      });
  }

  /**
    * ### check_or_create_user
    *
    * @param data object
    *
    * token
    * firebase_uid
    * fcm_uid
    * device_uid
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async check_or_create_user(data) {
    console.log("check_or_create_user API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.create_new_user,
        body: {
          firebase_uid: data.firebase_uid,
          fcm_uid: data.fcm_uid,
          device_uid: data.device_uid,
          app_name: CONFIG.PGSTORE_API.app_name,
          user_area: data.user_area,
          user_warehouse: data.user_warehouse,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("check_or_create_user API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("check_or_create_user API error! ", error, error.code, error.status);
        throw error;
      });
  }


  /**
   * ### get_user_info
   *
   * @param data object
   *
   *
   * @return
   * if ok, res.json={...}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async get_user_info(data) {
    //console.log("get_user_info API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_user_info,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_user_info API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_user_info API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_areas
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_areas(data = null) {
    //console.log("get_areas API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_areas,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_areas API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_areas API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_warehouses
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_warehouses(data = null) {
    //console.log("get_warehouses API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_warehouses,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_areas API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_warehouses API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_time_slots
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_time_slots(data) {
    //console.log("get_time_slots API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_time_slots,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_time_slots API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_time_slots API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_payment_methods
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_payment_methods(data) {
    //console.log("get_payment_methods API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_payment_methods,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_payment_methods API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_payment_methods API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_delivery_variants
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_delivery_variants(data) {
    //console.log("get_delivery_variants API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_delivery_variants,
        params: {
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_delivery_variants API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_delivery_variants API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_groups
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_groups(data) {
    //console.log("get_groups API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_groups,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_groups API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_groups API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_goods
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_goods(data) {
    //console.log("get_goods API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_goods,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_goods API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_goods API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_goods_with_remains
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_goods_with_remains(data) {
    //console.log("get_goods_with_remains API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_goods_remains,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_goods_with_remains API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_goods_with_remains API error! ", error);
        throw error;
      });
  }

  /**
    * ### get_good_by_id
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_good_by_id(data) {
    //console.log("get_good_by_id API: ", data);
    const { id } = data.params;
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_good_by_id + id,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_good_by_id API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_good_by_id API error! ", error);
        throw error;
      });
  }

  /**
    * ### get_cart
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_cart(data) {
    //console.log("get_cart API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_cart,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_cart API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_cart API error! ", error);
        throw error;
      });
  }

  /**
    * ### add_to_cart
    *
    * @param data object
    *
    * good_id
    * qty
    * price
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async add_to_cart(data) {
    //console.log("add_to_cart API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.add_to_cart,
        body: {
          good_id: data.good_id,
          qty: data.qty,
          price: data.price,
          price_info: data.price_info,
          in_stock: data.in_stock,
          preorder: data.preorder,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("add_to_cart API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("add_to_cart API error! ", error);
        throw error;
      });
  }

  /**
    * ### get_favorites
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_favorites(data) {
    //console.log("get_favorites API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_favorites,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_favorites API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_favorites API error! ", error);
        throw error;
      });
  }

  /**
    * ### add_to_favorites
    *
    * @param data object
    *
    * good_id
    * qty
    * price
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async add_to_favorites(data) {
    //console.log("add_to_favorites API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.add_to_favorites,
        body: {
          good_id: data.good_id,
          active: data.active,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("add_to_favorites API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("add_to_favorites API error! ", error);
        throw error;
      });
  }

  /**
    * ### add_to_orders
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async add_to_orders(data) {
    //console.log("add_to_orders API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.add_to_orders,
        body: {
          phone: data.phone,
          address: data.address,
          date_delivery: data.date_delivery,
          time_slot: data.time_slot,
          delivery_variant: data.delivery_variant,
          payment_method: data.payment_method,
          order_lines: data.cart,
          amount: data.amount,
          delivery_amount: data.delivery_amount,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("add_to_orders API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("add_to_orders API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_orders
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_orders(data) {
    //console.log("get_orders API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_orders,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_orders API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_orders API error! ", error);
        throw error;
      });
  }

  /**
   * ### delete_user_data
   *
   * @param data object
   *
   * 
   *
   * @return
   * if ok, res.json={...}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async delete_user_data(data) {
    //console.log("delete_user_data API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.delete_user_data,
        params: params,
      },
      "DELETE"
    )

      .then((response) => {
        //console.log("delete_user_data API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("delete_user_data API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_messages
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_messages(data) {
    //console.log("get_messages API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_messages,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_messages API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_messages API error! ", error);
        throw error;
      });
  }

  /**
    * ### set_message_read
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async set_message_read(data) {
    //console.log("set_message_read API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.set_message_read,
        body: {
          message_id: data.message_id,
          active: data.active,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("set_message_read API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("set_message_read API error! ", error);
        throw error;
      });
  }

  /**
   * ### get_chat
   *
   * @param data object
   *
   * 
   *
   * @return
   * if ok, res.json={...}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async get_chat(data) {
    //console.log("get_chat API: ", data);
    const params = {
      ...data.params,
      app_name: CONFIG.PGSTORE_API.app_name,
    };

    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_chat,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_chat API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_chat API error! ", error);
        throw error;
      });
  }

  /**
 * ### set_chat_read
 *
 * @param data object
 *
 * 
 *
 * @return
 * if ok, res.json={...}
 *
 * if error, {code: xxx, error: 'message'}
 */
  async set_chat_read(data) {
    //console.log("set_chat_read API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.set_chat_read,
        body: {
          chat_id: data.chat_id,
          active: data.active,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("set_chat_read API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("set_chat_read API error! ", error);
        throw error;
      });
  }


  /**
    * ### add_to_chat
    *
    * @param data object
    *
    * message_text
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async add_to_chat(data) {
    //console.log("add_to_chat API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.add_to_chat,
        body: {
          message_text: data.message_text,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("add_to_chat API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("add_to_chat API error! ", error);
        throw error;
      });
  }


  /**
    * ### update_user
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async update_user(data) {
    //console.log("update_user API: ", data);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.update_user,
        body: {
          phone: data.phone,
          address: data.address,
          app_name: CONFIG.PGSTORE_API.app_name,
        },
      },
      "POST"
    )

      .then((response) => {
        //console.log("update_user API: ", JSON.parse(JSON.stringify(response)));
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("update_user API error! ", error);
        throw error;
      });
  }


  /**
    * ### get_banners
    *
    * @param data object
    *
    * 
    *
    * @return
    * if ok, res.json={...}
    *
    * if error, {code: xxx, error: 'message'}
    */
  async get_banners(data) {
    //console.log("get_banners API: ", data);
    const params = {
      ...data,
      app_name: CONFIG.PGSTORE_API.app_name,
    };
    //console.log("get_banners API: ", params);
    return await this._fetch(
      {
        url: CONFIG.PGSTORE_API.get_banners,
        params: params,
      },
      "GET"
    )

      .then((response) => {
        //console.log("get_banners API: ", response);
        return JSON.parse(JSON.stringify(response));
      })

      .catch((error) => {
        console.log("get_banners API error! ", error);
        throw error;
      });
  }

  //--------------- FETCH ---------------


  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch(opts, method = "POST") {
    opts = _.extend(
      {
        method: method,
        url: null,
        body: null,
        data: null,
        params: null,
        callback: null,
        uid: null,
      },
      opts
    );

    var reqOpts = {
      method: opts.method,
      timeout: 10000,
      headers: {},
    };

    reqOpts.headers["Authorization"] = this._sessionToken;
    reqOpts.headers["Accept"] = "application/json";
    reqOpts.headers["Content-Type"] = "application/json";
    reqOpts.headers["app"] = CONFIG.PGSTORE_API.app_name;

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }
    if (opts.body) {
      reqOpts.data = JSON.stringify(opts.body);
    }
    if (opts.params) {
      reqOpts.params = opts.params;
    }

    let url = opts.url;

    //console.log("PGSTORE fetch reqOpts: ", reqOpts);

    //return await fetch(url, reqOpts)
    if (method === "POST") {
      return await axios.post(url, reqOpts.data, reqOpts)
        .then((response) => {
          //console.log("axios response: ", response);
          return response;
        })
        .catch((error) => {
          console.log("axios post fail with error! ", error);
          throw error;
        });
    } else {
      if (method === "DELETE") {
        return await axios.delete(url, reqOpts)
          .then((response) => {
            //console.log("axios response: ", response);
            return response;
          })
          .catch((error) => {
            console.log("axios delete fail with error! ", error);
            throw error;
          });
      }
      else {
        return await axios.get(url, reqOpts)
          .then((response) => {
            //console.log("axios response: ", response);
            return response;
          })
          .catch((error) => {
            console.log("axios fail with error! ", error);
            throw error;
          });
      }
    }
  }

}
// The singleton variable
export let pGStoreApi = new PGStoreApi();

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{ text: 'Done' }]);