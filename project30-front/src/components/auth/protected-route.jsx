// auth/protected-route.js

import React from "react";
import { Route, Redirect } from "react-router-dom";

const protectedRoute = ({
  component: Component,
  user,
  liftTwitter,
  twitterUsername,
  liftAvatar,
  liftProfile,

  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return (
            <Component
              {...props}
              loggedInUser={user}
              liftTwitter={liftTwitter}
              twitterUsername={twitterUsername}
              liftAvatar={liftAvatar}
              liftProfile={liftProfile}
            />
          );
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};
export default protectedRoute;
