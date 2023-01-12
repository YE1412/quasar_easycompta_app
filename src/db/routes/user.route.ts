import users from 'app/src/db/controllers/user.controller.js';
export default (express) => {
  const router = express.Router();

  // Create a new User
  router.post('/', users.create);

  // Upload an image
  router.post('/upload', users.uploadImg);

  // Retrieve all Users
  router.get('/', users.findAll);

  // Retrieve a Users
  router.get('/retrieve/:id', users.retrieveOne);

  // Retrieve a User Types
  router.get('/types', users.getAllTypes);

  // Retrieve all Devises
  router.get('/devises', users.findAllDevises);

  // Retrieve all Prices
  router.get('/prices', users.findAllPrices);

  // Retrieve all Users by type
  router.get('/type/:type', users.findAllOfType);

  // Retrieve a single User with email and password
  router.get('/login', users.findOne);

  // Retrieve a single User with email
  router.get('/email/', users.checkOne);

  // Update a User with id
  router.put('/:id', users.update);

  // Delete a User with id
  router.delete('/:id', users.deleteOne);

  // Delete all Users
  router.delete('/', users.deleteAll);

  // app.use('/api/users', router);

  return router;
};
