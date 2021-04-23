var db = require("../config/connection")

module.exports = {
    addProduct:(product,callback)=>{
        db.get().collection('product').insert(product).then((data) => {
            // console.log(data.ops[0]._id)
            callback(data.ops[0]._id)
        })
    }
}