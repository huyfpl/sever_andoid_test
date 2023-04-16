const Sanpham = require('../models/sanpham');


module.exports.home = async (req, res) => {
    const users = await Sanpham.find();
    res.render('home', { Title: "home", data: users.map((user) => user.toJSON()) });
}
module.exports.add_get=(req,res)=>{
    res.render('add',{title:'Add'});
}
module.exports.add_post=async(req,res)=>{
    const sanphamnew =new Sanpham({
        masp:req.body.masp,
        tensp:req.body.tensp,
        anhsp:req.body.anhsp,
        fileanhsp:req.file ? req.file.filename : null,
        size:req.body.size,
        gia:req.body.gia
    });
    sanphamnew.save()
    .then(()=>res.redirect('/'))


}
module.exports.edit_get=async(req,res)=>{
    const sanphams=await Sanpham.findById(req.params.id);
    res.render('edit',{title:'Edit',object:sanphams.toJSON()});
}
module.exports.edit_post = async (req, res) => {
    const user = req.body.id;
    const anhsp = req.body.anhsp;
    const fileanhsp = req.file ? req.file.path : null;
    const updateObj = req.body;
    try {
        if (anhsp) {
            updateObj.anhsp = anhsp;
        }
        if (fileanhsp) {
            let filesplit = fileanhsp.replace("uploads\\", "");
            updateObj.fileanhsp = filesplit;
        }
        const usernew = await Sanpham.findByIdAndUpdate({ _id: user }, updateObj);
        res.redirect('/');
    } catch (error) {

    }

}
module.exports.delete_get=async(req,res)=>{
    const id=req.params.id;
    await Sanpham.findByIdAndDelete(id);
    res.redirect('/');
}
module.exports.search=async(req,res)=>{
    let name = req.query.tensp;
    const rex = new RegExp(name, 'i');
    const sanphams=await Sanpham.find({tensp:{ $regex: rex }});
    res.render('home',{title:'Home',data:sanphams.map(sanpham=>sanpham.toJSON())});
}