const User = require('./users');
const Comment = require('./comment');
const BlogPost = require('./blogPost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: "CASCADE"
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "CASCADE"
})

BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: "CASCADE"
});

BlogPost.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: "CASCADE"
    
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
    onDelete: "CASCADE"
})

module.exports = { User, BlogPost, Comment };