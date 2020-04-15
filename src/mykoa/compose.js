function compose(middlewares, context) {
  let middlewareIndex = 0;

  //function dispatch() {
  //   if (middlewareIndex >= middlewares.length) {
  //     return Promise.resolve();
  //   }

  //   const currentMiddleware = middlewares[middlewareIndex];
  //   middlewareIndex++;
  //   return Promise.resolve(
  //     currentMiddleware(context, () => {
  //       return dispatch();
  //     })
  //   );
  // }
  // return dispatch();

  // const createAsync = function (fn,next){
  //    return async function(){
  //      await fn(context,next);
  //    }
  //  }

  // let next = async function(){
  //    return Promise.resolve();
  //  }

  // for(let i= middlewares.length-1; i >= 0 ; i-- ){
  //   console.log(3333,middlewares[i])
  //   next = createAsync(middlewares[i],next)
  //  }

  // return next();


  const createAsync = function( fn, next){
    return async function(){
      await fn(context,next);
    }
  }
  let dispatch = async function(){
    return Promise.resolve();
  }

  for(let i= middlewares.length-1; i >= 0 ; i-- ){
    dispatch = createAsync(middlewares[i],dispatch)
   }

  return dispatch();
}

async function a(ctx, next) {
  ctx.a = 'a';
  console.log(1);
  await next();
  console.log(2);
}

async function b(ctx, next) {
  ctx.b = 'b'
  console.log(3);
  await next();
  console.log(4);
}

async function c(ctx, next) {
  ctx.c = 'c'
  console.log(5);
  await next();
  console.log(6);
}

const arr = [a, b, c];

compose(arr, {});
// compose(arr, {});