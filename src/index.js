import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


//creating store by calling this method
const store = configureStore();

//Provider is what allows to connect to React to our Redux store
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('container')
    );
