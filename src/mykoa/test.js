 const koa = require('./koa');
 const app = new koa();
 
 app.use( async (ctx) => {
  //  res.end('hello koa');
   ctx.body = `hello`
 });

 app.listen(3000,() => {
  console.log("start");
 })


