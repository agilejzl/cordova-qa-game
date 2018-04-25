
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
        showGuessResult: function() {
          var self = this;
          var $form = $(this.$el).find('form');
          var formData = serializeHash($form);
          var guess = formData.guess_conent;
          if (guess.trim() === "") {
            window.plugins.toast.showLongTop('请输入你的猜测词');
            return
          }

          var answers = this.$data.qa.answers;
          console.log("你猜测是: " + guess, answers);
          // window.plugins.toast.showLongTop('你猜测是: ' + guess);

          $.ajax({
            url: API_HOST + 'api/questions/' + this.$data.qa.id + '/guess_answer',
            type: 'POST',
            data: { data: {
                guess: {
                  content: guess
                }
              } },
            beforeSend:function (request) {
              request.setRequestHeader ('Accept', 'application/vnd.api+json;version=1');
              request.setRequestHeader ('Authorization', currentUser().auth_token);
            },
            success: function(data, status, xhr) {
              var data = data.data;
              console.log("guessQa: ", data);

              if ($.isEmptyObject(data)) {
                console.warn(new Date() + " 非常遗憾，你猜错了");
                window.plugins.toast.showLongTop('喔 很遗憾猜错了~~');
              } else if (data.hited_answer.match_pattern === 'match_equal') {
                console.log(new Date() + " 你真厉害，完全猜对");
                window.plugins.toast.showLongTop('真厉害，完全猜对!');
                setTimeout(function() {
                  document.location.href = 'index.html';
                }, 2000);
              } else if (data.hited_answer.match_pattern === 'match_include') {
                console.log(new Date() + " 你真厉害，猜对了关键词");
                window.plugins.toast.showLongTop('不错哦，猜对了关键词!');
              } else {
                console.log(new Date() + " 喔 很遗憾猜错了~~");
                window.plugins.toast.showLongTop('喔 很遗憾猜错了~~');
              }
            },
            error: function(data, status, xhr) {
              console.error('api error: ', data.responseText)
              var error = JSON.parse(data.responseText)['errors'][0];
              window.plugins.toast.showLongTop(error['detail']);
            }
          });
        },
        getQa: function() {
          this.$set(this.$data, 'qa', localStorage.getObject('currentQA'));
          // var self = this;
          // $.ajax({
          //   url: API_HOST + "api/questions/68",
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

