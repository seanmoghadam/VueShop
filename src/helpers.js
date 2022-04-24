export const errorFormatter = (e) => {
  // log error
  console.error("Error", e.response);

  // format error messages
  let errors = [];
  if (e?.response?.status === 401) {
    errors = ["Please login to continue"];
  } else if (typeof e?.response?.data === "string") {
    errors = [e?.response?.data];
  } else {
    errors = ["Something went wrong"];
  }
  return errors;
};
