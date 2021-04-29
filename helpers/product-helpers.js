var db = require("../config/connection")
var collection = require('../config/collection')
var objectId = require('mongodb').ObjectID
const { response } = require("../app")

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
    },
    deleteProduct:(proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response) => {
                resolve(response)
            })
        })
    }
}