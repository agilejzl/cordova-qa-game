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
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
    new Vue({
      el: ".container-qas",
      data: {
        items: [],
        statuses: {
          created: '已创建',
          opening: '竞猜中',
          exposed: '已公布',
          closed: '已关闭'
        },
      },
      created: function () {
        this.getQaList();
      },
      methods: {
        getQaList: function() {
          var self = this;
          $.ajax({
            url: "http://qa-api.kdan.cn/api/questions",
            // url: "http://localhost:8090/api/questions",
            type: 'get',
            beforeSend:function (request) {
              request.setRequestHeader ('Content-Type', 'application/json');
              request.setRequestHeader ('Accept', 'application/vnd.api+json;version=1');
            },
            success: function(data, status, xhr) {
              var items = new Array();
              var items = data.data;
              console.log('qas:', items);
              window.plugins.toast.showShortTop('成功刷新数据')
              self.$set(self.$data, 'items', items);
            },
            error: function(data, status, xhr) {
              console.error('api error')
              window.plugins.toast.showLongTop('获取数据失败')
            }
          });
        }
      }
    });
  }
};

app.initialize();

