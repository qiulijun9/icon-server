const isLogin = async function (ctx, next){
  
  if(!ctx.cookies.get("id")){
    console.log("没有登录");
    ctx.response.redirect('/login');
  }
  // ctx.response.redirect('/project');
  console.log("在线。。。。。");
  await next();
};

module.exports = isLogin;
