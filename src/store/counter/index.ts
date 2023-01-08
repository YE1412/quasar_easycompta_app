import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { CounterStateInterface } from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const storeModule: Module<CounterStateInterface, StateInterface> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};

export default storeModule;