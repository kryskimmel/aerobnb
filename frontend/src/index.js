import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';

import { OpenModalMenuProvider } from './context/OpenModalContext';
import { CurrSpotIdProvider } from './context/CurrSpotId';



const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotActions = spotActions;
};


function Root() {
  return (
    <ReduxProvider store={store}>
      <OpenModalMenuProvider>
        <CurrSpotIdProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </CurrSpotIdProvider>
      </OpenModalMenuProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
