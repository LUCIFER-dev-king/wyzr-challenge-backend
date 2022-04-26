const { default: axios } = require("axios");

exports.getBook = (req, res) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
    .then((value) => {
      if (value.status === 200) {
        return res.status(200).json({
          item: value.data,
        });
      }
    })
    .catch((e) => console.log(e));
};
