const CrudRepository=require('./crudRepository')
const {Comment}=require('../models')
class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment)
    }
}
module.exports=CommentRepository