export default function List() {
    return `
        <html>
            <head>
                <title>Links</title>
            </head>
            <body>
                <h1>Your Links</h1>

                <div id="form">
                    <input id="pass" type="password" placeholder="Owner Password" onkeyup="if (event.keyCode === 13) load()" />
                    <button onclick="load()">List</button>
                </div>

                <div id="list"></div>

                <script>
                    async function load() {
                        const pass = document.querySelector("#pass").value;
                        const res = await fetch("/api/list", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ pass }),
                        });

                        if (res.ok) {
                            const { links, error } = await res.json();
                            document.querySelector("#list").innerHTML = links.map((link) => \`
                                <a href="/\${link}" target="_blank">
                                    /\${link}
                                </a>
                                <button onclick="remove('\${link}');this.disabled=true;">Remove</button>
                            \`).join("<br />");

                            if (links.length === 0) {
                                document.querySelector("#list").innerHTML = "No links";
                            }
                        } else {
                            document.querySelector("#list").innerHTML = \`Error: \${error}\`;
                        }
                    }

                    async function remove(slug) {
                        const pass = document.querySelector("#pass").value;
                        const res = await fetch("/api/remove", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ pass, slug }),
                        });
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
