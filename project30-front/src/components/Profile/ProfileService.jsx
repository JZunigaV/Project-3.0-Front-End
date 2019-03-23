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

  createUpdateUser = (id, handle, location, bio, skills) => {
    return this.service
      .post("/new", {
        id: id,
        handle: handle,
        location: location,
        bio: bio,
        skills: skills,
      })
      .then(response => response.data)
      .catch(err => console.log(err));
  };
}

export default ProfileService;
