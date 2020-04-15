const http = require('http');
const EventEmitter = require('events');

class koa extends EventEmitter{
  constructor(){
   super();
   this.context = {};
   this.middleware = [];

  }
 
  //创建服务，监听端口
  listen(...args){
    return  http.createServer(this.callback()).listen(...args);
  }
  //使用中间件
  use(fn){
    this.middleware.push(fn);
  }


  //中间件回调
  compose(middlewares,context){

    // const createAsync = function( fn, next){
    //   return async function(){
    //     await fn(context,next);
    //   }
    // }
    // let dispatch = async function(){
    //   return Promise.resolve();
    // }

    // for(let i= middlewares.length-1; i >= 0 ; i-- ){
    //   dispatch = createAsync(middlewares[i],dispatch)
    //  }

    // return dispatch();
    
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

  callback(req,res){
    const context = this.createContext(req,res);
    //执行中间件
    this.compose(this.middleware, context)
     .catch(err => {
       this.onError(err);
     });
 
  }
  
  //错误处理
  onError(err){
    console.log(err);
  }
 
  //创建上下文
  createContext(req,res){
    const context = Object.create(this.context);
    context.req = req;
    context.res = res;
    return context;
  }
}

module.exports = koa;