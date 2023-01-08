import db from "app/src/db/models/index";

const order = db.order;
// const invoice = db.invoice;
const service = db.service;
const contains = db.contains;
// const Op = db.Sequelize.Op;

const create = async (req, res) => {
  const body = req.body;
  let serviceTab = [];
  let serviceRow = [];
  for (const key in body.services) {
    serviceTab.push({
      serviceId: body.services[key].value,
      nom: body.services[key].nom,
      montantHt: body.services[key].montantHt,
      quantite: body.services[key].quantite,
    });
  }
  const orderObj = {
    contenuAdditionnel: body.contenuAdditionnel,
    priceHt: body.priceHt,
    produitservice: serviceTab,
  };

  // 1. INSERT a new order
  await order
    .create(orderObj, {
      include: [
        {
          association: order.services,
          as: "Services",
        },
      ],
    })
    .then(async (data) => {
      // 2. Find the services rows
      for (const key in body.services) {
        serviceRow[key] = await service
          .findByPk(body.services[key].value)
          .then((data2) => {
            return data2;
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occured while fetching service with id=" +
                  body.services[key].value,
              error: err,
            });
          });
      }
      // console.log(data);
      // 3. INSERT the association in contains table
      data
        .addServices(serviceRow, { through: contains })
        .then((data2) => {
          res.send(data2);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occured while inserting in associated table contains with order id=" +
                data.orderId,
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating order.",
        error: err,
      });
    });
};

const findAll = (req, res) => {
  order
    .findAll({
      attributes: [
        "orderId",
        "contenuAdditionnel",
        "priceHt",
        "Services.serviceId",
      ],
      where: {},
      include: [order.services, order.invoice],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving orders.",
      });
    });
};

const findOne = (req, res) => {
  const query = req.query;
  // let whereClause = {};
  if (query.orderId === undefined) {
    res.status(500).send({
      message: "Some error occured while retrieving order.",
    });
    return;
  }

  order
    .findByPk(query.orderId, {
      include: [order.services, order.invoice],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving order.",
      });
    });
};

const getNbOrders = (req, res) => {
  order
    .findAll({
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("orderId")), "n_ord"],
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occured while retieving number of orders.`,
      });
    });
};

const update = async (req, res) => {
  const params = req.params;
  const body = req.body;

  let serviceTab = [];
  let serviceRow = [];
  for (const key in body.services) {
    serviceTab.push({
      serviceId: body.services[key].value,
      nom: body.services[key].nom,
      montantHt: body.services[key].montantHt,
      quantite: body.services[key].quantite,
    });
  }
  const orderObj = {
    contenuAdditionnel: body.contenuAdditionnel,
    priceHt: body.priceHt,
    produitservice: serviceTab,
  };

  // 1. UPDATE a new order
  const orderModel = await order.findByPk(params.id, {
    include: [order.services, order.invoice],
  });
  await order
    .update(
      orderObj,
      {
        where: {
          orderId: params.id,
        },
      },
      {
        include: [
          {
            association: order.services,
            as: "Services",
          },
        ],
      }
    )
    .then(async (data) => {
      // 2. Find the services rows
      for (const key in body.services) {
        serviceRow[key] = await service
          .findByPk(body.services[key].value)
          .then((data2) => {
            return data2;
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occured while fetching service with id=" +
                  body.services[key].value,
              error: err,
            });
          });
      }
      // console.log(data);
      // 3. DELETE the old association in contains table
      await orderModel.removeServices(orderModel.Services);
      // 4. INSERT the association in contains table
      orderModel
        .addServices(serviceRow, { through: contains })
        .then((data2) => {
          res.send(data2);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occured while inserting in associated table contains with order id=" +
                data.orderId,
            error: err,
          });
        });
      return data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while updating order.",
        error: err,
      });
    });
};

const deleteOne = (req, res) => {
  const params = req.params;

  order
    .destroy({
      where: {
        orderId: params.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Order was deleted successfully !",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete actor with id=${params.id}. Maybe Order was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Order with id=" + params.id,
      });
    });
};

const deleteAll = (req, res) => {
  order
    .destroy({
      where: {},
      truncate: false,
    })
    .then((res) => {
      res.send({
        message: `${res} Orders was deleted successfully !`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Orders !",
      });
    });
};

export default {
  create: create,
  findAll: findAll,
  findOne: findOne,
  getNbOrders: getNbOrders,
  // findByTypes: findByTypes,
  // findAllTypes: findAllTypes,
  update: update,
  deleteOne: deleteOne,
  deleteAll: deleteAll,
};
