const Router = require("koa-router");
// const bodyparser = require('koa-bodyparser')
//app.use(bodyparser())
//实例化
const router = new Router();

router.get("/a", async ctx => {
  ctx.body = "1234";
  //获取get 传值 ctx.query ctx.queerystring  ctx.request.query
  console.log(222, ctx.query);
});

router.get("/b", async ctx => {
  ctx.body = "miss qiu";
});
//动态路由
router.get("/b/:id", async ctx => {
  ctx.body = "babab";
  //获取动态路由返回值 ，可传多个值
  console.log(ctx.params);
});







module.exports = router;