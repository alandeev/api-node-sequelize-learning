import Aluno from '../models/Aluno';
import Tech from '../models/Tech';
import TechAluno from '../models/TechAluno';
import Photo from '../models/Photo';

const { Op } = require('sequelize');

class AlunoController {
  async index(req, res){
    const { rows, count } = await Aluno.findAndCountAll({
      include: [
        {
          model: Photo,
          as: 'profile',
          attributes: ['filename', 'url'],
        },
        {
          model: Tech,
          as: 'teches',
          through: {
            attributes: []
          },
          where: {
            name: {
              [Op.iLike]: '%JS',
            }
          },
        }
      ],
      offset: 0,
      limit: 2,
      order: [
        ['age', 'ASC']
      ],
      attributes: ['id', 'name', 'email', 'age']
    });

    res.json({rows, count});
  }

  async show(req, res){
    const aluno = await Aluno.findByPk(req.params.aluno_id, {
      include: [
        {
          model: Tech,
          as: 'teches',
          through: {
            attributes: []
          }
        },
        {
          model: Photo,
          as: 'profile',
          attributes: ['filename', 'url'],
        }
      ]
    });
    res.json(aluno);
  }

  async create(req, res){
    try{
    const aluno = await Aluno.create(req.body,{
      fields: [ 'name', 'lastname', 'email', 'age' ]
    });
    res.json(aluno)
    }catch(err){
      return res.status(400).json({ errors: err.errors.map( (error) => error.message ) });
    }
  }

  async addTech(req, res){
    const { aluno_id, tech_id } = req.params;
    const aluno = await Aluno.findByPk(aluno_id);
    if(!aluno)
      return res.status(400).json({ error: "Aluno not found" });

    const tech = await Tech.findByPk(tech_id);
    if(!tech)
      return res.status(400).json({ error: "Tech not found" })

    const create = await TechAluno.create({ aluno_id, tech_id });
    return res.json(create);
  }
}

module.exports = new AlunoController();
