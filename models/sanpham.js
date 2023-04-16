const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SanPhamSchema = new Schema({
    masp: {
        type: String,
    },
    tensp: {
        type: String,
    },  
    anhsp: {
        type: String,
    }
    ,
    fileanhsp: {
        type: String,
    }
    ,
    size: {
        type: String,
    }
    ,
    gia: {
        type: String,
    }
},
    { collection: 'sanpham' }
);
const SanPham = mongoose.model('sanpham', SanPhamSchema);
module.exports = SanPham;

