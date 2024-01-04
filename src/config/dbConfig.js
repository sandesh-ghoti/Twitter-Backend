const mongoose=require('mongoose')
const {URI}=require('./serverConfig')

async function connect(){
    await mongoose.connect(URI,{dbName:'chatApp'})
}
module.exports=connect