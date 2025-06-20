import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// console.log("=== VARIABLES DB ===");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? '✅' : '❌');
console.log("DB_NAME:", process.env.DB_NAME);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Connexion à Railway réussie"))
  .catch((err) => console.error("❌ Erreur de connexion :", err));

export default sequelize;







//const { Sequelize } = require('sequelize');
// import { Sequelize } from 'sequelize'
// //require('dotenv').config();
// import 'dotenv/config';

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }
// );

// export default sequelize;


// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// export default sequelize;
