const router = require("express").Router();
const cxplacesController = require("../../controllers/cxplaceController");

// Matches with "/api/cxplaces"
router.route("/buy")
  .get(cxplacesController.findAllBuy)

router.route("/sell")
  .get(cxplacesController.findAllSell)

router.route("/distance")
  .get(cxplacesController.findAllDistance)
  
// Matches with "/api/cxplaces/:id"
router
  .route("/:id")
  .get(cxplacesController.findById)
  .put(cxplacesController.update)


module.exports = router;


//FUTURE ADD-ONS: 
//We'd like to create admin routes that allow an admin to add or remove a cxplace
// .delete(cxplacesController.remove);
// .post(cxplacesController.create);