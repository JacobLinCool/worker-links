import { Hono } from "hono";
import { Env } from "./types";
import Home from "./home";
import List from "./list";
import Access from "./access";
import api from "./api";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => c.html(Home()));
app.get("/list", (c) => c.html(List()));
app.route("/api", api);
app.get("/:slug", async (c) => {
    const slug = c.req.param("slug");

    const link = await c.env.STORAGE.get<{ url: string; pin: string; time: number }>(slug, "json");

    if (!link) {
        c.status(404);
        return c.html(`<h1>Not Found</h1>`);
    }

    if (link.pin) {
        const pin = c.req.query("pin");

        if (!pin) {
            return c.html(Access(slug));
        }

        if (pin !== link.pin) {
            c.status(401);
            return c.html(`<h1>Unauthorized</h1>`);
        }
    }

    return c.redirect(link.url);
});

export default app;
