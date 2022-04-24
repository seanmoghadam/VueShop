import Cookies from "js-cookie";
import axios from "axios";

const authCookieKey = "authorization-token";

export default class AuthService {
  static isLoggedIn = () => !!Cookies.get(authCookieKey);

  static logout = () => {
    Cookies.remove(authCookieKey);
  };

  static setToken = (token) => {
    Cookies.set(authCookieKey, token);
  };

  static getToken = () => {
    return Cookies.get(authCookieKey);
  };

  static getFullToken = () => {
    return `Bearer ${Cookies.get(authCookieKey)}`;
  };

  static async login(params) {
    const apiUrl = process.env.VUE_APP_API_URL;

    const apiEndpoint = `${apiUrl}/login`;
    return axios
      .post(apiEndpoint, params)
      .then((resp) => {
        const token = resp?.data?.accessToken ?? null;
        return token;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  static async register(params) {
    const apiUrl = process.env.VUE_APP_API_URL;

    const apiEndpoint = `${apiUrl}/register`;
    return axios
      .post(apiEndpoint, params)
      .then((resp) => {
        const token = resp?.data?.accessToken ?? null;
        return token;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  static async getUserData() {
    const apiUrl = process.env.VUE_APP_API_URL;

    // get user bearer token, extract id from jwt token
    const token = AuthService.getToken();
    if (token) {
      const tokenParts = token.split(".");
      const tokenId = tokenParts[1];
      const tokenIdDecoded = JSON.parse(atob(tokenId));
      const userId = tokenIdDecoded.sub;

      const apiEndpoint = `${apiUrl}/644/users/${userId}`;
      return axios
        .get(apiEndpoint)
        .then((resp) => {
          const userData = resp?.data;
          return userData;
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    }
  }
}
