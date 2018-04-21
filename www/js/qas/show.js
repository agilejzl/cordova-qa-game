
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
    this.newQaShowVue();
  },

  newQaShowVue: function() {
    if ($(".container-qa-show").size() == 0) {
      return;
    }
    new Vue({
      el: ".container-qa-show",
      data: {
        qa: '',
        haveJoined: false,
        statuses: {
          created: '已创建',
          opening: '竞猜中',
          exposed: '已公布',
          closed: '已关闭'
        },
      },
      created: function () {
        this.getQa();
      },
      methods: {
        viewAnswerTap: function() {
          this.$set(this.$data, 'haveJoined', !this.haveJoined);
        },
        getQa: function() {
          this.$set(this.$data, 'qa', localStorage.getObject('currentQA'));
          // var self = this;
          // $.ajax({
          //   url: "http://qa-api.kdan.cn/api/questions/68",
          //   // url: "http://localhost:8090/api/questions",
          //   type: 'get',
          //   beforeSend:function (request) {
          //     request.setRequestHeader ('Content-Type', 'application/json');
          //     request.setRequestHeader ('Accept', 'application/vnd.api+json;version=1');
          //   },
          //   success: function(data, status, xhr) {
          //     var qa = data.data;
          //     console.log('qa:', qa);
          //     window.plugins.toast.showShortTop('成功刷新QA')
          //     self.$set(self.$data, 'qa', qa);
          //   },
          //   error: function(data, status, xhr) {
          //     console.error('api error')
          //     window.plugins.toast.showLongTop('获取数据失败')
          //   }
          // });
        }
      }
    });
  }
};

app.initialize();

