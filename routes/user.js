var express = require('express');
const session = require('express-session');
const { response } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers')

const verifyLogin = (req, res, next) => {
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user)
  productHelper.getAllProduct().then((products)=>{
    //console.log(products)
    res.render('index', { title: 'ShoppingCart', products ,user});
  })
  
});

router.get('/login', function(req, res, next){
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login', {loginError:req.session.loginErr})
    req.session.loginErr = false
  }
  
})
router.get('/signup',(req, res,next)=>{
  res.render('user/signup')
})

router.post('/signup',(req, res) => {
  userHelper.doSigneup(req.body).then((response)=>{
    console.log(response)
  })
})

router.post('/login',(req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    //console.log(response.status)
    if(response.status){
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    }else{
      //req.session.loginErr = true or
      req.session.loginErr = "Invalid Username Or Password"
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


router.get('/cart', verifyLogin, (req, res, next)=>{
  res.render('user/cart')
})


module.exports = router;
