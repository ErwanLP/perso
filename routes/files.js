var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readdir('./public/files', (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('files', {
        files: files.map(
            file => ({
              label: file,
              link: file,
            }),
        ),
      });
    }
  });
});

module.exports = router;
