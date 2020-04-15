const Koa = require('koa');
const server = require('koa-static');
const router = require("koa-router")();
// const router = require('./src/routes');
const login = require('./src/routes/login');
const user = require('./src/routes/user');
const views = require('koa-views');
const bodyParser = require("koa-bodyparser");
const { PageError, JsonError} = require('./src/custom_middleware/errorType')
const { catchError, logger ,isLogin} = require('./src/custom_middleware');
const app = new Koa();


app.use(bodyParser());
//配置路由
router.use('/login', login);
router.use('/user', user);

//匹配中间键
app.use(logger);
app.use(catchError);
app.use(isLogin);

app.on("error", (err, ctx) => {
  console.error(".....\n", err);
 });
const main = ctx => {
  // ctx.throw(403, new PageError('没有权限访问'));
   ctx.throw(500,"服务器出错");
  
}

// app.use(main);

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


app.use(server(__dirname + '/public'));


//启动路由 ，设置响应头
app.use(router.routes()).use(router.allowedMethods());

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icon2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('连接数据库成功');
  }
});

app.listen(8001, () => {
  console.log('服务开启');
});