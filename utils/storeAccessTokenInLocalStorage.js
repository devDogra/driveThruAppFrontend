function storeAccessTokenInLocalStorage(accessToken) {
    window.localStorage.setItem("accessToken", accessToken)
    // Refresh token is an httpOnly cookie, so we can't access it via JS, 
    // but it IS receieved (check network tab -> response cookies)
}

export default storeAccessTokenInLocalStorage;