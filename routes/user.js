var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProduct().then((products)=>{
    console.log(products)
    res.render('index', { title: 'ShoppingCart', products, admin:false });
  })
  
});

module.exports = router;
