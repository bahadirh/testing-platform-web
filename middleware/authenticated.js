export default ({ store, redirect }) => {
  if (!store.getters['auth/loggedIn']) {
    // TODO: fix it: make it run AFTER localStorage is loaded, somehow
    // redirect('/signup')
  }
}
