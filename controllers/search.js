const { default: axios } = require("axios");
const User = require("../models/user");
require("dotenv").config();

exports.getSearchedBook = async (req, res) => {
  const { bookName } = req.body;
  // const { email } = req.user;
  const email = "nihaljesiya@gmail.com";
  const user = await User.findOne({
    email,
  });
  user.searchQuries.push(bookName);
  user.save(async (err, result) => {
    if (!err) {
      return await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=AIzaSyCZeI4Zb4iuBUgO9YMQnX4ZooA0rv4LxEs`
        )
        .then((value) => {
          if (value.status === 200) {
            return res.status(200).json({ items: value.data.items });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      return res.status(400).send(err.message);
    }
  });
};
