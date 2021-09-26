import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App.jsx';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import initState from './redux/initState';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './redux/saga/rootSaga';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import LoaderContextProvider from './context/LoaderContext';
// axios.defaults.baseURL = 'http://localhost:3001';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <LoaderContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LoaderContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
