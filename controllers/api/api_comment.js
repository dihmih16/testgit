const MyModel = require('../../models/model');
exports.listComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien = null;
    if (typeof (req.query.content) != 'undefined') {
        let content = req.query.content;
        dieu_kien = { content: content };
        console.log(dieu_kien);
    }
    
    let list = []
    try {
        list = await MyModel.commentModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    
    res.json(dataR);
    console.log(dataR);
}
exports.addComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if (req.method == 'POST') {
      
        let objComment = new MyModel.commentModel();

        objComment.iduser = req.body.iduser;
        objComment.idcomic = req.body.idcomic;
        objComment.content = req.body.content;
        objComment.time = req.body.time;

        try {
            let dataR = await objComment.save();

            console.log(dataR);

            console.log("Đã ghi thành công");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }
    }
}
exports.deleteComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    let objComment = await MyModel.commentModel.findById(req.params.idcomment);
    console.log(objComment);

    try {

        await MyModel.commentModel.findByIdAndDelete({ _id: req.params.idcomment });

        console.log("Đã xóa thành công");
    } catch (err) {
        console.log(err);
        msg = 'Lỗi ' + err.message;

    }

}
exports.UpdateComment = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if (req.method == 'PUT') {


        try {
            await MyModel.commentModel.updateOne({ _id: req.params.idcomment },
                {
                    $set: {
                        id_user: req.body.id_user, id_comic: req.body.id_comic, content: req.body.content, time: req.body.time
                    }
                });
            console.log(dataR);

            console.log("Đã cập nhật thành công");

        } catch (err) {
            console.log(err);
            dataR.msg = err.message;
        }

    }
    res.json(dataR)

}
