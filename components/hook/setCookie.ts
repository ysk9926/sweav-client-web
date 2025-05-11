export const setCookie = (type: string, token: string) => {
  if (typeof document !== "undefined") {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = type + "=" + token + "; " + expires + "; path=/";
  }
};

export const getAccessToken = () => {
  if (typeof document !== "undefined") {
    const cookieName = "AccessToken" + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
};

export const getRefreshToken = () => {
  if (typeof document !== "undefined") {
    const cookieName = "RefreshToken" + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
};

export const deleteAccessToken = () => {
  if (typeof document !== "undefined") {
    const expirationDate = new Date(0); // 과거 날짜로 설정
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "AccessToken=; " + expires + "; path=/";
  }
};

export const deleteRefreshToken = () => {
  if (typeof document !== "undefined") {
    const expirationDate = new Date(0); // 과거 날짜로 설정
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "RefreshToken=; " + expires + "; path=/";
  }
};

export enum TokenStorageKey {
  accessToken = "AccessToken",
  refreshToken = "RefreshToken",
}
