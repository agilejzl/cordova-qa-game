/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.checkWxInstalled();
    },

    checkWxInstalled: function() {
        Wechat.isInstalled(function (installed) {
            // alert("Wechat installed: " + (installed ? "Yes" : "No"));
            window.plugins.toast.showShortTop('已安装微信: ' + installed);
        }, function (reason) {
            // alert("Failed: " + reason);
            window.plugins.toast.showLongTop('请安装微信: ' + reason);
        });
    },

    goWxLogin: function() {
        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());
        console.log('跳转微信登录...');
        window.plugins.toast.showLongTop('跳转微信登录...');
        Wechat.auth(scope, state, function (response) {
            // you may use response.code to get the access token.
            // alert(JSON.stringify(response));
            window.plugins.toast.showLongTop(JSON.stringify(response));
        }, function (reason) {
            // alert("Failed: " + reason);
            window.plugins.toast.showLongTop('微信登录失败：' + reason);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        // window.plugins.toast.showShortTop('欢迎~~')
    }
};

app.initialize();

