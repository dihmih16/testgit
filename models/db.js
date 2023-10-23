const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Ass_ReadComic?authSource=admin')
.catch((err) => {
    console.log("Error Database");
    console.log(err);
})
.finally((xxx)=>{
    console.log(xxx);
    console.log("Succesfully Database");
})
module.exports={mongoose};