const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

var app = express();
// requestのbodyを受け取る
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ファイルを送信すると、name、type および size (バイト単位) を含む JSON レスポンスを受け取ります。
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size: size });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});