export default function initDrummersController(db) {
  const oneDrummer = (req, res) => {
    if (!req.isUserLoggedIn) {
      res.redirect('/login');
    } else {
      // getting the details of 1 drummer based on drummer's id
      db.Drummer.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((drummer) => {
          // ejs page to be rendered is oneDrummer.ejs (in drummers folder), the response sent by
          // the backend is made accessible to the ejs page
          res.render('drummers/oneDrummer', { drummer });
        })
        .catch((error) => console.log('error', error));
    }
  };

  const allDrummers = (req, res) => {
    if (!req.isUserLoggedIn) {
      res.redirect('/login');
    } else {
      // getting details of all drummers
      db.Drummer.findAll()
        .then((drummers) => {
          // ejs page to be rendered is all-drummer.ejs (in drummers folder), the response sent by
          // the backend is made accessible to the ejs page
          res.render('drummers/all-drummers', { drummers });
        })
        .catch((error) => console.log('error', error));
    }
  };

  return {
    oneDrummer,
    allDrummers,
  };
}
