const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Property = require("../../Model/Property");
const auth = require("../../middleware/auth");

//@route    POST api/Property
//@desc     Create a Property
//@access   Public (So anyone can access this )
router.post(
  "/",
  [
    auth,
    [
      check("description", "Description is required").isLength({
        min: 20,
        max: 1000,
      }),
      check("price", "Price is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProperty = new Property({
        price: req.body.price,
        description: req.body.description,
        user: req.user.id,
        purpose: req.body.purpose,
        address: req.body.address,
      });

      const Property = await newProperty.save();
      return res.json(Property);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error has Occured");
    }
  }
);

//@route GET api/Propertys
//@desc Get all transacions for the current user
//@acess Private
router.get("/", [auth], async (req, res) => {
  try {
    const properties = await Property.find().sort({
      date: -1,
    });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const Property = await Property.findOne({ id: req.param.id });
    if (!Property) {
      return res.status(404).json({ msg: "Property not found" });
    }
    await Property.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
