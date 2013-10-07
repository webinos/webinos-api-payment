/*******************************************************************************
*  Code contributed to the webinos project
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Copyright 2013 Fraunhofer FOKUS
*
******************************************************************************/
(function() {

var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;

/**
 * Webinos Service constructor.
 * @constructor
 * @alias PaymentMockWalletService
 * @param rpcHandler A handler for functions that use RPC to deliver their result.
 */
var PaymentMockWalletService = function(rpcHandler, params) {
        // inherit from RPCWebinosService
        this.base = RPCWebinosService;
        this.base({
                api:'http://webinos.org/api/payment/mockwallet',
                displayName:'Payment Service',
                description:'Pay using the mock wallet.'
        });
};

PaymentMockWalletService.prototype = new RPCWebinosService;

/**
 * Pays a bill
 * @param params Array of strings consisting of itemList, bill, customerID, shopID, callback- in that order.
 * @param successCallback Issued when the shopping basket is created.
 * @param errorCallback Issued if an error occurs during the creation of the
 *     shopping basket.
 */
PaymentMockWalletService.prototype.pay = function ( params, successCallback,  errorCallback){

  console.log("MockWallet PAY called on rpc receiver "+   params[0] +" "+ params[1]+" "+ params[2] );
  console.log("Bill item is:");
  console.log(JSON.stringify(params,null," ") );
  //this mock service calls scb in any case
  var proofOfPurchase = "payment_ok_"+Math.random();
  successCallback(proofOfPurchase);

};


//export our object
exports.Service = PaymentMockWalletService;

})();
