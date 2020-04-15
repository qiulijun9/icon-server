const Router = require("koa-router");
//实例化
const router = new Router();

router.get("/a", async ctx => {
  ctx.body = "1234";
  //获取get 传值 ctx.query ctx.queerystring  ctx.request.query
  console.log("a", ctx.query);
});
//动态路由
router.get("/b/:id", async ctx => {
  ctx.body = "babab";
  //获取动态路由返回值 ，可传多个值
  console.log("b");
});
module.exports = router.routes();