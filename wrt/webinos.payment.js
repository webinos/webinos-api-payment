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
******************************************************************************/

(function() {
	//Payment Module Functionality

	PaymentModule = function (obj){      
			this.base = WebinosService;
			this.base(obj);
	};
	// This is the new way, but the old way (Public object accessible by servicedisco) works as well
	//_webinos.registerServiceConstructor("http://webinos.org/api/payment", PaymentModule);

	PaymentModule.prototype = new WebinosService;

	/**
	 * To bind the service.
	 * @param bindCB BindCallback object.
	 */
	PaymentModule.prototype.bindService = function (bindCB, serviceId) {
			this.listenAttr = {};
			
			if (typeof bindCB.onBind === 'function') {
					bindCB.onBind(this);
			};
	}

	PaymentModule.prototype.pay = function (successCallback, errorCallback, challengeCallback,  itemList,  bill,  customerID,  sellerID) {
			   
				var arguments = new Array();
				arguments[0]=itemList;
				arguments[1]=bill;
				arguments[2]=customerID;
				arguments[3]=sellerID;
				arguments[4]=challengeCallback;
				var self = this;
				var rpc = webinos.rpcHandler.createRPC(this, "pay", arguments);
				webinos.rpcHandler.executeRPC(rpc,
								function (params){successCallback(params);},
								function (error){errorCallback(error);}
				);
		}
            
}());
