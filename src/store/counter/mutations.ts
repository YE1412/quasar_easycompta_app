import { MutationTree } from 'vuex';
import { CounterStateInterface } from './state';

const mutations: MutationTree<CounterStateInterface> = {
  updateDrawerState(state: CounterStateInterface, opened: boolean) {
    state.drawerState = opened
  },
  showRouter() {
    console.log(this.$router);
  }
};

export default mutations;