import { serve } from "@hono/node-server";
import console from "console";
import * as dotenv from "dotenv";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";

// .env ファイルを読み込む
dotenv.config();

type Bindings = {
  USERNAME: string;
  PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello/:name", (c) => {
  return c.json({ message: `Hello ${c.req.param("name")}!` });
});

app.get("/entry/:date/:id", (c) => {
  const date = c.req.param("date");
  const id = c.req.param("id");

  return c.json({
    date,
    id,
    ok: true,
  });
});

app.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi!");
  return c.text(`You want see ${page} of ${id}`);
});

app.post("/posts", (c) => c.text("Created!", 201));
app.delete("/posts/:id", (c) => {
  return c.text(`${c.req.param("id")} is deleted!`);
});

const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  );
};

app.get("/page", (c) => {
  return c.html(<View />);
});

// app.use(
//   "/admin/*",
//   basicAuth({
//     username: "admin",
//     password: "password",
//   })
// );
app.get("/admin/*", (c, next) => {
  console.log({
    env: process.env,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
  });

  const auth = basicAuth({
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
  });
  return auth(c, next);
});

app.get("/admin", (c) => {
  return c.text("Admin page");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
