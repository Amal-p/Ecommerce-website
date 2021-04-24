var express = require('express');
const { render } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProduct().then((products)=>{
    console.log(products)
    res.render('Admin/view-products', {admin:true, products})
  }) 
});

router.get('/add-product',(req, res, next) =>{
  res.render('Admin/add-product', {admin:true})
})

router.post('/add-product',(req, res) => {
  //console.log(req.body)
  //console.log(req.files.Image)
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err, don)=>{
      if(!err){
        res.render('Admin/add-product')
      }
      else{
        console.log(err)
      }
    })
  })
})

module.exports = router;
