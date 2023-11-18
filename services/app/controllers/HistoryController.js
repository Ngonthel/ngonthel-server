const History = require("../models/history");
const { ObjectId } = require("mongodb");

class HistoryController {
  static async readHistories(req, res, next) {
    try {
      const { id } = req.user;
      const histories = await History.findAll({ userId: new ObjectId(id) });

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }

  static async createHistory(req, res, next) {
    try {
      const { id } = req.user;

      const history = await History.create({
        userId: new ObjectId(id),
        startDate: new Date(),
        endDate: null,
        distance: 0,
        avgSpeed: 0,
        trackLine: [],
      });

      res.status(201).json(history);
    } catch (err) {
      next(err);
    }
  }

  static async updateHistory(req, res, next) {
    try {
      const { id } = req.params;
      const { distance, avgSpeed, trackLine } = req.body;
      console.log({ distance, avgSpeed, trackLine });

      const history = await History.update(
        { _id: new ObjectId(id) },
        {
          $set: {
            endDate: new Date(),
            distance,
            avgSpeed,
            trackLine,
          },
          $currentDate: { lastModifies: true },
        }
      );

      res.status(200).json(history);
    } catch (err) {
      throw err;
    }
  }

  static async readHistoryDetail(req, res, next) {
    try {
      const { id } = req.params;
      const historyDetail = await History.findByPk(new ObjectId(id));

      res.status(200).json(historyDetail);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HistoryController;
