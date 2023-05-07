const { BlogPost, User, Comment } = require('../models');
const router = require('express').Router();


router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: User }]
      });

     const commentUpdate = await Comment.update(
        {title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id},
        {where: {
          id: req.params.id}}
      );

      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      };
      res.status(200).json(commentUpdate)
        return;
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;
