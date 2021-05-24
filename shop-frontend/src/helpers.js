export const isLoggedIn = () => {
    return !!window.localStorage.getItem("authorization-token")
}

export const logout = () => {
    window.localStorage.clear()
}

export const addBookToCart = (currentState, newItem) => {
    console.log("Book added");
    currentState.cart.push(newItem);
}

export const removeBookFromCart = (currentState, index) => {
    currentState.cart.splice(index, 1);
}

