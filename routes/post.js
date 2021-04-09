const router = require('express').Router();
const postController = require('../controllers/post');
const isAuth = require('../middlewares/isAuth');

router.get('/posts', isAuth ,postController.fetchPosts);
router.post('/create-post', isAuth, postController.createPost);
router.put('/posts/:id', isAuth, postController.updatePost);
router.delete('/posts/:id', isAuth, postController.deletePost);


module.exports = router;