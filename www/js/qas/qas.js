
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
    this.newQaListVue();
  },

  newQaListVue: function() {
    if ($(".container-qas").size() == 0) {
      return;
    }
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
        goQaViewTap: function(qa) {
          console.log("QA: ", qa);
          localStorage.setObject('currentQA', qa);
          document.location.href = 'show.html';
        },
        getQaList: function() {
          var self = this;
          $.ajax({
            url: API_HOST + 'api/questions',
            type: 'GET',
            beforeSend:function (request) {
              request.setRequestHeader ('Content-Type', 'application/json');
              request.setRequestHeader ('Accept', 'application/vnd.api+json;version=1');
            },
            success: function(data, status, xhr) {
              var items = new Array();
              var items = data.data;
              console.log('qas:', items);
              window.plugins.toast.showShortTop('成功刷新QAs')
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

