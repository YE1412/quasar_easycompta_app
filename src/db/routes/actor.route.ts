import actors from "app/src/db/controllers/actor.controller";
export default (express) => {
  var router = express.Router();

  // Create a new Actor
  router.post("/", actors.create);

  // Retrieve all Actors
  router.get("/", actors.findAll);

  // Retrieve all Actors type
  router.get("/types", actors.findAllTypes);

  // Retrieve all Actors by type
  router.get("/types/:type", actors.findByTypes);

  // Retrieve a single Actor with id
  router.get("/find", actors.findOne);

  // Retrieve number of actors
  router.get("/nb", actors.getNbActors);

  // Update a Actor with id
  router.put("/:id", actors.update);

  // Delete a Actor with id
  router.delete("/:id", actors.deleteOne);

  // Delete all Actors
  router.delete("/", actors.deleteAll);

  // app.use('/api/actors', router);

  return router;
};
