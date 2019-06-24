
require('dotenv').config();
const multer  = require('multer');
const path    = require('path');
const Project = require('../model/Portfolio');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage });

module.exports = function (app) {

	app.route('/api/project')
		.post(upload.single('img_url'), (req, res) => {
			let { name, description, code_url, demo_url, type, skills, item } = req.body;
			//skills = [ ...skills, ...item.split(',')];

			let pro = new Project({
				name,
				description,
				code_url,
				demo_url,
				type,
				skills,
			})
			pro.img_url = `http://${req.headers.host}/uploads/${req.file.filename}`;
			pro.save()
				.then(project => res.redirect('/page'))
				.catch(err => res.status(401).json({ err }));
		})

		.get(function (req, res) {
			Project.find({})
				.then(project => res.json({ project }))
				.catch(err => res.status(400).json({ err }));
		})

}
