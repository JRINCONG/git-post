const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async(req, res) => {
    
    const results = await User.findAll();

        const newResult = results.map((x)=>{
        if(x.dataValues.password !=""){
            delete x.dataValues.password
            delete x.dataValues.email
        }
        return x
    })
    return res.json(newResult);
});

const create = catchError(async(req, res) => {
    const {password} = req.body;
    const handlePassword= await bcrypt.hash(password, 10)
    const results = await User.create({...req.body, password:handlePassword}); 
    //console.log(results)
    delete results.dataValues.password
    return res.status(201).json(results);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const results = await User.findByPk(id);
    if(!results) return res.sendStatus(404);
    delete results.dataValues.password
    return res.json(results);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {

    const { id } = req.params;
    delete req.body.password;
    delete req.body.email;

    const results = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(results[0] === 0) return res.sendStatus(404);

    const newResult = results[1].map((x)=>{
        if(x.dataValues.password !=""){
            delete x.dataValues.password
        }
        return x
    })



    return res.json(newResult);
});

const Login = catchError (async(req,res)=>{

    const {email,password} = req.body
    const user = await User.findOne({where:{email}})
    if(!user) return res.status(401).json({"msg":"Credenciales no validas"})
    
    const isValid= await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({"msg":"Credenciales no validas"})
     delete user.dataValues.password

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
    )
    console.log(req)
     return res.status(200).json({user, token})   

})

const logged = catchError(async(req,res)=>{
    
    const user =  req.user;
    return res.status(200).json(user)
})



//   POST /users/:id/post

const setPost = catchError(async(req,res)=>{
    const { id }= req.params;
    const user=await User.findByPk(id)
    await user.setPosts(req.body)
    const post = await user.getPosts()
    return res.json(post) 
    })
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    Login,
    logged,
    setPost
}