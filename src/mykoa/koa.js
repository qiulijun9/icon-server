const http = require('http');
const EventEmitter = require('events');

class koa extends EventEmitter{
  constructor(){
   super();
   this.context = {};
   this.middleware = [];
  }
 
  //创建服务，监听端口
  listen(...args) {
    return http.createServer(this.callback).listen(...args);
  }
  //使用中间件
  use(fn) {
    this.middleware.push(fn);
  }


  //中间件回调
  compose(middlewares, context) {
    let middlewareIndex = 0;
    function dispatch() {
      if (middlewareIndex >= middlewares.length) {
        return Promise.resolve();
      }
  
      const currentMiddleware = middlewares[middlewareIndex];
      middlewareIndex++;
      return Promise.resolve(
        currentMiddleware(context, () => {
          return dispatch();
        })
      );
    }
    return dispatch();
  }

  //创建上下文3
  createContext(req, res) {
    const context = Object.create(this.context);
    context.req = req;
    context.res = res;
    return context;
  }

  callback = (req, res) => {
    console.log(req)
    const context = this.createContext(req, res);
    //执行中间件
    this.compose(this.middleware, context).catch(err => {
      this.onError(err);
    });
  }
  
  //错误处理
  onError(err) {
    console.log(err);
  }
}

module.exports = koa;