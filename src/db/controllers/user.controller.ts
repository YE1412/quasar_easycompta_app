import db from "app/src/db/models/index";
import { upload, MAX_SIZE } from "app/src/db/upload";

const user = db.user;
const userType = db.userType;
const devise = db.devise;
const price = db.price;
const Op = db.Sequelize.Op;

const create = (req, res) => {
  // const params = req.params;
  const body = req.body;
  // const query = req.query;
  // console.log('params');
  // console.log(params);
  // console.log('body');
  // console.log(req.body);
  const userObj = {
    lastName: body.lastname,
    firstName: body.firstname,
    login: body.login,
    email: body.email,
    pass: body.password,
    companyName: body.companyName,
    companyLogo: body.companyLogo,
    deviseId: body.deviseId,
    userTypeId: body.type,
  };
  // Save user in db
  user
    .create(userObj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating user.",
      });
    });
};

const findAll = (req, res) => {
  user
    .findAll({
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving users.",
      });
    });
};

const findAllDevises = (req, res) => {
  devise
    .findAll({
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving devises.",
      });
    });
};

const findAllPrices = (req, res) => {
  price
    .findAll({
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving prices.",
      });
    });
};

const findOne = (req, res) => {
  // const params = req.params;
  // const body = req.body;
  const query = req.query;
  // console.log(params);
  // console.log(body);
  // console.log(query);
  let whereClause = {};
  if (query.password !== undefined && query.login !== undefined) {
    whereClause = {
      pass: query.password,
      [Op.or]: [
        {
          login: query.login,
        },
        {
          email: query.login,
        },
      ],
    };
  } else {
    res.status(500).send({
      message: "Some error occured while retrieving user.",
    });
    return;
  }

  user
    .findAll({
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "login",
        "email",
        "companyName",
        "companyLogo",
        "devise.deviseId",
        "user_type.userTypeId",
      ],
      where: whereClause,
      include: [
        user.devise,
        user.type
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving user.",
      });
    });
};

const retrieveOne = (req, res) => {
  const params = req.params;
  // console.log("retrieveOne");
  // const body = req.body;
  // const query = req.query;
  // console.log(params);
  // console.log(body);
  // console.log(query);
  let whereClause = {};
  if (params.id !== undefined) {
    whereClause = {
      userId: params.id,
    };
  } else {
    res.status(500).send({
      message: `Some error occured while retrieving user with id=${params.id}.`,
    });
    return;
  }

  user
    .findAll({
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "login",
        "email",
        "companyName",
        "companyLogo",
        "devise.deviseId",
        "user_type.userTypeId",
      ],
      where: whereClause,
      include: [
        user.devise,
        user.type
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving user.",
      });
    });
};

const checkOne = (req, res) => {
  // const params = req.params;
  // const body = req.body;
  const query = req.query;
  // console.log(params);

  user
    .findAll({
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "login",
        "email",
        "companyName",
        "companyLogo",
        "deviseId",
        "userTypeId",
      ],
      where: {
        [Op.or]: [
          {
            login: query.login,
          },
          {
            email: query.login,
          },
        ],
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving user.",
      });
    });
};

const update = (req, res) => {
  const params = req.params;

  user
    .update(req.body, {
      where: {
        userId: params.id,
      },
    })
    .then((result) => {
      if (result[0] === 1) {
        res.send({
          message: "User was updated successfully !",
        });
      } else {
        res.status(500).send({
          message: `Cannot update user with id=${params.id}. Maybe User was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + params.id,
      });
    });
};

const deleteOne = (req, res) => {
  const params = req.params;

  user
    .destroy({
      where: {
        id: params.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "User was deleted successfully !",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete user with id=${params.id}. Maybe User was not found or req.body is empty !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting User with id=" + params.id,
      });
    });
};

const deleteAll = (req, res) => {
  user
    .destroy({
      where: {},
      truncate: false,
    })
    .then((res) => {
      res.send({
        message: `${res} Users was deleted successfully !`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Users !",
      });
    });
};

const findAllOfType = (req, res) => {
  const params = req.params;
  // console.log(params);

  user
    .findAll({
      where: {
        type: params.type,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retieving users with type=" + params.type,
      });
    });
};

const getAllTypes = function (req, res) {
  userType
    .findAll({
      attributes: [
        "userTypeId",
        "regular",
        "admin",
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retieving user types."
      });
    });
};

const uploadImg = function (req, res) {
  // console.log(req.params);
  // console.log(req.query);
  // console.log(req.body);
  // console.log(req.file);
  upload(req, res)
    .then(() => {
      // console.log(result);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    })
    .catch((err) => {
      // console.log(err);
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: `File size cannot be larger than ${MAX_SIZE}MB!`,
          errFileSize: true,
          errMaxFileSize: MAX_SIZE,
        });
      }
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        error: err,
      });
    });
};

export default {
  create: create,
  findAll: findAll,
  findAllDevises: findAllDevises,
  findAllPrices: findAllPrices,
  findOne: findOne,
  retrieveOne: retrieveOne,
  checkOne: checkOne,
  update: update,
  deleteOne: deleteOne,
  deleteAll: deleteAll,
  findAllOfType: findAllOfType,
  getAllTypes: getAllTypes,
  uploadImg: uploadImg,
};
