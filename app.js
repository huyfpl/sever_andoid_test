const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./database/database');
const routers = require('./routers/router');
var hbs = require('hbs');
var path = require('path');
const app = express();
const apiRouter = require('./routers/api');
app.use('/api', apiRouter);
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
}));
mongoose.connect(database.database, { useNewUrlParser: true, useUnifiedTopology: true });
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const str = file.originalname;
        const parts = str.split(".");
        let doandau = parts[0];
        let doansau = parts[1];

        cb(null, doandau + '-' + Date.now() + '.' + doansau)
    }
})
var upload = multer({ storage: storage })
app.use(upload.single('fileanhsp'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use('/', routers);
app.listen(3000, () => {
    console.log('kết nối thành công');
}
);