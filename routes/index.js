const Pet = require('../models/pet');

module.exports = (app) => {

  /* GET home page. */
  // with pagination
  app.get('/', (req, res) => {
    const page = req.query.page || 1

    Pet.paginate({}, {page: page}).then((results) => {
      res.render('pets-index', { pets: results.docs, pagesCount: results.pages, currentPage: page });
    });
  });

  // did I just lose my find?
  // I did not... how is it working without the Pet.find??

  // app.get('/', (req, res) => {
  //   Pet.find().exec((err, pets) => {
  //     res.render('pets-index', { pets: pets });    
  //   });
  // });
}
