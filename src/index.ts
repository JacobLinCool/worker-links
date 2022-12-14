import { Hono } from "hono";
import { Env } from "./types";
import Home from "./pages/home";
import List from "./pages/list";
import Access from "./pages/access";
import api from "./api";
import { send as send_mail } from "./notify/email";
import { send as send_discord } from "./notify/discord";

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

    if (c.env.EMAIL_NOTIFY) {
        const host = c.req.headers.get("host");
        const url = `https://${host}/${slug}`;

        const ip = c.req.headers.get("cf-connecting-ip") || c.req.headers.get("x-forwarded-for") || c.req.headers.get("x-real-ip");
        const country = c.req.headers.get("cf-ipcountry");
        const ua = c.req.headers.get("user-agent");

        c.executionCtx.waitUntil(
            send_mail(
                c.env.EMAIL_NOTIFY,
                `Link Accessed: ${url}`,
                `
            Link <b><i>${url}</i></b> was accessed at <code>${new Date()}</code>. <br />
            <br />
            <fieldset>
                <p>Visitor Info:</p>
                <ul>
                    <li>IP Address: <code>${ip}</code> (${country})</li>
                    <li>User Agent: <code>${ua}</code></li>
                </ul>

                <p>Cloudflare Context:</p>
                <pre><code>${JSON.stringify(c.req.cf, null, 4)}</code></pre>
            </fieldset>
            `
            )
        );
    }

    if (c.env.DISCORD_NOTIFY) {
        const host = c.req.headers.get("host");
        const url = `https://${host}/${slug}`;

        const ip = c.req.headers.get("cf-connecting-ip") || c.req.headers.get("x-forwarded-for") || c.req.headers.get("x-real-ip");
        const country = c.req.headers.get("cf-ipcountry");
        const ua = c.req.headers.get("user-agent");

        c.executionCtx.waitUntil(
            send_discord(
                c.env.DISCORD_NOTIFY,
                `Link Accessed: ${url}`,
                `
            Link **${url}** was accessed at \`${new Date()}\`.\n
            \n
            Visitor Info:
            - IP Address: \`${ip}\` (${country})
            - User Agent: \`${ua}\`
            \n
            Cloudflare Context:
            \`\`\`json
            ${JSON.stringify(c.req.cf, null, 4)}
            \`\`\`
            `
            )
        );
    }

    return c.redirect(link.url);
});

export default app;
