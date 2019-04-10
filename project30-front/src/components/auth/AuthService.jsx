// auth/auth-service.js
import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true,
    });
    this.service = service;
  }

  loggedin = () => {
    return this.service.get("/loggedin").then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };

  logout = () => {
    return this.service.post("/logout", {}).then(response => response.data);
  };

  signup = (username, password, email, twitterUsername) => {
    return this.service
      .post("/signup", { username, password, email, twitterUsername })
      .then(response => response.data);
  };

  updateTwitter = (userId, twitterUsername) => {
    return this.service
      .post("/updateTwitter", { userId, twitterUsername })
      .then(response => response.data);
  };
}

export default AuthService;
