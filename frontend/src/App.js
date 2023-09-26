import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import ModalContainer from "./components/Modals/ModalContainer";
import CreateSpot from "./components/Spots/CreateSpot";
import UpdateSpot from "./components/Spots/UpdateSpot";
import LandingPage from "./components/Spots/LandingPage";
import SpotDetail from "./components/Spots/SpotDetail";
import SpotManagement from "./components/Spots/SpotManagement";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import Review from "./components/Reviews/Review";







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
          <Route path="/review">
            <Review/>
          </Route>
          <Route path="/spots/:id/edit">
            <UpdateSpot/>
          </Route>
          <Route path="/spots/current">
            <SpotManagement/>
          </Route>
          <Route path="/spots/new">
            <CreateSpot/>
          </Route>
          <Route path="/spots/:id">
            <SpotDetail/>
          </Route>
          <Route exact path="/">
            <LandingPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
