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
        time: 0,
        distance: 0,
        avgSpeed: 0,
        point: 0,
        caloryBurnt: 0,
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
      const { time, distance, avgSpeed, trackLine } = req.body;

      // Points formula
      const D = (6 / 10) * distance; // 60% from distance (meters)
      const T = (4 / 10) * time; // 40% from time (seconds)
      const point = (D * T) / 10;

      // Calories formula
      const MET = avgSpeed < 4.444 ? 4 : avgSpeed >= 4.444 && avgSpeed <= 5.277 ? 6 : 8;
      const W = 65; // average men weight in Indonesia
      const caloryBurnt = Math.round(MET * W * (time / 3600) * 1000); // cal

      const history = await History.update(
        { _id: new ObjectId(id) },
        {
          $set: {
            endDate: new Date(),
            time,
            distance,
            avgSpeed,
            point,
            caloryBurnt,
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
