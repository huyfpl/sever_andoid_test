const sanphamapi = require('../models/sanpham');
exports.listSanPham = async (req, res) => {
    const sanphams = await sanphamapi.find();
    res.json({
        data: sanphams
    });
}
