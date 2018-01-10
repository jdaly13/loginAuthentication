const path = require('path');
module.exports = function(app) {
  app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('./public/index.html'));
    //res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
};

