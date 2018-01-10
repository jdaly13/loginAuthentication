module.exports = function (express) {
    const router = new express.Router();
    router.get('/dashboard', (req, res) => {
      const data = res.data;
      res.status(200).json({
        name: data.name,
        email: data.email,
        success: true
      });
    });
    return router;
  }
  