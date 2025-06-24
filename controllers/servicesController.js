import Service from '../models/service.js'; // adapte le chemin
import { Categorie } from '../models/categorie.js'; // si besoin de jointure

// ✅ Créer un service
export const createService = async (req, res) => {
  const {
    userId,
    categorieId,
    titre,
    description,
    prix,
    disponible,
    ville,
    images
  } = req.body;

  try {
    if (!userId || !categorieId || !titre || !description || !ville) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const nouveauService = await Service.create({
      userId,
      categorieId,
      titre,
      description,
      prix,
      disponible,
      ville,
      images,
    });

    res.status(201).json({ message: 'Service créé avec succès.', data: nouveauService });
  } catch (error) {
    console.error('Erreur création service:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Lister tous les services
export const getServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['id', 'DESC']] });
    res.status(200).json({ message: 'Liste des services.', Result: services });
  } catch (error) {
    console.error('Erreur récupération services:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Modifier un service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const {
    categorieId,
    titre,
    description,
    prix,
    disponible,
    ville,
    images,
    est_vendu
  } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }

    await service.update({
      categorieId,
      titre,
      description,
      prix,
      disponible,
      ville,
      images,
      est_vendu,
    });

    res.status(200).json({ message: 'Service mis à jour.', data: service });
  } catch (error) {
    console.error('Erreur mise à jour service:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Supprimer un service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }

    await service.destroy();

    res.status(200).json({ message: 'Service supprimé.' });
  } catch (error) {
    console.error('Erreur suppression service:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
