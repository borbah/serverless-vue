const serverless = require('serverless-http');
const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  });

  renderer.renderToString(app, (err, html) => {
    console.log(html) // will be the full page with app content injected.
  })
})

module.exports.handler = serverless(server);