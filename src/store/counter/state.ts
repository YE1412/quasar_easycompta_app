export interface CounterStateInterface {
  counter: number;
  drawerState: boolean;
}

function state(): CounterStateInterface {
  return {
    drawerState: true,
    counter: 0
  }
};

export default state;