const Post =require('./Post');
const User=require('./User');


User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Post,{through:'favorites'})
Post.belongsToMany(User,{through:'favorites'})