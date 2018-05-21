import serverless from 'serverless-http';
import Vue from 'vue';
import express from 'express';
import path from 'path';
import fs from 'fs'
import * as VueServerRenderer from 'vue-server-renderer'

const  server = express()

//static files are under example.com/templates/filename
server.use('/templates', express.static(path.join(__dirname, 'templates')))
const indexTemplate =  fs.readFileSync('templates/index.template.html', 'utf-8')
const otherTemplate =  fs.readFileSync('templates/other.template.html', 'utf-8')

server.get('*', (req, res) => {
	const renderer = VueServerRenderer.createRenderer({
		template: indexTemplate
	});
	const app = new Vue({
		data: {
			url: req.url
		},
		template: otherTemplate });
		renderer.renderToString(app, (err, html) => {
			if (err) {
				return res.status(500).end('Internal Server Error')
			}
			res.status(200).send(html);
		})
})


module.exports.handler = serverless(server);
