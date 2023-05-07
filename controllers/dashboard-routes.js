const { BlogPost, User, Comment } = require("../models");

const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
            {
                model: User, 
               attributes: [
                'id',
                'username'
            ]},
            {
              model: Comment,
              attributes: [
                'id',
                'user_id',
                'contents',
                'blogpost_id',
                'createdAt'],
                
                  include: {
                     model: User,
                      attributes: [
                        'username',
                        'id'
                      ]}
           
            }
       ]
    })
      const myBlogs = dbBlogPostData.map((blogPost) =>
      blogPost.get({ plain: true }))
    ;    let loggedIn = req.session.loggedIn;
      if (loggedIn) {
        res.render("dashboard", {
          myBlogs,
          loggedIn: req.session.loggedIn
        });
        return;
      } else {
      res.render('login')}
    } catch (err) {
      console.log(err)
    }
  });

  module.exports = router