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

var nativePaymentService;
if(process.platform === 'android')
    nativePaymentService = require('bridge').load('org.webinos.android.impl.payment.PaymentDemoWalletImpl', this);
else{
    console.log("There is no demowallet other than in android!");
	throw new Error("Not supported platform")
}

var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;


/**
 * Webinos Service constructor.
 * @constructor
 * @alias PaymentDemoWalletService
 * @param rpcHandler A handler for functions that use RPC to deliver their result.
 */
var PaymentDemoWalletService = function(rpcHandler, params) {
        // inherit from RPCWebinosService
        this.base = RPCWebinosService;
        this.base({
                api:'http://webinos.org/api/payment.demowallet',
                displayName:'Payment Service',
                description:'Pay using the demo wallet.'
        });
};



PaymentDemoWalletService.prototype = new RPCWebinosService;

/**
 * Pays a bill
 * @param params Array of strings consisting of itemList, bill, customerID, shopID, callback- in that order.
 * @param successCallback Issued when the shopping basket is created.
 * @param errorCallback Issued if an error occurs during the creation of the
 *     shopping basket.
 */
PaymentDemoWalletService.prototype.pay = function ( params, successCallback,  errorCallback){

  console.log("DemoWallet PAY called on rpc receiver "+   params[0] +" "+ params[1]+" "+ params[2] );
  console.log("Bill item is:");
  console.log(JSON.stringify(params,null," ") );
  nativePaymentService.pay(
    function (result){
          successCallback(result);
       },
       function (error){
            errorCallback(error);
       },
       params[4],
       params[0], params[1], params[2], params[3]
  );

};


//export our object
exports.Service = PaymentDemoWalletService;

})();
