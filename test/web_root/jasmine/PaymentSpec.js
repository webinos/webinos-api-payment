/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2012 Christian Fuhrhop, Fraunhofer FOKUS
 ******************************************************************************/

describe("Payment API", function() {
        var paymentService;
        var featureURI;
        var itemList = new Array();
        itemList[0] = {  productID: 'DCD2346233',
                        description: 'Best of Ladytron 00-10 by Ladytron (Audio CD - 2011)',
                        currency: 'EUR',
                        itemPrice: 14.99,
                        itemCount: 1
                      };
        itemList[1] = {  productID: 'DCD1358954167', 
                        description: 'Breakfast at Tiffanys DVD',
                        currency: 'EUR',
                        itemPrice: 5.97,
                        itemCount: 1
                      };
        itemList[2] = {  description: 'Postage and Packaging',
                        currency: 'EUR',
                        itemPrice: 5.0,
                        itemCount: 1
                      };

        var bill = {  description: 'Bill 123456',
                        currency: 'EUR',
                        itemPrice: 25.96
                      };

        if(navigator.userAgent.indexOf('Android') !== -1) {
            featureURI = 'http://webinos.org/api/payment/demowallet';
        } else {
            featureURI = 'http://webinos.org/api/payment/mockwallet';
        }

        webinos.discovery.findServices(new ServiceType(featureURI), {
                onFound: function (service) {
                    paymentService = service;
                }
        });

        beforeEach(function() {
                waitsFor(function() {
                        return !!paymentService;
                }, "The discovery didn't find a Payment service", 5000);
        });

        it("should be available from the discovery", function() {
                expect(paymentService).toBeDefined();
        });

        it("has the necessary properties as service object", function() {
                expect(paymentService.state).toBeDefined();
                expect(paymentService.api).toEqual(jasmine.any(String));
                expect(paymentService.id).toEqual(jasmine.any(String));
                expect(paymentService.displayName).toEqual(jasmine.any(String));
                expect(paymentService.description).toEqual(jasmine.any(String));
                expect(paymentService.icon).toEqual(jasmine.any(String));
                expect(paymentService.bindService).toEqual(jasmine.any(Function));
        });

        it("can be bound", function() {
                var bound = false;

                paymentService.bindService({onBind: function(service) {
                        paymentService = service;
                        bound = true;
                }});

                waitsFor(function() {
                    return bound;
                }, "The service couldn't be bound", 500);

                runs(function() {
                        expect(bound).toEqual(true);
                });
        });

        it("has the necessary functions as Payment API service", function() {
                expect(paymentService.pay).toEqual(jasmine.any(Function));
        });

        it("calls payment success callback", function() {
            var success = false;

            var paymentSuccess = function() {
                success = true;
            };

            paymentService.pay(paymentSuccess, function(){}, function(){},
                    itemList, bill,  "mymail@provider.com", "ShopName12345");

            waitsFor(function() {
                return success;
            }, "payment to succeed", 500);

            runs(function() {
                expect(success).toEqual(true);
            });
        });

        it("should call error callback for undefined item list and bill", function() {
            var error = false;

            var paymentError = function(e) {
                error = true;
                expect(e).toEqual(jasmine.any(Object));
                expect(e.code).toEqual(jasmine.any(String));
                expect(e.message).toEqual(jasmine.any(String));
                expect(e.retryPossible).toBeDefined();
                expect(e.retryPossible).not.toBe(null); // either true or false
            };

            paymentService.pay(function() {}, paymentError);

            waitsFor(function() {
                return error;
            }, "payment to fail", 1000);

            runs(function() {
                expect(error).toEqual(true);
            });
        });
});
