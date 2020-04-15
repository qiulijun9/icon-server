const Router = require("koa-router");
const router = new Router();



router.get("/123", async ctx => {
  console.log(3333);
  ctx.body = "login";
  //获取get 传值 ctx.query ctx.queerystring  ctx.request.query
});

router.post('/login',async (ctx) => {
  console.log("login");
  ctx.cookies.set(
    "id","111",
    {
      domain: "localhost",
      maxAge: 1000 * 60 * 60 * 48,
      httpOnly: false
    }
  );
  ctx.body = ctx.request.body;
})

module.exports = router.routes();