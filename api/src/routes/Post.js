const router = require("express").Router();
const { Dog, Temperament } = require("../db");
const { default: axios } = require("axios");

router.post("/puppy", async (req, res) => {
  try{
    const { name, height_min,weight_min,height_max,weight_max, life_span, image, temperament,  createdInDb } = req.body;
    const temperamentDB = await Temperament.findAll({
      where: { name: temperament },
    });

    const newRace = await Dog.create({
      name,
      height_min,
      weight_min,
      height_max,
      weight_max,
      life_span: life_span, 
      image,
      createdInDb: true
    });

    console.log(newRace)
    await newRace.addTemperament(temperamentDB);

    return res.status(200).send({ msg: "successfully created" });
}catch (error) {
    res.status(404).json(error.message)
}
});

module.exports = router;

// ◥------◥
// l ● ▄ ◉ l
// l‿/ʊ\‿l  WOOF WOOF!
//  l══o══l
// ︳ ︳︳ l⊃
// ఋ︵ ఋ
