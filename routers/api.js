var express = require('express');
var router = express.Router();
const SanPham_API=require('../controllers/SanPhamAPI');
router.get('/sanpham',SanPham_API.listSanPham);
module.exports = router;