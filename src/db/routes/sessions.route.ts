import sessions from 'app/src/db/controllers/sessions.controller.js';
export default (express) => {
  const router = express.Router();

  // console.log('routing to sessions route !');

  // Delete session
  router.post('/logout', sessions.delete);

  // Get all languages
  router.get('/languages', sessions.getAllLanguages);

  // app.use('/api/sessions', router);

  return router;
};
