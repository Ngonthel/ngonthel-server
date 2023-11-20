const History = require("../models/history");
const Profile = require("../controllers/ProfileController");
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
      const point = Math.round((D / T) * 100);

      const history = await History.update(
        { _id: new ObjectId(id) },
        {
          $set: {
            endDate: new Date(),
            time,
            distance,
            avgSpeed,
            point,
            trackLine,
          },
          $currentDate: { lastModifies: true },
        }
      );
      const format = await Profile.stopGoes(req, res, next);
      res.status(200).json({
        acknowledged: history.acknowledged,
        point,
        time: format.date,
      });
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
