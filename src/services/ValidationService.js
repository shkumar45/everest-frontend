export const isEmpty = (value) => value.trim() === "";

export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email.trim());
};
