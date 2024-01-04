const dotenv=require('dotenv');
dotenv.config(__dirname+'../../.env');
module.exports={
    PORT:process.env.PORT,
    URI:process.env.URI
}