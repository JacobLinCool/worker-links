export async function send(to: string, title: string, content: string) {
    const req = new Request("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: {
                email: to,
                name: "Short Link Service",
            },
            subject: title,
            content: [
                {
                    type: "text/html",
                    value: content,
                },
            ],
        }),
    });

    const res = await fetch(req);
    return res.ok;
}
