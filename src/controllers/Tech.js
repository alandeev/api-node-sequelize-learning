import Aluno from '../models/Aluno';
import Tech from '../models/Tech';

class TechController {
  async index(req, res){
    const techs = await Tech.findAll({
      include: {
        model: Aluno,
        as: 'alunos',
        attributes: ['id', 'name', 'email'],
        through: {
          attributes: []
        }
      },
    });
    res.json(techs);
  }

  async create(req, res){
    try{
      const tech = await Tech.create({ name: req.body.name });
      res.json(tech)
    }catch(err){
      if(err.errors)
        return res.status(400).json({ errors: err.errors.map( (error) => error.message ) });
      return res.status(400).json({ errors: [ err.message ] });
    }
  }
}

module.exports = new TechController();
