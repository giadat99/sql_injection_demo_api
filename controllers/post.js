const PostModel = require('../models/post');


exports.fetchPosts = async (req, res, next) => {
    try {
        const [rows, fieldData] = await PostModel.fetchPosts();
        res.json({
            data: rows
        })
    } catch(err) {
        res.json({
            error: err
        })
    }
}

exports.createPost = async (req, res, next) => {
    const { content } = req.body;
    const post = new PostModel(content);
    try {
         await post.save();
        res.json({
            message: 'Created post successfully'
        });
    } catch(err) {
        res.json({
            error: err
        });
    }
}

exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    const [data] = await PostModel.getPost(id);
    try {
        if(data[0]) {
            await PostModel.deletePost(data[0].id);
            return res.status(200).json({
                message: 'Delete successfully',
                id: data[0].id,
                content: data[0].content
            });
        } else {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
    } catch(error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;
    const [data] = await PostModel.getPost(id);
    
    try {
        if(data[0]) {
            await PostModel.updatePost(data[0].id, content);
            return res.status(200).json({
                message: 'Update successfully',
                id: data[0].id,
                oldContent: data[0].content,
                newContent: content
            });
        } else {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
    
}