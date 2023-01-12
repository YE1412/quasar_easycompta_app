import db from 'app/src/db/models/index';

const langue = db.langue;

const deleteSession = (req, res) => {
  req.session.destroy();
  res.send({
    message: 'Ok !',
  });
};

const getLanguages = (req, res) => {
  // console.log('getLanguages');
  langue
    .findAll({
      attributes: [
        'langueId',
        'libelle',
        'nom'
      ],
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving languages.'
      });
    });
};

export default {
  delete: deleteSession,
  getAllLanguages: getLanguages,
};
