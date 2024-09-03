const sendDirections = require("../services/tremService");

const sendDirectionsController = async (req, res) => {
  try {
    const directions = req.body;
    const result = await sendDirections(directions);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = sendDirectionsController;
