// auth/auth-service.js
import axios from "axios";

class ProfileService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/profile`,
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

  createUpdateUser = (id, bio, twitterUsername) => {
    return this.service
      .post("/new", {
        id: id,
        bio: bio,
        twitterUsername: twitterUsername,
      })
      .then(response => response.data)
      .catch(err => this.errHandler(err));
  };

  errHandler = err => {
    // console.error(err);
    if (err.response && err.response.data) {
      // console.error("API response", err.response.data);
      return err.response.data.msg;
    }
    return err;
  };

  // Method addPicture
  addPicture = (file, userId) => {
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("userId", userId);

    return this.service
      .post("/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => res.data)
      .catch(this.errHandler);
  };

  //add Favorite movie to the user profile
  addFavorite = (userId, movie) => {
    return this.service
      .post("/addfavorites", {
        userId: userId,
        movie: movie,
      })
      .then(response => response.data)
      .catch(err => this.errHandler(err));
  };

  //Delete favorite movies
  deleteFavorite = async (movie, userId) => {
    try {
      const response = await this.service.post("/deletefavorites", {
        movie,
        userId,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Get favorite movies for the user Id
  getFavorites = userId => {
    return this.service
      .post("/favorites", { userId: userId })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return this.errHandler(err);
      });
  };

  //Get the movie info
  getMovieInfo = (title, releaseDate) => {
    return this.service
      .post("/info", { movieTitle: title, movieRelease: releaseDate })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return this.errHandler(err);
      });
  };
}

export default ProfileService;
