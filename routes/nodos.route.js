const express = require("express");
const bodyParser = require("body-parser");
const nodesController = require("../controllers/nodes.controller");

const router = express.Router();
const parser = bodyParser.json();

router.post("/", parser, nodesController.addNodo);
router.patch("/", parser, nodesController.putNodo);
router.get("/:nodoID", nodesController.getNodo);
router.delete("/:nodoID", nodesController.deleteNodo);
router.get("/nodos/todos", nodesController.getNodos);

module.exports = router;
