Storage.prototype.setObject = function(key, value) { this.setItem(key, JSON.stringify(value)); }
Storage.prototype.getObject = function(key) { var value = this.getItem(key);return value && JSON.parse(value); }

function serializeHash($form) {
  return $form.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {}); }
