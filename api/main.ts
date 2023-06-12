import * as oak from "https://deno.land/x/oak@v12.5.0/mod.ts";

const app = new oak.Application();
const router = new oak.Router();

app.use(async (ctx, next) => {
  try {
    await oak.send(ctx, ctx.request.url.pathname, {
      root: "static",
      index: "index.html",
    });
  } catch (_) {
    await next();
  }
});

router.get("/dynamic", (ctx) => {
  ctx.response.body = "dynamic route worked";
});

app.use(router.allowedMethods());
app.use(router.routes());

app.listen({ port: 8000 });
