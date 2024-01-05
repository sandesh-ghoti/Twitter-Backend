const CrudRepository=require('./crudRepository')
const {Hashtag}=require('../models')
class HashtagRepository extends CrudRepository{
    constructor(){
        super(Hashtag)
    }
    async insertMany(data){
        const res=await Hashtag.insertMany(data);
        return res;
    }
    async findByName(titleList){
        const res=await Hashtag.findOne({title:titleList})
        return res;
    }
}
module.exports=HashtagRepository