export function setToken(token) {
  window.sessionStorage.setItem("authToken", token)
}

export function getToken() {
  return window.sessionStorage.getItem("authToken");

}

export function removeToken() {
  window.sessionStorage.removeItem("authToken")
}
