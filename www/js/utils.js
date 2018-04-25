// window.API_HOST = 'http://192.168.0.159:8090/'
window.API_HOST = 'http://qa-api.kdan.cn/'
window.TEST_TOKEN = 'test_auth_token'

Storage.prototype.setObject = function(key, value) { this.setItem(key, JSON.stringify(value)); }
Storage.prototype.getObject = function(key) { var value = this.getItem(key);return value && JSON.parse(value); }

function serializeHash($form) {
  return $form.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {}); }

function currentUser() {
  return localStorage.getObject('currentUser');
}

function setCurrentUser(hash_user) {
  localStorage.setObject('currentUser', hash_user);
}

function showUserInfo() {
  $('.event.received').html('欢迎 ' + currentUser().user.name + ' (' + currentUser().user.score + '分)');
}
