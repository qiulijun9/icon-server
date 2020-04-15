const isLogin = async function (ctx, next){
  
  if(!ctx.cookies.get("id")){
    console.log("没有登录");
    ctx.response.redirect('/login');
  }
  console.log("在线。。。。。");
  await next();
};

module.exports = isLogin;
