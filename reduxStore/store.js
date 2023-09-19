import {configureStore} from '@reduxjs/toolkit';
import flightoptionsReducer from './slice.js';

 const store = configureStore({
    reducer: {
        flightoptionsReducer: flightoptionsReducer
    }
})

export default store;