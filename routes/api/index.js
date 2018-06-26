const router = require("express").Router();
const cxplaceRoutes = require("./cxplace");


// CXPlace routes
router.use("/cxplaces", cxplaceRoutes);


module.exports = router;
