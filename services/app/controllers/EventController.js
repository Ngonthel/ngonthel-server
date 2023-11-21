const Event = require("../models/event");
const { ObjectId } = require("mongodb");

class EventController {
  static async readEvents(req, res, next) {
    try {
      let { filter } = req.query;

      if (filter === "my-event") {
        const { id } = req.user;
        filter = { createdBy: id };
      } else if (filter === "active") {
        filter = { isActive: true };
      } else if (filter === "inactive") {
        filter = { isActive: false };
      }

      const events = await Event.findAll(filter);
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  static async readEventDetail(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(new ObjectId(id));
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  static async createEvent(req, res, next) {
    try {
      const { name, from, dest, eventDate } = req.body;
      if (!name || !from.altitude || !from.latitude || !from.longtitude || !dest.altitude || !dest.latitude || !dest.longtitude || !eventDate) {
        throw { name: "validation_error", message: "required data" };
      }

      const eventCode = name.split(" ").join("-").toLowerCase() + `-${Math.floor(Math.random() * 100)}`;
      const { id } = req.user;

      const event = await Event.create({
        name,
        eventCode,
        eventDate,
        createdBy: id,
        isActive: true,
        from,
        dest,
      });

      res.status(201).json({ message: `New event "${name}" created successfully!` });
    } catch (err) {
      next(err);
    }
  }

  static async patchEventstatus(req, res, next) {
    try {
      const { id } = req.params;
      const updateEvent = await Event.update(
        { _id: new ObjectId(id) },
        {
          $set: { isActive: false },
          $currentDate: { lastModified: true },
        }
      );

      if (updateEvent.modifiedCount > 0) {
        res.status(200).json({ message: `Event with id "${id}" set to inactive!` });
      } else {
        res.status(200).json({ message: `No event were updated!` });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
