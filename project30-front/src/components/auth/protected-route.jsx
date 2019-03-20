// auth/protected-route.js

import React from "react";
import { Route, Redirect } from "react-router-dom";

const protectedRoute = ({ component: Component, user, liftTwitter, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
        
          return <Component {...props} loggedInUser={user} liftTwitter={liftTwitter}  />;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
export default protectedRoute;
