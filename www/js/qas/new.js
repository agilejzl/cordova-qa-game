
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
    this.newQaNewVue();
  },

  newQaNewVue: function() {
    if ($(".container-qa-new").size() == 0) {
      return;
    }
    new Vue({
      el: ".container-qa-new",
      data: {
        show_type: 0,
        match_pattern: 0,
        show_types: [
          { name: '公开', value: 0, checked: 'true' },
          { name: '匿名', value: 1 }
        ],
        match_patterns: [
          { name: '完全匹配', value: 0, checked: 'true' },
          { name: '关键词匹配', value: 1 }
        ]
      },
      created: function () {
        console.log("Ready now")
      },
      methods: {
        submitNewQa: function() {
          var $form = $(this.$el).find('form');
          var formData = serializeHash($form);
          console.log('newQa: ', formData);
          // window.plugins.toast.showLongTop('newQa: ' + JSON.stringify(formData));

          if (formData.content.trim() === "") {
            window.plugins.toast.showLongTop('请输入题目内容');
            return
          } else if (formData.answer_content.trim() === "") {
            window.plugins.toast.showLongTop('请输入答案内容');
            return
          }

          data = {
            show_type: ~~this.$data.show_type,
            content: formData.content,
            ticket_price: ~~formData.ticket_price,
            answers: [{
              match_pattern: ~~this.$data.match_pattern,
              content: formData.answer_content,
              award_price: ~~formData.answer_award_price
            }]
          }
          console.log('qaData: ', data);
          // window.plugins.toast.showLongTop('qaData: ' + JSON.stringify(data));

          $.ajax({
            url: API_HOST + 'api/questions',
            type: 'POST',
            data: JSON.stringify({ data: data }),
            beforeSend:function (request) {
              request.setRequestHeader ('Content-Type', 'application/json');
              request.setRequestHeader ('Accept', 'application/vnd.api+json;version=1');
              request.setRequestHeader ('Authorization', TEST_TOKEN);
            },
            success: function(data, status, xhr) {
              console.log("createdQa: ", data.data);
              var qa = data.data;
              localStorage.setObject('currentQA', qa);
              document.location.href = 'show.html';
              window.plugins.toast.showLongTop('发布成功');
            },
            error: function(data, status, xhr) {
              console.error('api error: ', data.responseText)
              var error = JSON.parse(data.responseText)['errors'][0];
              window.plugins.toast.showLongTop(error['detail']);
            }
          });
        }
      }
    });
  }
};

app.initialize();

