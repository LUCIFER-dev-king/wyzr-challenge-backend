const express = require("express");
const { getSearchedBook } = require("../controllers/search");
const { isUserAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/search", getSearchedBook);

module.exports = router;
