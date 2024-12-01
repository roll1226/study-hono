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
  });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
