const serverless = require('serverless-http');
const express = require('express');

const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  template: `
      <html>
        <head>
          {{{ renderResourceHints() }}}
          {{{ renderStyles() }}}
        </head>
        <body>
          <!--vue-ssr-outlet-->
          {{{ renderState() }}}
          {{{ renderScripts() }}}
        </body>
      </html>
  `,
  clientManifest
});

const  server = express();
const createApp = require('./dist/webpack-bundle-server.js');

server.get('*', (req, res) => {
  const context = { url: req.url };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  })
});

module.exports.test = serverless(server);
