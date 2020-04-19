export default ({ store, redirect }) => {
  if (!store.getters['auth/loggedIn']) {
    redirect('/signup')
  }
}
