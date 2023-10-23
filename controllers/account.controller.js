const db = require('../models/model');

exports.Reg = async (req, res, next) =>{
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        if(req.body.passwd != req.body.passwd2){
            msg = 'Confirm Pass Sai';
            return res.render('login/reg', {msg: msg});
        }

        let objAccount = new db.userModel();
        objAccount.username = req.body.username;
        objAccount.passwd = req.body.passwd;
        objAccount.email = req.body.email;
        objAccount.fullname = req.body.fullname;

        try{
            await objAccount.save();
            console.log("Đăng kí thành công");
            msg = 'Đăng kí thành công';
        }catch(error){
            msg = 'Lỗi' + error.message;
        }

    }

    res.render('login/reg', {msg: msg});
}

exports.Logout = (req, res, next)=>{
    if(req.session != null )
     req.session.destroy(  function(){
        console.log("Đăng xuất thành công")
        res.redirect('/');
    });
}

exports.Login = async (req, res, next) =>{
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        

        try {
            let objAccount = await db.userModel.findOne({email: req.body.email});
            console.log(objAccount);
    
            if(objAccount != null){
                if(objAccount.passwd == req.body.passwd){
                    return res.redirect('/');
                }else{
                    msg = 'Sai Password';
                }
            }else{
                msg = 'Tài khoản không tồn tại';
            }
        } catch (error) {
            msg = 'Lỗi' + error.message;
        }
    }


    res.render('login/login', {msg: msg});
}


exports.getUsers = async (req,res,next)=>{

    let dieukien = null;

    let msg = req.query.type;
    let msg1 = req.query.column;

    let text = "";
    let column = "";

    if(req.method =='POST'){

        column = req.body.column;
        text = req.body.text;
        
        dieukien = { [column]: text };

        console.log(dieukien);
        
    }
    

    var list = await db.userModel.find( dieukien );
    
    res.render( 'account/list', {data: list , msg: msg, msg1:msg1, column:column, text:text} )
}

exports.addAccount = async (req,res,next)=>{
   
    let msg = ''; // chứa câu thông báo
    var list = await db.userModel.find();
    if(req.method =='POST'){
        
        // tạo đối tượng model 
        let objAccount = new db.userModel();
        objAccount.username = req.body.username;
        objAccount.passwd = req.body.passwd;
        objAccount.email = req.body.email;
        objAccount.fullname = req.body.fullname;
        
        try{
            let new_acc = await objAccount.save();
            
            console.log(new_acc);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('account/add',{msg:msg,data:list});
}
exports.editAccount = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objAccount = await db.userModel.findById(  req.params.iduser  );
    console.log( objAccount);

    // lấy danh sách thể loại đưa lên form
    let list = await db.userModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 

        let objAccount = new db.userModel();
        objAccount.username = req.body.username;
        objAccount.passwd = req.body.passwd;
        objAccount.email = req.body.email;
        objAccount.fullname = req.body.fullname;
        
        objAccount._id = req.params.iduser;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.userModel.findByIdAndUpdate({_id: req.params.iduser},objAccount);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('account/edit', 
            {msg:msg, objAccount: objAccount,data:list})

}
exports.deleteAccount = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objAccount = await db.userModel.findById(req.params.iduser);
    console.log(objAccount);

    try {

        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
        await db.userModel.findByIdAndDelete({ _id: req.params.iduser });
        res.redirect('/account');

        console.log("Đã xóa thành công");
        msg = 'Đã ghi thành công';
    } catch (err) {
        console.log(err);
        msg = 'Lỗi ' + err.message;

    }


    res.render('account/list',
        { msg: msg })

}