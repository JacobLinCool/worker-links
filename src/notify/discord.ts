export async function send(webhook: string, title: string, content: string) {
    const req = new Request(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            username: "Short Link Service",
            embeds: [
                {
                    title: title,
                    description: content,
                },
            ],
        }),
    });

    const res = await fetch(req);
    return res.ok;
}
