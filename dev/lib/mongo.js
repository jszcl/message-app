var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  
});
exports.Alluser = mongolass.model('alluser',{
  REGUSERNAME : {type : 'string'},
  REGPASSWORD : {type: 'number'},
  CMCODE : {type: 'number' }
})
exports.List = mongolass.model('List', {
  errortype: { type: 'string' },
  placename:{type:'string'},
  contactname: { type: 'string' },
  contactid: { type: 'string' },
  phonenumber: { type: 'string' },
  otherinfo: { type: 'string' },
  number: { type: 'number' },
  rated:{type:'boolean'},
  fixed:{type:'boolean'},
  rating:{type:'number'},
  waytofix:{type:'string'},
  fixdate:{type:'number'},
  fixperson:{type:'string'},
  fixname:{type:'string'},
  accepted:{type:'boolean'}
  

})

exports.List.index({name:1,number: -1}).exec();
exports.Article = mongolass.model('Article', { doc: { type: 'string' } });
exports.Article.index({_id: -1 , doc: -1,  }).exec();// exports.User.index({ name: 1 }, { unique: false}).exec();// 根据用户名找到用户，用户名全局唯一