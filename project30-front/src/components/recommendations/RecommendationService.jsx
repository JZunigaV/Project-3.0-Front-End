// auth/auth-service.js
import axios from "axios";

class RecommendationService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:4000/api",
      withCredentials: true,
    });
    this.service = service;
  }

  movieRecommendations = twitterUsername => {
    return this.service
      .post("/recommendedMovies", { username: twitterUsername })
      .then(response => response.data)
      .catch(err => {
        console.log(err);
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
  
}

export default RecommendationService;
