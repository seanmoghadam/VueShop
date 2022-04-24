import axios from "axios";
import AuthService from "./AuthService";

// http://localhost/api

export default class BookService {
  static getBooks = async () => {
    const apiUrl = process.env.VUE_APP_API_URL;
    const apiEndpoint = `${apiUrl}/644/books`;
    return axios
      .get(apiEndpoint, {
        headers: {
          Authorization: AuthService.getFullToken(),
        },
      })
      .catch((e) => {
        console.error(e);
        throw e;
      })
      .then((resp) => {
        return resp.data;
      });
  };

  static addBookToCart = (currentState, newItem) => {
    console.log(currentState, newItem);
    currentState.cart.push(newItem);
  };

  static removeBookFromCart = (currentState, index) => {
    currentState.cart.splice(index, 1);
  };
}
