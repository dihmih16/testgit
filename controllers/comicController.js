const fs = require('fs');
const db = require('../models/model');
const path = require('path');

exports.getList = async (req, res, next) => {

    let dieu_kien = null;

    let msg = req.query.type;
    let msg1 = req.query.column;

    let text = "";
    let column = "";

    if (req.method == 'POST') {

        column = req.body.column;
        text = req.body.text;

        dieu_kien = { [column]: text };

        console.log(dieu_kien);

    }
    var list = await db.comicModel.find(dieu_kien).populate('idcomment');

    res.render('comic/list', { data: list, msg: msg, msg1: msg1, column: column, text: text });
}

exports.addComic = async (req, res, next) => {

    let msg = ''; // chứa câu thông báo
    var url_image = '';
    let image = "";

    if (req.method == 'POST') {
        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        const imagePath = "./public" + url_image;
        let image = "";

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const fileExtension = path.extname(imagePath);

            const dataUrl = 'data:image/' + fileExtension + ';base64,' + base64Image;
            image = dataUrl;
        } catch (error) {
            console.error('Lỗi khi chuyển đổi ảnh thành Base64:', error);
        }

        // tạo đối tượng model 
        let  objComic = new db.comicModel();
         objComic.name = req.body.name;
         objComic.author = req.body.author;
         objComic.year = req.body.year;
         objComic.content = req.body.content;
         objComic.image = image;
         objComic.describe = req.body.describe;
         objComic.idcomment = req.body.idcomment;
        try {
            let new_pro = await  objComic.save();

            console.log(new_pro);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
            res.redirect('/comic');
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }

    }

    res.render('comic/addcomic', { msg: msg });
}
exports.editComic = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    var url_image = '';
    let image = "";
    // load dữ liệu cũ để hiển thị
    let list = await db.comicModel.find();
    let  objComic = await db.comicModel.findById(req.params.idcomic);
    console.log( objComic);
    if (req.method == 'POST') {
        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        const imagePath = "./public" + url_image;
        let image = "";

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const fileExtension = path.extname(imagePath);

            const dataUrl = 'data:image/' + fileExtension + ';base64,' + base64Image;
            image = dataUrl;
        } catch (error) {
            console.error('Lỗi khi chuyển đổi ảnh thành Base64:', error);
        }

        let  objComic = new db.comicModel();
         objComic.name = req.body.name;
         objComic.author = req.body.author;
         objComic.year = req.body.year;
         objComic.content = req.body.content;
         objComic.image = image;
         objComic.describe = req.body.describe;
         objComic._id = req.params.idcomic;
        try {

            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},    objComic );
            await db.comicModel.findByIdAndUpdate({ _id: req.params.idcomic },  objComic);
            res.redirect('/comic');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }

    }

    res.render('comic/editcomic',
        { msg: msg,  objComic:  objComic, data: list })

}
exports.deleteComic = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let  objComic = await db.comicModel.findById(req.params.idcomic);
    console.log( objComic);

    try {

        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},    objComic );
        await db.comicModel.findByIdAndDelete({ _id: req.params.idcomic });
        res.redirect('/Comic');

        console.log("Đã xóa thành công");
        msg = 'Đã ghi thành công';
    } catch (err) {
        console.log(err);
        msg = 'Lỗi ' + err.message;

    }


    res.render('comic/list', { msg: msg });

}

exports.getDetailComic = async (req, res, next) => {
    const idcomic = req.params.idcomic;
    try {
      const comic = await db.comicModel.findById(idcomic);
      if (comic) {
        res.render('comic/comicdetail', { objComic: comic });
      } else {
        res.status(404).send('Comic not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
}

exports.readComic = async ( req, res, next) => {
    const idcomic = req.params.idcomic;
    try {
      const comic = await db.comicModel.findById(idcomic);
      if (comic) {
        res.render('comic/readcomic', { objComic: comic });
      } else {
        res.status(404).send('Comic not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
}


