const { json } = require('sequelize');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

const router = require('express').Router();

////get a single blogpost
router.get('/:id', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findByPk((req.params.id), {
        // where: {
        //   id: req.params.id
        // },
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
        let loggedIn = req.session.loggedIn
      const blogPost = dbBlogPostData.get({ plain: true });
     
      if (loggedIn){
        res.render('blogpost', { blogPost,
          viewingUser: req.session.user_id,
           loggedIn: req.session.loggedIn });
      } else {
        res.redirect('/login')
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

/////comment on a blogpost
  router.post('/:id', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
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
                'contents'
              ],
            }
          ],})
          const newComment = await Comment.create({
            contents: req.body.contents,
            user_id: req.session.user_id,
            blogpost_id: req.params.id
          })
          if (newComment.contents && newComment.user_id && newComment.blogpost_id) {
            return res.status(200).json(newComment);
          } else {
            console.log('something is wrong')
          }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  ////create a new blogpost 
  router.post('/', async (req, res) => {
    try {
      const newBlog = await BlogPost.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
      })
      if (newBlog.title && newBlog.contents && newBlog.user_id) {
        return res.status(200).json(newBlog);
      } else {
        console.log('something is wrong')
      }
    } catch (err) {
      res.status(err)
    }
  })

  ///delete a blogpost
  router.delete('/:id', async (req, res) => {
    try {
      const blogData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User }]
    });
   const blogPostUpdate = await BlogPost.update(
      {title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id},
      {where: {
        id: req.params.id}}
    );
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    };
    res.status(200).json(blogPostUpdate)
      return;
  } catch (err) {
    res.status(500).json(err)
  }
});


  module.exports = router