// Exemple statique (tu pourras plus tard brancher une base de données)
const fakeServices = [
    { id: 1, name: "Casting mannequin", price: 100 },
    { id: 2, name: "Shooting photo", price: 200 }
  ];
  // Récupérer tous les services
export const getAllServices = (req, res) => {
  res.json(fakeServices);
};

// Créer un nouveau service
export const createService = (req, res) => {
  const newService = req.body;
  newService.id = fakeServices.length + 1;
  fakeServices.push(newService);
  res.status(201).json(newService);
};
  
  // module.exports = elio_servicesController;