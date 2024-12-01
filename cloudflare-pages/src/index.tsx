import { Hono } from "hono";
import { renderer } from "./renderer";

type Bindings = {
  USER: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get("/", (c) => {
  const name = c.env.USER;
  return c.render(<h1>Hello! {name}</h1>);
});

export default app;
