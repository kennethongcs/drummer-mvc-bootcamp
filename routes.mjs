import db from './models/index.mjs';
import { getHashSalted } from './helper_functions.mjs';

// import your controllers here
import initDrummersController from './controllers/drummers.mjs';
import initReservationsController from './controllers/reservations.mjs';
import initEquipmentsController from './controllers/items.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  // define your route matchers here using app
  const DrummersController = initDrummersController(db);
  const ReservationsController = initReservationsController(db);
  const EquipmentsController = initEquipmentsController(db);
  const UsersController = initUsersController(db);

  // check if user is logged in when creating a reservation
  app.use(UsersController.userDetails);
  // add user to global
  app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
  });

  // login
  app.get('/login', UsersController.userLoginDisplay);
  app.post('/login', UsersController.userLoginVerification);
  app.get('/signup', UsersController.userRegister);
  app.post('/signup', UsersController.userCreatePost);
  // logout
  app.get('/logout', UsersController.userLogout);

  // gets details of 1 drummer
  app.get('/drummer/:id', DrummersController.oneDrummer);
  // creates an entry into the reservations table
  app.post('/reservation/:drummer_id', ReservationsController.reservationPost);
  // gets all reservations of a single drummer (id specified in :drummer_id)
  app.get(
    '/reservations/:drummer_id',
    ReservationsController.drummersReservations
  );
  // gets details of all drummers
  app.get('/', DrummersController.allDrummers);
  // shows details of each drummer's equipment
  app.get('/items/:drummer_id', EquipmentsController.allEquipment);
}
