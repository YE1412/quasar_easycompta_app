import db from 'app/src/db/models/index';

const actor = db.actor;
const type = db.actorType;
const Op = db.Sequelize.Op;

const create = (req, res) => {
  const body = req.body;
  // console.log(body);
  const actorObj = {
    cp: body.cp,
    email: body.email,
    nom: body.nom,
    prenom: body.prenom,
    nomRue: body.nomRue,
    numCommercant: body.numCommercant,
    numRue: body.numRue,
    tel: body.tel,
    ville: body.ville,
    actorTypeId: body.type,
  };
  // Save actor in db
  actor
    .create(actorObj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating actor.',
        error: err,
      });
    });
};

const findAll = (req, res) => {
  actor
    .findAll({
      attributes: [
        'actorId',
        'prenom',
        'nom',
        'email',
        'numRue',
        'nomRue',
        'cp',
        'ville',
        'tel',
        'numCommercant',
        'personne_type.actorTypeId',
      ],
      where: {},
      include: type,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retieving actors.',
      });
    });
};

const findAllTypes = (req, res) => {
  type
    .findAll({
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retieving actor type.',
      });
    });
};

const findOne = (req, res) => {
  const query = req.query;
  // let whereClause = {};
  if (query.actorId === undefined) {
    res.status(500).send({
      message: 'Some error occured while retrieving actor.',
    });
    return;
  }

  actor
    .findByPk(query.actorId, {
      include: [
        {
          model: type,
          through: { attributes: [] },
        },
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retieving actor.',
      });
    });
};

const getNbActors = (req, res) => {
  actor
    .findAll({
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('actorId')), 'n_act'],
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retieving number of actors.',
      });
    });
};

const update = (req, res) => {
  const params = req.params;
  // console.log(req.body);
  actor
    .update(req.body, {
      where: {
        actorId: params.id,
      },
    })
    .then((result) => {
      // console.log(result);
      if (result[0] === 1) {
        res.send({
          message: 'Actor was updated successfully !',
        });
      } else {
        res.status(500).send({
          message: `Cannot update actor with id=${params.id}. Maybe Actor was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error updating Actor with id=' + params.id,
      });
    });
};

const deleteOne = (req, res) => {
  const params = req.params;

  actor
    .destroy({
      where: {
        actorId: params.id,
      },
    })
    .then((result) => {
      console.log(result);
      if (result === 1) {
        res.send({
          message: 'Actor was deleted successfully !',
        });
      } else {
        res.status(500).send({
          message: `Cannot delete actor with id=${params.id}. Maybe Actor was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error deleting Actor with id=' + params.id,
      });
    });
};

const deleteAll = (req, res) => {
  actor
    .destroy({
      where: {},
      truncate: false,
    })
    .then((res) => {
      res.send({
        message: `${res} Actors was deleted successfully !`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error deleting Actors !',
      });
    });
};

const findByTypes = (req, res) => {
  const params = req.params;

  const whereClause = {};
  if (params.types !== undefined) {
    whereClause.actorTypeId = {
      [Op.or]: params.types,
    };
  } else {
    res.status(500).send({
      message: 'Some error occured while retrieving actors.',
    });
    return;
  }

  actor
    .findAll(
      {
        where: whereClause,
      },
      {
        include: type,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occured while retieving actors with type=${params.type}.`,
      });
    });
};

export default {
  create: create,
  findAll: findAll,
  findOne: findOne,
  findByTypes: findByTypes,
  findAllTypes: findAllTypes,
  getNbActors: getNbActors,
  update: update,
  deleteOne: deleteOne,
  deleteAll: deleteAll,
};
