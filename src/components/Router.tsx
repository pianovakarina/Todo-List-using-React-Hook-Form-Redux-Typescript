import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import FormAuthorization from "../pages/FormAuthorization";
import FormRegistration from "../pages/FormRegistration";
import Main from "../pages/Main";
import { RootState } from "../redux/store";

const Router = () => {
  const { isAuthorization } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Switch>
        {!isAuthorization && (
          <Route path="/auth">
            <FormAuthorization />
          </Route>
        )}

        {isAuthorization && (
          <Route path="/" exact>
            <Main />
          </Route>
        )}
        <Route path="/reg">
          <FormRegistration />
        </Route>
        <Redirect to={isAuthorization ? "/" : "/auth"} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
