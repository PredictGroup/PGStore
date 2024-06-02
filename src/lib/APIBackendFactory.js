/**
 * # APIBackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import {pGStoreApi} from './PGStoreApi'

export default function APIBackendFactory (token = null) {
    pGStoreApi.initialize(token);
    return pGStoreApi;
}
