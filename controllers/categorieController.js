import { Categorie } from '../models/categorie.js'; // ou ton chemin réel

// ✅ Créer une catégorie
export const createCategorie = async (req, res) => {
  const { libelle, userid } = req.body;

  if (!libelle || !userid) {
    return res.status(400).json({ message: 'Libellé et utilisateur requis.' });
  }

  try {
    const nouvelleCategorie = await Categorie.create({ libelle, userid });
    res.status(201).json({ message: 'Catégorie créée avec succès.', data: nouvelleCategorie });
  } catch (error) {
    console.error('Erreur création catégorie:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Lister toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({ order: [['id', 'DESC']] });
    res.status(200).json({ message: 'Liste des catégories.', Result: categories });
  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Modifier une catégorie
export const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  if (!libelle) {
    return res.status(400).json({ message: 'Le libellé est requis.' });
  }

  try {
    const cat = await Categorie.findByPk(id);

    if (!cat) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    cat.libelle = libelle;
    await cat.save();

    res.status(200).json({ message: 'Catégorie mise à jour.', data: cat });
  } catch (error) {
    console.error('Erreur mise à jour catégorie:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// ✅ Supprimer une catégorie
export const deleteCategorie = async (req, res) => {
  const { id } = req.params;

  try {
    const cat = await Categorie.findByPk(id);

    if (!cat) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await cat.destroy();

    res.status(200).json({ message: 'Catégorie supprimée.' });
  } catch (error) {
    console.error('Erreur suppression catégorie:', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
