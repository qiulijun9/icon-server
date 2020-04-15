const logger = async function( ctx, next ){
  console.log(ctx.method);

  await next();
  ctx.res.on('finish',() => {
    console.log(`logger----- Method:`+ctx.method);
  })
}


module.exports = logger;