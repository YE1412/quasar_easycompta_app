// some_boot_file
// MAKE SURE TO CONFIGURE THIS BOOT FILE
// TO RUN ONLY ON CLIENT-SIDE
export default ({ store }) => {
  // store.use(piniaCapacitorPersist)
  // For Pinia
  // console.log(window);
  store.state.value = window.__INITIAL_STATE__
  // For Vuex
  // store.replaceState(window.__INITIAL_STATE__)
}