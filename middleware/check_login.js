// Middleware yeu_cau_dang_nhap
exports.yeu_cau_dang_nhap = (req, res, next) => {
  if(req.session.userLogin){
    //có tồn tại thông tin user login: đã đăng nhập
    next();
}else{
  return  res.redirect('/login');
}
  };
  
  // Middleware khong_yc_dang_nhap
  exports.khong_yc_dang_nhap = (req, res, next) => {
    if(!req.session.userLogin){
      //có tồn tại thông tin user login: đã đăng nhập
      next();
  }else{
     return res.redirect('/');
  }
  };
  