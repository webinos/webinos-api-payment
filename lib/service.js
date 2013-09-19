/*******************************************************************************
 * Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
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
	var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;

    var PaymentModule = function(rpcH, par) {
        this.rpcHandler = rpcH;
        this.params = par;

        this.init = function(register, unregister) {
            if (this.params){ // If there are any parameters
				// Loop through properties to get the implementations
				for (var impl in this.params){
					// If it is an object's property and not inherited somehow
					if (this.params.hasOwnProperty(impl){
						try{
							var service = new require(__dirname + "/payment." + impl + ".js").Service(this.rpcHandler, this.params[impl]);
							register(service);
						}catch(e){
							console.log("Could not load payment implementation for ", impl, e);
						}
					}
				}
			}
        };
    };

    exports.Module = PaymentModule;
})();


