'use strict'

var express = require('express')
var db = require('../db')
var helpers = require('./helpers')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
  // Serve images
  .use('/image', express.static('db/image'))
  .get('/', all)
  .get('/:id', get)
  /* TODO: Other HTTP methods. */
  // .post('/', add)
  // .put('/:id', set)
  // .patch('/:id', change)
  // .delete('/:id', remove)
  .listen(1902)

function all(req, res) {
  var result = {errors: [], data: db.all()}

  /* Use the following to support just HTML:  */
  res.render('list.ejs', Object.assign({}, result, helpers))

  /* Support both a request for JSON and a request for HTML  */
  // res.format({
  //   json: () => res.json(result),
  //   html: () => res.render('list.ejs', Object.assign({}, result, helpers))
  // })
}

function get (request, response) {
	var id = request.params.id
	var result

	if(!db.has(id)) {
		result = {
			errors: [{id: 404, title: 'Sorry we could not find this page'}],
			data: {}
		}
			response.render('error.ejs', Object.assign({}, result, helpers))
	} else {
		result = {
			errors: [],
			data: db.get(id)
		}
		response.render('detail.ejs', Object.assign({}, result, helpers))
	}
}
