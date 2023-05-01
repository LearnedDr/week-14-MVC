const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDB = async () => {
    // users
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    // posts
    const blogs = await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });
    // blogs
    const comments = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });

    process.exit(0);
  };
  
  seedDB();