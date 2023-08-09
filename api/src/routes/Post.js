const router = require("express").Router();
const { Dog, Temperament } = require("../db");
const { default: axios } = require("axios");

router.post("/puppy", async (req, res) => {
  try {
    const {
      name,
      height_min,
      weight_min,
      height_max,
      weight_max,
      life_span,
      image,
      temperament,
      createdInDb,
    } = req.body;

    // Validations
    const errors = {};

    // NAME
    if (!name) {
      errors.name = "You must type a name";
    } else if (!/^[a-zA-Z0-9\s]{1,50}$/.test(name)) {
      errors.name =
        "Name must be alphanumeric and have a maximum of 50 characters";
    }

    // WEIGHTS
    if (!weight_min) {
      errors.weight_min = "Type a valid minimal weight number";
    } else if (!/^\d{1,2}$/.test(weight_min)) {
      errors.weight_min = "Weight must have min values. Example: '25'";
    } else if (weight_max && parseInt(weight_min) > parseInt(weight_max)) {
      errors.weight_min = "Min weight cannot be higher than max weight";
    }

    if (!weight_max) {
      errors.weight_max = "Type a valid maxim weight number";
    } else if (!/^\d{1,2}$/.test(weight_max)) {
      errors.weight_max = "Weight must have max values. Example: '25'";
    }

    // HEIGHTS
    if (!height_min) {
      errors.height_min = "Type a valid minimal height number";
    } else if (!/^\d{1,2}$/.test(height_min)) {
      errors.height_min = "Height must have min values. Example: '25'";
    } else if (height_max && parseInt(height_min) > parseInt(height_max)) {
      errors.height_min = "Min height cannot be higher than max height";
    }

    if (!height_max) {
      errors.height_max = "Type a valid maxim height number";
    } else if (!/^\d{1,2}$/.test(height_max)) {
      errors.height_max = "Height must have max values. Example: '25'";
    }

    if (life_span) {
      const lifeSpanValue = parseInt(life_span);
      if (isNaN(lifeSpanValue) || lifeSpanValue <= 0 || lifeSpanValue > 25) {
        errors.life_span = "Life span must be a number between 1 and 25";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(404).json(errors);
    }

    // Continue with creating the dog
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
      createdInDb: true,
    });

    await newRace.addTemperament(temperamentDB);
    console.log("===>", temperamentDB);

    return res.status(200).send({ msg: "successfully created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

// ◥------◥
// l ● ▄ ◉ l
// l‿/ʊ\‿l  WOOF WOOF!
//  l══o══l
// ︳ ︳︳ l⊃
// ఋ︵ ఋ
