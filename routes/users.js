var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({path:'users'});
});
router.post('/login',(req,res,next)=>{
  let user = req.body.username === "Username" && req.body.password === "password"?req.body.username:null;
  console.log(req.body)
  res.status(200).json({user})
})

module.exports = router;
