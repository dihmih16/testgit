const MyModel = require('../../models/model');
exports.listUsers = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query.username)!='undefined'){
        let username =req.query.username;
        dieu_kien={username:username};
        console.log(dieu_kien);
    }
   
    let list = []
    try {
        list = await MyModel.userModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.regUsers =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
    
        let objUser = new MyModel.userModel();
        
        objUser.username = req.body.username;
        objUser.passwd=req.body.passwd;
        objUser.email = req.body.email;
        objUser.fullname = req.body.fullname;
        
        try{
            let dataR = await objUser.save();
            
            console.log(dataR);

            console.log("Register Succesfull!");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
    }
}
exports.deleteUser = async (req,res,next)=>{
    let dataR = {
        status: 1,
        msg: "ok"
    }
    let objUser = await MyModel.userModel.findById(  req.params.iduser  );
    console.log( objUser);
        
        try{
             
    
             await MyModel.userModel.findByIdAndDelete({_id:req.params.iduser});

            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
}
exports.updateUser =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='PUT'){

    
        try{
            await MyModel.userModel.updateOne({_id:req.params.iduser},{$set: {username:  req.body.username, password:  req.body.password,image: req.body.image}});
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
exports.loginUser =async (req, res, next) => {
    try {
        const { username, passwd } = req.body;
        const user = await MyModel.userModel.findOne({ username });
        console.log("Login Succesfull");
        if (!user) {
          return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
        }
    
        if (user.passwd !== passwd) {
          return res.status(401).json({ message: 'Mật khẩu không đúng.' });
        }
    
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng nhập.' });
      }
};
