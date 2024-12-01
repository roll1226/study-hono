import { serve } from "@hono/node-server";
import console from "console";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

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

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
