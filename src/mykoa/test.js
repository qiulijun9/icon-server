 const koa = require('./koa');
 const app = new koa();

 app.use(async (ctx, next) => {
  await next();
 })
 
 app.use(async (ctx) => {
  //  res.end('hello koa');
  ctx.res.end('123')
 });

 app.listen(3000,() => {
  console.log("start");
 })


