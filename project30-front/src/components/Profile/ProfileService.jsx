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

   errHandler = err => {
    // console.error(err);
    if (err.response && err.response.data) {
      // console.error("API response", err.response.data);
      throw err.response.data.message
    }
    throw err;
  }


  
  // Method addPicture
  addPicture(file,userId) {
    const formData = new FormData();
    formData.append("picture", file)
    formData.append("userId","5c8e6f7ff277d710c403a670")

    return this.service
      .post('/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(res => res.data)
      .catch(this.errHandler);
  }


}

export default ProfileService;
