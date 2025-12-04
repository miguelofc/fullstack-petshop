var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Rota de usuários funcionando 🚀'
  });
});

module.exports = router;
