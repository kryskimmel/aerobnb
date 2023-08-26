import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";

import SignupFormPage from "./components/SignupFormPage";
import SpotsLandingPage from "./components/Spots/SpotsLandingPage";
import SpotDetailPage from "./components/Spots/SpotDetail";

import ModalContainer from "./components/Modals/ModalContainer";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(spotActions.fetchAllSpots()))
      .then(() => dispatch(spotActions.fetchSpotById(1)))
      .then(() => {setIsLoaded(true)})

      return () => {

      }

  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <ModalContainer/>
      {isLoaded && (
        <Switch>
          <Route exact path ="/">
            <SpotsLandingPage/>
          </Route>
          <Route path="/login">
            <LoginFormPage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage/>
          </Route>
          <Route path ="/spots/:id">
            <SpotDetailPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
