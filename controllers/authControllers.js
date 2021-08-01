const signup_get = (req, res) => {
  const menus = []
  const navMenus = []
  res.render('signup', { navTitle: "Daftar", menus, navMenus, })
}
const login_get = (req, res) => {
  const menus = []
  const navMenus = []
  res.render('login', { navTitle: "Masuk", menus, navMenus, })
}
const signup_post = (req, res) => {
  const { email, password } = req.body

  console.log(email, password)
  res.send('new signup')
}
const login_post = (req, res) => {
  const { email, password } = req.body

  console.log(email, password)
  res.send('new login')
}
const logout = (req, res) => {
  res.render('logout')
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
}