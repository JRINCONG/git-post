const catchError = require('../utils/catchError');
const Post = require('../models/Post');

const getAll = catchError(async(req, res) => {
    const results = await Post.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {id}= req.user
    for( const valor in req.body){
        (req.body.userId !="")?
        newbody= {            
            post:req.body.post,
            userId:req.user.id, 
        }: newbody = {...req.body, userId:user.id}
    }
    console.log(newbody)
    const result = await Post.create(newbody);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Post.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Post.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const newbody={}
    for( const valor in req.body){
    (req.body.userId !="")?  newbody.userId = req.user.id : newbody = {...req.body, userId:user.id}
    }
    const result = await Post.update(newbody,{ where: {id}, returning: true });
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
   
}