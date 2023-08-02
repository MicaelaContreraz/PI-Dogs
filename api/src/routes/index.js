const router = require("express").Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const GetDogs = require("./GetDogs");
const GetTemperament = require("./GetTemperament");
const Post = require("./Post");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", GetDogs);
router.use("/", GetTemperament);
router.use("/", Post);

///////////////////////////////////////////////////
module.exports = router;
