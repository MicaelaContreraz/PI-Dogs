const router = require("express").Router();
const { reqALL } = require("../controllers/ReqData");

/* http://localhost:3001/dogs && http://localhost:3001/dogs/?name="name" */
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const dogsAllData = await reqALL();
  try {
    if (name) {
      /* if query search */
      const dogFilterData = await dogsAllData.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      dogFilterData.length
        ? res.status(200).send(dogFilterData)
        : res.status(400).send("Puppy not found :c");
    } else {
      /* if not query search */
      res.status(200).json(dogsAllData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/* http://localhost:3001/dogs/:id */
router.get("/dogs/:id", async (req, res) => {
  let { id } = req.params;
  const dogsAllData = await reqALL();

  try {
    if (id) {
      let dogFound = await dogsAllData.filter((e) => e.id == id);
      dogFound.length
        ? res.status(200).json(dogFound)
        : res.status(404).send("Puppy not found :c");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;