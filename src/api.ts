import { Hono } from "hono";
import { Env } from "./types";

const api = new Hono<{ Bindings: Env }>();

api.post("/create", async (c) => {
    const { pass, url, slug, pin } = await c.req.json<{
        pass: string;
        url: string;
        slug: string;
        pin: string;
    }>();

    if (pass !== c.env.PASS) {
        c.status(401);
        return c.json({ error: "Invalid password" });
    }

    if (["list", "api", ""].includes(slug)) {
        c.status(400);
        return c.json({ error: "Invalid slug" });
    }

    try {
        new URL(url);
    } catch {
        c.status(400);
        return c.json({ error: "Invalid URL" });
    }

    const link = await c.env.STORAGE.get<{
        url: string;
        pin: string;
        time: number;
    }>(slug, "json");

    if (link) {
        c.status(409);
        return c.json({ error: "Slug already exists" });
    }

    await c.env.STORAGE.put(slug, JSON.stringify({ url, pin, time: Date.now() }));
    return c.json({ slug });
});

api.post("/list", async (c) => {
    const { pass } = await c.req.json<{ pass: string }>();

    if (pass !== c.env.PASS) {
        c.status(401);
        return c.json({ error: "Invalid password" });
    }

    const links = await c.env.STORAGE.list({ prefix: "" });

    return c.json({ links: links.keys.map((x) => x.name) });
});

api.post("/remove", async (c) => {
    const { pass, slug } = await c.req.json<{ pass: string; slug: string }>();

    if (pass !== c.env.PASS) {
        c.status(401);
        return c.json({ error: "Invalid password" });
    }

    await c.env.STORAGE.delete(slug);
    return c.json({ slug });
});

export default api;
