const MyModel = require('../models/model');

exports.getCommentsByComicId = (req, res) => {
    const idcomic = req.params.idcomic;
  
    MyModel.commentModel.find({ idcomic: idcomic })
      .then((comments) => {
        // Trả về danh sách bình luận
        res.json(comments);
      });
  };

exports.postComment = (req, res) => {
  const {idcomic,iduser,content, time} = req.body;

  const newComment = new MyModel.commentModel({
    idcomic,
    iduser,
    content,
    time,
  });

  newComment
    .save()
    .then((savedComment) => {

      res.json(savedComment);
      console.log("Đã gửi bình luận!");
    })
    .catch((error) => {
      res.status(500).json({ message: 'Lỗi khi gửi bình luận.', error });
    });
};
