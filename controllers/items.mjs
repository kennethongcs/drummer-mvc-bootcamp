export default function initEquipmentsController(db) {
  const allEquipment = (req, res) => {
    db.Equipment.findAll({
      where: { drummer_id: req.params.drummer_id },
    })
      .then((items) => {
        res.render('items/drummer-equipments', { items });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return {
    allEquipment,
  };
}
