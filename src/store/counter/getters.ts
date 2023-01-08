import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CounterStateInterface } from './state'; 

const getters: GetterTree<CounterStateInterface, StateInterface> = {
	getDrawerState(state) {
		return state.drawerState;
	},
	getCounter(state) {
		return state.counter;
	},
};

export default getters;