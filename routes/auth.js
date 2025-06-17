import express from 'express';
import multer from 'multer';
import path from 'path';
import { register, logout, login ,admin_login, admin_register } from '../controllers/authController.js';
import { validateUser, validateUserLogin } from '../middlewares/validation.js';
import User from '../models/user.js';
import { Op, Sequelize } from "sequelize";
import Ville from '../models/ville.js';

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateUserLogin, login);
router.post('/admin_login', validateUserLogin, admin_login);
router.post('/admin_register', validateUser, admin_register);
router.post('/logout', logout);


// Configuration de Multer pour le téléchargement des fichiers
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/imageprestataires'); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // Nom unique pour chaque fichier
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif','image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Type de fichier non supporté. Seuls les fichiers JPEG, PNG et GIF sont acceptés.'));
      }
    },
  });

router.put('/profile', upload.single('image'), async (req, res) => {
    try {
        let { nom, email, role, categorie_id, ville_residence_id, intitule_service, description_service } = req.body;
        const userId = req.body.userid;
        
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Si une image est fournie, mettre à jour le champ image, sinon conserver l'ancienne valeur
        let logo = user.logo;
        if (req.file) {
            // Ici, on stocke le nom du fichier uploadé (ou utilisez req.file.path si vous préférez)
            logo = req.file.filename;
        }
        // Mettre à jour les champs si ils sont fournis, sinon conserver l'ancienne valeur
        nom = nom || user.nom;
        // email = email || user.email; // si vous ne souhaitez pas le modifier
        // role = role || user.role;
        categorie_id = categorie_id || user.categorie_id;
        ville_residence_id = ville_residence_id || user.ville_residence_id;
        intitule_service = intitule_service || user.intitule_service;
        description_service = description_service || user.description_service;
        logo = logo || user.logo;
        
        
        
        // Mise à jour de l'utilisateur dans la base de données
        const [updated] = await User.update(
            { 
                nom: nom,
                categorie_id: categorie_id,
                ville_residence_id: ville_residence_id,
                intitule_service: intitule_service,
                description_service: description_service,
                logo: logo
            },
            { where: { id: userId } }
        );
        
        return res.status(200).json({ Status: true, message: "Profil mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Status: false, error: "Erreur lors de la mise à jour du profil" });
    }
});

// Recherche de prestataires
router.get('/search', async (req, res) => {
  const { query, limit = 50 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Le paramètre "query" est requis.' });
  }

  try {
    const prestataires = await User.findAll({
      where: sequelize.literal(`
        MATCH (intitule_service, description_service) AGAINST ('${query}' IN NATURAL LANGUAGE MODE)
      `),
      limit: parseInt(limit, 20),
    });

    res.json(prestataires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la recherche.' });
  }
});

// Route pour récupérer la liste des PRESTATAIRE
router.get('/liste', async (req, res) => {
    
    try {
        const { rows: users, count: totalItems } = await User.findAndCountAll({
          order: [['nom', 'ASC']],
          where: { 
            role: 'Prestataire',
            ville_residence_id: { [Op.gt]: 0 } // Ajout de la condition ville_residence_id > 0
        },
        include: [
                {
                    model: Ville,
                    as: 'ville', // Assurez-vous que l'alias est bien défini dans vos associations Sequelize
                    attributes: ['id', 'nom'] // Sélectionne uniquement l'ID et le nom de la ville
                }
            ],
        });
        res.status(200).json({
            Status: true,
            Result: users,
        });
        console.log(users)
    } catch (err) {
        console.error("Erreur lors de la récupération des prestataires :", err);
        res.status(500).json({
            Status: false,
            Error: `Erreur lors de la récupération des prestataires : ${err.message}`,
        });
    }
});
export default router;
