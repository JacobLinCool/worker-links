export default function Access(slug: string) {
    return `
        <html>
            <head>
                <title>Access</title>
            </head>
            <body>
                <h1>Access Link</h1>

                <div id="form">
                    <input id="pin" type="password" placeholder="Access PIN" onkeyup="if (event.keyCode === 13) go()" />
                    <button onclick="go()">Access</button>
                </div>

                <script>
                    function go() {
                        const pin = document.querySelector("#pin").value;
                        location.href = \`/${slug}?pin=\${pin}\`;
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
                </style>
            </body>
        </html>
    `;
}
