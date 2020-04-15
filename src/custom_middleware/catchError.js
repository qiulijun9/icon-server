const {JsonError ,PageError} = require('./errorType');
const catchError = async (ctx, next) => {

  try {
    await next();
    console.log("没有错误");
  } catch (error) {
    let status = error.status;
    let message = error.message;
    ctx.response.state = error.statusCode || error.status ;
    
    if (error instanceof JsonError) { // 错误是 json 错误
      ctx.body = {
        'status': status,
        'message': message
      };
      if (status == 500) { 
        // 触发 koa 统一错误事件
        ctx.app.emit('error', e, ctx);
      }
      return;
    }

    // 根据 status 渲染不同的页面
    if(status === 500){
      ctx.body = status + message
      ctx.app.emit("error", error, ctx);
    }else {
      ctx.body = status + message;
    }

   
  }
};

module.exports = catchError;