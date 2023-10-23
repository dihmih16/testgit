const MyModel = require('../../models/model');

exports.listComic = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.comicModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }


    res.json(dataR);
    console.log(dataR);
}
exports.addComic =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
     
        let objComic = new MyModel.comicModel();
        
        objComic.name = req.body.name;
        objComic.author = req.body.author;
        objComic.year = req.body.year;
        objComic.image = req.body.image;
        objComic.content = req.body.content;
        objComic.describe = req.body.describe;
        objComic.coverImage = req.body.coverImage;
        
        try{
            let dataR = await objComic.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
    }
}
exports.deleteComic = async (req,res,next)=>{
    let dataR = {
        status: 1,
        msg: "ok"
    }
    let objComic = await MyModel.comicModel.findById(  req.params.idcomic  );
    console.log( objComic);
        
        try{
            
             await MyModel.comicModel.findByIdAndDelete({_id:req.params.idcomic});

            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
}
exports.UpdateComic =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='PUT'){

    
        try{
            await MyModel.comicModel.updateOne({_id:req.params.idcomic},
                {$set: {name:  req.body.name, author:  req.body.author,image: req.body.image, content: req.body.content,
                year: req.body.year, describe: req.body.describe, coverImage: req.body.coverImage}});
            console.log(dataR);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }
    //trả về client
    res.json(dataR)

}
exports.getComicDetail = async (req, res) => {
    try {
        const idcomic = req.params.id;
        const comic = await MyModel.comicModel.findById(idcomic);
        if (!comic) {
          return res.status(404).json({ message: 'Không tìm thấy truyện.' });
        }
        res.json(comic);
      } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin truyện.' });
      }
};
exports.readComic = async (req, res) => {
    try {
        const idcomic = req.params.idcomic;
        const comic = await MyModel.comicModel.findById(idcomic, 'content');
        if (!comic) {
          return res.status(404).json({ message: 'Không tìm thấy truyện.' });
        }
        res.json(comic);
      } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin truyện.' });
      }
};