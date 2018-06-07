const serverless = require('serverless-http');
const Vue = require('vue');
const express = require('express');
const path = require('path');
const fs = require('fs');
const VueServerRenderer = require('vue-server-renderer');

const  server = express();

server.use('/templates', express.static(path.join(__dirname, 'templates')));
const indexTemplate =  fs.readFileSync('templates/index.template.html', 'utf-8');
const otherTemplate =  fs.readFileSync('templates/other.template.html', 'utf-8');

server.get('*', (req, res) => {
	const renderer = VueServerRenderer.createRenderer({
		template: indexTemplate
	});
	const app = new Vue({
		data: {
			url: req.url,
			custom: 'Dupa',
		},
		template: otherTemplate });
		renderer.renderToString(app, (err, html) => {
			if (err) {
				return res.status(500).end('Internal Server Error')
			}
			res.status(200).send(html);
		})
});

module.exports.handler = serverless(server);
