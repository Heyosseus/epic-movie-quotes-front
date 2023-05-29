export function getCookie(name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
  }
  return null
}

export function setCookie(name, value, minutes) {
  var expires = ''
  if (minutes) {
    var date = new Date()
    date.setTime(date.getTime() + minutes * 600 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}