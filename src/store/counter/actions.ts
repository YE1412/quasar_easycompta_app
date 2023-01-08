import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import CounterStateInterface from './state';

const actions: ActionTree<CounterStateInterface, StateInterface> = {
	updateDrawerStateAction(context, val) {
		context.commit('updateDrawerState', val);
	}
};

export default actions;