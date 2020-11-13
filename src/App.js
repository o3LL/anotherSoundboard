import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/app-store';

import AppContainer from './AppContainer'

function App() {
  return (
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
  );
}

export default App;
