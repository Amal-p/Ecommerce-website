var db = require("../config/connection")
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
const { response } = require("../app")

module.exports = {
    doSigneup : (userData) => {
        return new Promise(async(resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                    resolve(data.ops[0])
                })
        })
    },
    doLogin : (loginData) => {
        return new Promise(async(resolve, reject) => {
            let loginStatus = false
            let respons = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:loginData.Email})
            if(user){
                bcrypt.compare(loginData.Password, user.Password).then((status)=>{
                    if(status){
                        //console.log("Login success")
                        respons.user = user
                        respons.status= true
                        resolve(respons)
                    }else{
                        //console.log("Login Failde")
                        resolve({status:false})
                    }
                })
            }else{
                //console.log("Incorrect email")
                resolve({status:false})
            }
        })
    }
}