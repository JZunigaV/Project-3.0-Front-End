// auth/auth-service.js
import axios from "axios";

class ProfileService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:4000/profile",
      withCredentials: true
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
        bio: bio
      })
      .then(response => response.data)
      .catch(err => this.errHandler(err));
  };

  errHandler = err => {
    // console.error(err);
    if (err.response && err.response.data) {
      // console.error("API response", err.response.data);
      throw err.response.data.message;
    }
    throw err;
  };

  // Method addPicture
  addPicture = (file, userId) => {
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("userId", userId.id);

    return this.service
      .post("/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(this.errHandler);
  };

  //add Favorite movie to the user profile
  addFavorite = (userId, movie) => {
    debugger;
    return this.service
      .post("/addfavorites", {
        userId: userId,
        movie: movie
      })
      .then(response => response.data)
      .catch(err => this.errHandler(err));
  };

  //Get favorite movies for the user Id
  getFavorites = userId => {
    debugger;
    return this.service
      .post("/favorites", { userId: userId })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return this.errHandler(err);
      });
  };
}

export default ProfileService;
