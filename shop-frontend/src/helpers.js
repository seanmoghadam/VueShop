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

export const errorFormatter = (e) => {
    // log error
    console.error("Error", e.response);

    // format error messages
    let errors = [];
    if (Array.isArray(e?.response?.data?.errors)) {
        errors = e.response.data.errors;
    } else if (e?.response?.data?.message) {
        errors = [e?.response?.data?.message];
    } else {
        errors = [
            "Es ist ein unbekannter Fehler aufgetreten",
        ];
    }
    return errors;
}

