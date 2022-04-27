const express = require("express");
const { getBook } = require("../controllers/book");
const { isUserAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/book/:id", getBook);
module.exports = router;
