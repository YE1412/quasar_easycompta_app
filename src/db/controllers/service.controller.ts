import db from 'app/src/db/models/index';

const service = db.service;
// const Op = db.Sequelize.Op;

const create = (req, res) => {
  const body = req.body;
  const serviceObj = {
    montantHt: body.montantHt,
    nom: body.nom,
    quantite: body.quantite,
  };
  // Save service in db
  service
    .create(serviceObj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating service.',
      });
    });
};

const findAll = (req, res) => {
  service
    .findAll({
      attributes: ['serviceId', 'nom', 'montantHt', 'quantite'],
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retieving services.',
      });
    });
};

const findOne = (req, res) => {
  const query = req.query;
  let whereClause = {};
  if (query.serviceId !== undefined) {
    whereClause = {
      serviceId: query.serviceId,
    };
  } else {
    res.status(500).send({
      message: 'Some error occured while retrieving service.',
    });
    return;
  }

  service
    .findAll({
      where: whereClause,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retieving service.',
      });
    });
};

const getNbServices = (req, res) => {
  service
    .findAll({
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('serviceId')), 'n_srv'],
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occured while retieving number of services.',
      });
    });
};

const update = (req, res) => {
  const params = req.params;

  service
    .update(req.body, {
      where: {
        serviceId: params.id,
      },
    })
    .then((result) => {
      if (result[0] === 1) {
        res.send({
          message: 'Service was updated successfully !',
        });
      } else {
        res.status(500).send({
          message: `Cannot update service with id=${params.id}. Maybe Service was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error updating Service with id=' + params.id,
      });
    });
};

const deleteOne = (req, res) => {
  const params = req.params;

  service
    .destroy({
      where: {
        serviceId: params.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: 'Service was deleted successfully !',
        });
      } else {
        res.status(500).send({
          message: `Cannot delete service with id=${params.id}. Maybe Service was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error deleting Servive with id=' + params.id,
      });
    });
};

const deleteAll = (req, res) => {
  service
    .destroy({
      where: {},
      truncate: false,
    })
    .then((res) => {
      res.send({
        message: `${res} Services was deleted successfully !`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error deleting Services !',
      });
    });
};

const findAllOfAmountComp = (req, res) => {
  const params = req.params;

  const whereClause = {};
  if (params.montantHt !== undefined && params.type) {
    whereClause.montantHt = {};
    let valid = false;
    switch (params.type) {
      case 'lte':
      case 'gte':
      case 'lt':
      case 'gt':
      case 'eq':
        valid = true;
        break;
      default:
        break;
    }
    if (!valid) {
      res.status(500).send({
        message:
          'Some error occured while retrieving services in type where clause.',
      });
      return;
    }
    whereClause.montantHt[`Op.${params.type}`] = params.montantHt;
  } else {
    res.status(500).send({
      message: 'Some error occured while retrieving services.',
    });
    return;
  }

  service
    .findAll({
      where: whereClause,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occured while retieving services with amount=${params.montantHt} and type=${params.type}.`,
      });
    });
};

export default {
  create: create,
  findAll: findAll,
  findOne: findOne,
  // checkOne: checkOne,
  getNbServices: getNbServices,
  update: update,
  deleteOne: deleteOne,
  deleteAll: deleteAll,
  findAllOfAmountComp: findAllOfAmountComp,
};
