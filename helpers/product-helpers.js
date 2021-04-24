var db = require("../config/connection")
var collection = require('../config/collection')

module.exports = {
    addProduct:(product,callback)=>{
        db.get().collection('product').insert(product).then((data) => {
            // console.log(data.ops[0]._id)
            callback(data.ops[0]._id)
        })
    },
    getAllProduct:()=>{
        return new Promise((resolve, reject)=>{
            let products = db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}