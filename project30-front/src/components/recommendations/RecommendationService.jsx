// auth/auth-service.js
import axios from "axios";

class RecommendationService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
      withCredentials: true,
    });
    this.service = service;
  }

  movieRecommendations = twitterUsername => {
    return this.service
      .post("/recommendedMovies", { username: twitterUsername })
      .then(response => response.data)
      .catch(err => {
        this.errHandler(err);
      });
  };

  personalityInsights = twitterUsername => {
    return this.service
      .post("/personality", { username: twitterUsername })
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      });
  };

  errHandler = err => {
    // console.error(err);
    if (err.response && err.response.data) {
      // console.error("API response", err.response.data);
      return err.response.data[0].message;
    }
    return err;
  };
}

export default RecommendationService;
