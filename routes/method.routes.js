module.exports = app => {
    const method = require("../controller/method.controller.js");

    var router = require("express").Router();

    router.get("/", method.getMethods);
    router.get("/:id", method.getMethodById);
    router.post("/", method.addMethod);
    router.put("/:id", method.updateMethod);
    router.delete("/:id", method.deleteMethod);

    app.use('/api/method', router)
};