// auth/auth-service.js
import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:4000/auth",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (username, password, email) => {
    return this.service
      .post("/signup", { username, password, email })
      .then(response => response.data);
      
  };
}

export default AuthService;
