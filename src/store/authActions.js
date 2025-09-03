import { start, success, failure } from "./authSlice";

const USERS_KEY = "mock_users";

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const registerUser = (userData) => async (dispatch) => {
  dispatch(start());

  setTimeout(() => {
    const users = getUsers();
    const userExists = users.find((user) => user.email === userData.email);

    if (userExists) {
      dispatch(failure("User already registered"));
    } else {
      users.push(userData);
      saveUsers(users);
      dispatch(success(null)); // do not auto-login
    }
  }, 1000);
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(start());

  setTimeout(() => {
    const users = getUsers();
    const user = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(success(user));
    } else {
      dispatch(failure("No registered User, Please register first!"));
    }
  }, 1000);
};

// NEW: Forgot Password / Reset Password combined
export const forgotPassword = ({ email, password }) => async (dispatch) => {
  dispatch(start());

  setTimeout(() => {
    const users = getUsers();
    const index = users.findIndex((u) => u.email === email);

    if (index !== -1) {
      users[index].password = password;
      saveUsers(users);
      dispatch(success(null));
    } else {
      dispatch(failure("Email does not exist"));
    }
  }, 1000);
};
