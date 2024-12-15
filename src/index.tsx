import React, { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './services/store';
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Router /*  store={store} */>
      <App />
    </Router>
  </React.StrictMode>
);
