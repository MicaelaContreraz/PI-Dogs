const router = require("express").Router();
const { reqEachTemperament, reqALL } = require("../controllers/ReqData");

/* http://localhost:3001/temperament */
router.get("/temperament", async (req, res) => {
  const temperamentAllData = await reqEachTemperament();
  res.json(temperamentAllData);
});

/* http://localhost:3001/dog/?temperament=active */
router.get("/dog/", async (req, res) => {
  const temperament = req.query.temperament;
  const everyDog = await reqALL();
  const dogSearchResult = everyDog.filter((dog) => {
    if (temperament === "all") return everyDog;
    else if (dog.temperament) {
      return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
    }
  });
  res.status(200).send(dogSearchResult);
});

module.exports = router;

