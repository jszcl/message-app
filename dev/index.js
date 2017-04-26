const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const bodyparser = require('body-parser');
const Mongolass = require('mongolass');
var multer = require('multer');
var sha1 = require('sha1');
var UserModel = require('./models/users');
var Article = require('./lib/mongo').Article;
var List = require('./lib/mongo').List;
var User = require('./lib/mongo').User;
var Alluser = require('./lib/mongo').Alluser;
var MK =require('./lib/mongo').MK;
app.use(express.static(__dirname + '/public'));

var jsonbodyparser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({ extended: true });

var listsmulter = multer();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })
app.post('/news', function (req, res) {
  console.log('send');
  // let jsons = JSON.stringify({ greet: ['hello', 4] });
  // res.send(jsons);
  // console.log(jsons)
  let testdata = [];
  Article.find({}).sort({_id:-1}).then((t) => {
    for (i = 0; i < t.length; i++) {
      testdata.push(t[i].doc)
    };
    let jsondata = JSON.stringify({ greet: testdata })
    res.send(jsondata);
  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })
})
// app.post('/calendar',urlencodedParser,function(req,res){
//   console.log(req.body);
//   var name=req.body.lname;
//   var password=req.body.fname;
//   var user ={
//     name:name,
//     password:password
//   };
// UserModel.create(user).then(function(){
//   console.log('sc');
//   res.redirect("/calendar");

// });
// UserModel.getUserByName(name)
//     .then(function (user) {console.log(user);})
// })
app.post('/lists', jsonbodyparser, function (req, res) {

  List.create(req.body).then(function (result) {

    console.log(result);
    res.send('提交成功');
  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })

});

app.post('/login', jsonbodyparser, function (req, res) {
  console.log(req.body);


  Alluser.find({ CMCODE: parseInt(req.body.CMCODE) }).then(function (result) {
    
    
    if (result.length == 0) {
      res.send(['用户名不存在'])
    }
    else {
    console.log(result[0].REGUSERNAME);

    if (result[0].REGPASSWORD === sha1(req.body.REGPASSWORD)) {

      res.send(['success',result[0].REGUSERNAME]);
      
    }
    else { res.send(['用户名或密码错误']) }
    }

  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })
});

app.post('/fixlists', function (req, res) {
  List.find({ fixed: false , accepted:false }).then(function (result) {
    console.log(result);
    res.send(JSON.stringify({ greet: result }));
  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })
});

app.post('/mylists', jsonbodyparser,function (req, res) {
  List.find({ fixed: false , accepted:true, fixperson:req.body.id}).sort({_id:-1}).then(function (result) {
    console.log(result);
    res.send(JSON.stringify({ greet: result }));
  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })
});


app.post('/rate', jsonbodyparser,function (req, res) {
  List.find({ contactid:req.body.id,rated:false }).sort({_id:-1}).then(function (result) {
    console.log(result);
    res.send(JSON.stringify({ greet: result }));
  }).catch(function (e) {
    console.error(e);
    console.error(e.stack);
  })
})
// var listexample ={
//   errortype: 'net',
//   devicename:'cable',
//   name: 'cavin',
//   phonenumber: '135522',
//   info: 'sdfaefwf',
//   number: 1234235235,
//   rated:true
// }
// List.update({name:'cavint'},{$set:{info:'lufy'}}).then(function(result){
//   console.log(result)
// }).catch(function(e){
//   console.log(e)
// });


app.post('/images', upload.single('avatar'), function (request, response) {
  response.send('imgreceived');
  console.log(request.file)
})

app.post('/accept',jsonbodyparser,function (req,res){
    console.log(req.body);
    
    let {id,number,fixname} = req.body;
    List.update({number:number},{$set:{accepted:true,fixperson:id,fixname:fixname}}).then(function(result){
      res.send('ok')
    }).catch(function(e){
      console.log(e)
    })


})

app.post('/handle',jsonbodyparser,function (req,res){
    console.log(req.body);
    
    let {id,method,number,fixdate,fixname} = req.body;
    List.update({number:number},{$set:{fixed:true,waytofix:method,fixdate:fixdate}}).then(function(result){
      res.send('ok')
    }).catch(function(e){
      console.log(e)
    })


})

app.post('/dorate',jsonbodyparser,function (req,res){
    console.log(req.body);
    let {starNumber,number} = req.body;
    let stars = parseInt(starNumber);
    List.update({number:number},{$set:{rated:true,rating:stars}}).then(function(result){
      res.send('评价成功')
    }).catch(function(e){
      console.log(e)
    })

})
app.listen(port)
console.log("server started on port " + port)

