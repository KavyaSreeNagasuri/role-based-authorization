import { createStore } from 'redux';
import { allReducers } from './reducers';

export let store = createStore(allReducers);