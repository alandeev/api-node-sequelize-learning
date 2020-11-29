import Aluno from '../models/Aluno';
import Tech from '../models/Tech';
import TechAluno from '../models/TechAluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res){
    // const alunos = await Aluno.findAll({
    //   include: {
    //     model: Tech,
    //     as: "teches",
    //     through: {
    //       attributes: ['id', 'aluno_id', 'tech_id']
    //     }
    //   }
    // });

    const relations = await Aluno.findAll({
      include: {
        model: Photo,
        as: 'profile'
      }
    });

    res.json(relations);
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
          attributes: ['path', 'filename', 'mimetype']
        }
      ]
    });
    res.json(aluno);
  }

  async create(req, res){
    try{
    const { name, lastname, email, age } = req.body;
    const aluno = await Aluno.create({ name, lastname, email, age });
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
