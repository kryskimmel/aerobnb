import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginModal from "./components/Modals/LoginModal";
import SignupFormPage from "./components/SignupFormPage";
import SpotsLandingPage from "./components/Spots/SpotsLandingPage";
// import { LoginContext } from "./context/LoginModalContext";
// import ('./components/Modals/LoginModal.css')


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  // const {openLogin} = useContext(LoginContext);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  // const toggleOverlay = "add-overlay" + (openLogin ? "" : "no-overlay")
  // const body = document.body.setAttribute("id", toggleOverlay)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path ="/">
            <SpotsLandingPage/>
          </Route>
          <Route path="/login">
            <LoginModal/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
