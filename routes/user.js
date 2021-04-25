var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers')

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
  res.render('user/login')
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
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


module.exports = router;
