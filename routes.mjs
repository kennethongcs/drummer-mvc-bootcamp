import db from './models/index.mjs';

// import your controllers here
import initDrummersController from './controllers/drummers.mjs';
import initReservationsController from './controllers/reservations.mjs';
import initEquipmentsController from './controllers/items.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  // define your route matchers here using app
  const DrummersController = initDrummersController(db);
  const ReservationsController = initReservationsController(db);
  const EquipmentsController = initEquipmentsController(db);

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
