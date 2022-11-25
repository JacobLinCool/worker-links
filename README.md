# Short Link Service

Short link service powered by [Cloudflare Workers](https://workers.cloudflare.com/).

## Features

### Create a short link

![create-link](screenshots/create-link.gif)

### Create a short link with PIN

![access-pin](screenshots/access-pin.gif)

### List all links & Delete a link

![list-links](screenshots/list-links.gif)

## Deploy

It is a Cloudflare Worker!

You can simply fork this repo and do the following steps:

1. [optional] Install [Pnpm](https://pnpm.io/installation)
2. `pnpm i` - Install dependencies
3. `pnpm pub` - Publish to Cloudflare Workers
4. Set the `PASS` environment variable in Cloudflare Workers dashboard

Done!
