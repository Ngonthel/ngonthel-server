const Event = require("../models/event");
const { ObjectId } = require("mongodb");

async function updateEventAuthorization(req, res, next) {
  try {
    const { id: eventId } = req.params;
    const { id: userId } = req.user;

    const findEvent = await Event.findByPk(new ObjectId(eventId));
    if (!findEvent) {
      throw { name: "not_found", message: "Error event not found!" };
    }

    if (findEvent.createdBy !== userId) {
      throw { name: "auth_error", message: "Cannot edit an event that belongs to someone else!" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { updateEventAuthorization };
