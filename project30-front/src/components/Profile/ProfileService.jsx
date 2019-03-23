// auth/auth-service.js
import axios from "axios";

class ProfileService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:4000/profile",
      withCredentials: true,
    });
    this.service = service;
  }

  getUser = userId => {
    return this.service
      .get(`/${userId}`)
      .then(response => response.data)
      .catch(err => console.log(err));
  };

  createUpdateUser = (id, location, bio) => {
    return this.service
      .post("/new", {
        id: id,
        location: location,
        bio: bio,
      })
      .then(response => response.data)
      .catch(err => console.log(err));
  };
}

export default ProfileService;
