const userModel = require('../mongoose/UserModel')

//登录 
exports.login = (query) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      ...query
    }, (err, data) => {
      if (err) {
        reject({
          state: 'error',
          result: 'server is error'
        });
      }
      data
        ?
        resolve({
          state: 'success',
          result: data
        }) :
        resolve({
          state: 'error',
          result: null
        });
    });
  })
}


// 新用户注册
exports.register = (message) => {
  const userMessage = new UserModel(message);
  return new Promise((resolve, reject) => {
    userMessage.save((err, data) => {
      if (err) {
        reject({
          state: 'error',
          result: 'server is error'
        });
      }
      resolve({
        state: 'success',
        result: data
      });
    });
  });
}