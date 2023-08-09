const axios = require("axios");

require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const URL = `${API_URL}?${API_KEY}&addRecipeInformation=true&number=10`;

const { Temperament, Dog } = require("../db");


const reqAPI = async () => {
  const url = await axios.get(URL); // ? fetch version
  
  const apiAttributes = await url.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image.url,
      temperament: e.temperament,
      life_span: e.life_span,
      height: e.height.metric,
      weight: e.weight.metric,
    };
  });
  return apiAttributes;
};

const reqDB = async () => {
  const dbAttributes = await Dog.findAll({
    include: {
      model: Temperament,
      //   attributes: ["name" ...],
      //   through:  {
      //     attributes: [],
      //   },
    },
  });
  // const dbdog = dbAttributes.map(({dataValues}) => {
  //   const temperament = dataValues.temperaments.map(({name}) => name).join(', ')
  //  return {
  //   id: dataValues.id,
  //   name: dataValues.name,
  //   image: dataValues.image,
  //   life_span:`${dataValues.life_span} years`,
  //   height: `${dataValues.height_min} - ${dataValues.height_max}`,
  //   weight: `${dataValues.weight_min} - ${dataValues.weight_max}`,
  //   temperament
  // }
  //})
  
  return dbAttributes;
};

const reqALL = async () => {
  const apiAttributes = await reqAPI();
  const dbAttributes = await reqDB();
  const totalAttributes = apiAttributes.concat(dbAttributes);
  return totalAttributes;
};

const reqEachTemperament = async () => {
  const url = await axios.get(URL);

  const everyTemperament = url.data
    .map((att) =>
      att.temperament ? att.temperament : "Temperaments not found"
    )
    .map((temp) => temp?.split(", "));

  const eachTemperament = [...new Set(everyTemperament.flat())];

  eachTemperament.forEach(async (e) => {
    if (e) {
      await Temperament.findOrCreate({
        where: { name: e },
      });
    }
  });

  const allTemperaments = await Temperament.findAll();
  return allTemperaments;
};

module.exports = {
  reqAPI,
  reqDB,
  reqALL,
  reqEachTemperament,
};

//                      __
//                    .'  '.
//                _.-'/  |  \
//    ,       _.-"  ,|  /  0 `-.
//   |\    .-"       `--""-.__.'=====================-,
//   \ '-'`        .___.--._)=========================|
//    \            .'      |                          |
//     |     /,_.-'        |         GIVE ME          |
//   _/   _.'(             |          SOME            |
//  /  ,-' \  \            |       <DATA> uwu         |
//  \  \    `-'            |                          |
//   `-'                   '--------------------------'
