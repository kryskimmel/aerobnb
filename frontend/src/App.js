import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ModalContainer from "./components/Modals/ModalContainer";
import LandingPage from "./components/Spots/LandingPage";
import ShowDetail from "./components/Spots/SpotDetail";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(spotActions.fetchSpots()))
      .then(() => {setIsLoaded(true)})
  }, [dispatch]);




  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <ModalContainer/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/spots/:id">
            <ShowDetail/>
          </Route>
          <Route path="/login">
            <LoginFormPage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
