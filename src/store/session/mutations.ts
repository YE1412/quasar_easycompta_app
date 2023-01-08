import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';
import { transformObj, sessionService } from '../index';

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation ( state: ExampleStateInterface ) {
    // your code
  }
};

export default mutation;
