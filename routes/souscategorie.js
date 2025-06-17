// routes/produitRoutes.js
import express from 'express';
import multer from 'multer';
const upload = multer();
import { Souscategorie } from '../models/index.js';
import { getCategorieLib } from '../services/categorieService.js';
import { getSousCategorie } from '../services/souscategorieService.js';
import sequelize from '../config/database.js';

const router = express.Router();

router.post('/nouveau', upload.none(), async (req, res) => {
    const { libelle, categorie_id, userid } = req.body;
    console.log(req.body)
    try {
        if (!categorie_id) {
            return res.status(400).json({ Status: false, message: 'Veuillez sélectionner la catégorie !' });
        }
        if (!libelle) {
            return res.status(400).json({ Status: false, message: 'Veuillez saisir le libelle de la catégorie !' });
        }
        
        const existingCategorie = await getSousCategorie(categorie_id,libelle);
        if (existingCategorie) {
            return res.status(400).json({ Status: false, message: "Cette sous catégorie existe déjà !" });
        }
        if (!userid) {
            return res.status(400).json({ Status: false, message: 'Utilisateur non spécifié !' });
        }


        const cat = await Souscategorie.create({
            categorie_id : categorie_id,
            libelle : libelle,
            userid,
        });

        res.status(201).json({ Status: true, message: 'Sous catégorie créée avec succès !', Result: cat });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ Status: false, Error: `Erreur serveur : ${err.message}` });
    }
});

// Route pour récupérer la liste des categorie
router.get('/liste', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres page et limit
    const offset = (page - 1) * limit; // Calcul de l'offset
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT 
                s.id AS id,
                s.libelle AS libelle, 
                c.libelle AS clibelle
                FROM souscategories AS s
                INNER JOIN categories AS c ON s.categorie_id = c.id
                ORDER BY s.libelle DESC
            `);

        // Assurez-vous que results est un tableau
        const resultsArray = Array.isArray(results) ? results : (results ? [results] : []);

        console.log(resultsArray);

        res.status(200).json({
            Status: true,
            Result: resultsArray,
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des sous catégories :", err);
        res.status(500).json({
            Status: false,
            Error: `Erreur lors de la récupération des sous catégories : ${err.message}`,
        });
    }
});
// Route pour supprimer un categorie
router.delete('/supprimer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifier si le categorie existe
        const souscategorie = await Souscategorie.findByPk(id);
        if (!souscategorie) {
            return res.status(404).json({
                Status: false,
                message: 'Sous categorie non trouvée.',
            });
        }

        // Supprimer categorie
        await souscategorie.destroy();

        res.status(200).json({
            Status: true,
            message: 'Sous catégorie supprimée avec succès.',
        });
    } catch (err) {
        console.error("Erreur lors de la suppression de la sous catégorie :", err);
        res.status(500).json({
            Status: false,
            Error: `Erreur lors de la suppression de la sous catégorie : ${err.message}`,
        });
    }
});

// Route pour récupérer les sous catégories d'une categorie donnée
router.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { offset = 0, limit = 10, page = 1 } = req.query;

    try {
        let souscategorie, totalItems;

        if (id == 0) {
            ({ rows: souscategorie, count: totalItems } = await Souscategorie.findAndCountAll({
                order: [['libelle', 'ASC']],
                offset: parseInt(offset, 10),
                limit: parseInt(limit, 10),
            }));
        } else if (id > 0) {
            ({ rows: souscategorie, count: totalItems } = await Souscategorie.findAndCountAll({
                where: { categorie_id: id }, // Remplace "categorieId" par le champ correspondant à la categorie dans votre modèle
                order: [['libelle', 'ASC']],
                offset: parseInt(offset, 10),
                limit: parseInt(limit, 10),
            }));
        } else {
            return res.status(400).json({
                Status: false,
                Error: "L'ID doit être un entier positif ou égal à 0."
            });
        }

        res.status(200).json({
            Status: true,
            Result: souscategorie,
            Pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: parseInt(page, 10),
            },
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des sous categories :", err);
        res.status(500).json({
            Status: false,
            Error: `Erreur lors de la récupération des sous categories : ${err.message}`,
        });
    }
});

export { router as souscategorieRouter }