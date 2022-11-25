export default function Home() {
    return `
        <html>
            <head>
                <title>Links</title>
            </head>
            <body>
                <h1>Create Link</h1>

                <div id="form">
                    <input id="pass" type="password" placeholder="Owner Password" />
                    <input id="url" type="text" placeholder="URL" />
                    <input id="slug" type="text" placeholder="Slug" />
                    <input id="pin" type="password" placeholder="Access PIN" />
                    <button onclick="submit()">Create</button>
                </div>

                <div id="result"></div>

                <script>
                    async function submit() {
                        const pass = document.querySelector("#pass").value;
                        const url = document.querySelector("#url").value;
                        const slug = document.querySelector("#slug").value;
                        const pin = document.querySelector("#pin").value;

                        const res = await fetch("/api/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ pass, url, slug, pin, }),
                        });

                        if (res.ok) {
                            const { slug } = await res.json();
                            document.querySelector("#result").innerHTML = \`<a href="/\${slug}" target="_blank">/\${slug}</a>\`;
                        } else {
                            document.querySelector("#result").innerHTML = \`Error: \${(await res.json()).error}\`;
                        }
                    }
                </script>

                <style>
                    body {
                        font-family: sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
                    #form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    }
                    input {
                        margin: 0.5rem;
                        padding: 0.5rem;
                        border: 1px solid #ccc;
                        border-radius: 0.25rem;
                        width: 360px;
                        max-width: 100%;
                    }
                    button {
                        margin: 0.5rem;
                        padding: 0.5rem;
                        border: 1px solid #ccc;
                        border-radius: 0.25rem;
                        background: #eee;
                        cursor: pointer;
                    }
                    a {
                        color: #419ae1;
                        text-decoration: none;
                    }
                </style>
            </body>
        </html>
    `;
}
