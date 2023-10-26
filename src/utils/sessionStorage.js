export function getUser() {
  if (typeof window === "undefined") return;
  const sessionUser = window.sessionStorage.getItem("user") || "";
  return sessionUser;
}

export function setUser(user) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("user", user);
}

export function clearUser() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem("user");
}
