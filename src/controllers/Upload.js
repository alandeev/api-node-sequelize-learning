const multer = require('multer');
const fs = require('fs');

const Photo = require('../models/Photo')

const multer_cfg = require('../config/multer');
const Aluno = require('../models/Aluno');

const upload = multer(multer_cfg).single('file');

class UploadController {
  async store(req, res){
    return upload(req, res, async (error) => {
      if(error){
        return res.json({ errors: [ error.code ] });
      }

      try{
        const { aluno_id } = req.body;
        const { originalname, mimetype, path, filename } = req.file;
        const aluno = await Aluno.findByPk(aluno_id);
        if(!aluno) {
          return res.status(400).json({ errors: [ 'aluno not found by id' ] });
        }

        const [ photo, created ] = await Photo.findOrCreate({
          where: { aluno_id },
          defaults: { aluno_id, originalname, mimetype, path, filename }
        });

        if(!created){
          fs.unlink(photo.path, () => {});
          const changed = await photo.update(req.file);
          return res.status(201).json(changed);
        }

        return res.status(201).json(photo);
      }catch(err){
        fs.unlink(req.file.path, () => {});
        if(err.errors){
          return res.status(400).json({ errors: err.errors.map(error => error.message) });
        }
        return res.status(400).json({ errors: [ err.message ] });
      }
    })
  }
}

module.exports = new UploadController();

