var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("HELLO")
})
module.exports = router;