import { User } from "../models/user.js";
import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Ville from "../models/ville.js";
import Categorie from "../models/categorie.js";
//import { validationResult } from "express-validator"; 

/*export const register = async (req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
    try {
      // Check for existing user
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.status(400).json({ Status: false, Error: "Cette adresse email est déjà lié à un compte utilisateur !" });
      }
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      // Create the user
      const newUser = await User.create({
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
      });
  
      // Generate token
      const token = jwt.sign({ id: newUser.id }, "jwtkey");
  
      // Respond with user data (excluding password)
      const { password, ...userDetails } = newUser.toJSON();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, Error: "Erreur dans l'exécution de la requête" });
    }
  };*/

  export const register = async (req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    try {
        // Vérifier si l'email est déjà utilisé
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(400).json({ Status: false, Error: "Cette adresse email est déjà liée à un compte utilisateur !" });
        }

        // Hachage du mot de passe
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Création de l'utilisateur
        const newUser = await User.create({
            nom: req.body.nom,
            email: req.body.email,
            password: hash,
            role : 2
            //categorie_id: req.body.categorie_id, 
            //ville_residence_id: req.body.ville_residence_id
        });

        // Récupération des infos utilisateur avec les jointures sur Catégorie et Ville
        const userWithDetails = await User.findOne({
            where: { id: newUser.id },
            attributes: { exclude: ["password"] },
            include: [
                { model: Categorie,
                  as: 'categorie', attributes: ["libelle"] },
                { model: Ville,
                  as: 'ville', attributes: ["nom"] }
            ]
        });

        // Génération du token JWT
        const token = jwt.sign({ id: newUser.id }, "jwtkey");

        // Réponse avec les infos utilisateur + cookie token
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(userWithDetails);

    } catch (err) {
        console.error(err);
        res.status(500).json({ Status: false, Error: "Erreur dans l'exécution de la requête" });
    }
};


export const admin_register = async (req, res) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  try {
      // Vérifier si l'email est déjà utilisé
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
          return res.status(400).json({ Status: false, Error: "Cette adresse email est déjà liée à un compte utilisateur !" });
      }

      // Hachage du mot de passe
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // Création de l'utilisateur
      const newUser = await User.create({
          nom: req.body.nom,
          email: req.body.email,
          password: hash,
          role : 1
          //categorie_id: req.body.categorie_id, 
          //ville_residence_id: req.body.ville_residence_id
      });

      // Récupération des infos utilisateur avec les jointures sur Catégorie et Ville
      const userWithDetails = await User.findOne({
          where: { id: newUser.id },
          attributes: { exclude: ["password"] },
          include: [
              { model: Categorie,
                as: 'categorie', attributes: ["libelle"] },
              { model: Ville,
                as: 'ville', attributes: ["nom"] }
          ]
      });

         console.log("userWithDetails")
         console.log(userWithDetails)
      // Génération du token JWT
      const token = jwt.sign({ id: newUser.id }, "jwtkey");

      // Réponse avec les infos utilisateur + cookie token
      res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(userWithDetails);

  } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, Error: "Erreur dans l'exécution de la requête" });
  }
};

//AUTHENTIFICATION UTILISATEUR

/*export const login = async (req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    try {
      // Check for existing user
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      
      console.log('Utilisateur trouvé :', existingUser);

      if (!existingUser) {
        return res.status(400).json({ Status: false, Error: "Utilisateur non trouvé/ Adresse email inexistant !" });
      }
      console.log(existingUser.password)
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ Status: false, Error: "Mot de passe incorrect !" })
            console.log('Mot de passe correct :', isPasswordCorrect);
      // Generate token
      const token = jwt.sign({ id: existingUser.id }, "jwtkey");
      // Respond with user data (excluding password)
      const { password, ...userDetails } = existingUser.toJSON();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ Status: true, ...userDetails });
        console.log(res)
    } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, Error: "Erreur lors de l'exécution de la requete" });
    }
  };

//DECONNEXION
export const logout = (req, res) => {
    try {
      res.clearCookie('token'); // Supprime le cookie contenant le token
      return res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
  };*/

  export const login = async (req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    try {
      // Rechercher l'utilisateur en incluant Ville et Categorie
      const existingUser = await User.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: Ville,
            as: 'ville',
            attributes: ['nom']  // On récupère uniquement le nom de la ville
          },
          {
            model: Categorie,
            as: 'categorie',
            attributes: ['libelle']  // On récupère uniquement le libellé de la catégorie
          }
        ]
      });
      
      console.log('Utilisateur trouvé :', existingUser);
  
      if (!existingUser) {
        return res.status(400).json({ Status: false, Error: "Utilisateur non trouvé/ Adresse email inexistant !" });
      }
      
      console.log(existingUser.password);
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ Status: false, Error: "Mot de passe incorrect !" });
      }
      
      console.log('Mot de passe correct :', isPasswordCorrect);
      
      // Générer le token
      const token = jwt.sign({ id: existingUser.id }, "jwtkey");
      
      // Exclure le mot de passe et renvoyer les données utilisateur, y compris les informations de Ville et Categorie
      const { password, ...userDetails } = existingUser.toJSON();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ Status: true, ...userDetails });
        
      console.log(res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, Error: "Erreur lors de l'exécution de la requete" });
    }
  };

  
  export const admin_login = async (req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    try {
      // Rechercher l'utilisateur en incluant Ville et Categorie
      const existingUser = await Admin.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: Ville,
            as: 'ville',
            attributes: ['nom']  // On récupère uniquement le nom de la ville
          },
          {
            model: Categorie,
            as: 'categorie',
            attributes: ['libelle']  // On récupère uniquement le libellé de la catégorie
          }
        ]
      });
      
      console.log('admin trouvé :', existingUser);
  
      if (!existingUser) {
        return res.status(400).json({ Status: false, Error: "admin non trouvé/ Adresse email inexistant !" });
      }
      
      console.log(existingUser.password);
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ Status: false, Error: "Mot de passe incorrect !" });
      }
      
      console.log('Mot de passe correct :', isPasswordCorrect);
      
      // Générer le token
      const token = jwt.sign({ id: existingUser.id }, "jwtkey");
      
      // Exclure le mot de passe et renvoyer les données utilisateur, y compris les informations de Ville et Categorie
      const { password, ...userDetails } = existingUser.toJSON();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ Status: true, ...userDetails });
        
      console.log(res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ Status: false, Error: "Erreur lors de l'exécution de la requete" });
    }
  };


  //DECONNEXION
export const logout = (req, res) => {
  try {
    res.clearCookie('token'); // Supprime le cookie contenant le token
    return res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
};