import { Souscategorie } from "../models/index.js";

export const getSousCategorie = async (categorie_id, libelle) => {
  return await Souscategorie.findOne({ where: { categorie_id : categorie_id, libelle : libelle } });
};
