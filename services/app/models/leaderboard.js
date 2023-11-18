const { getDb } = require("../config/config");
const getTimer = require('../helpers/Timmer/get-timmer')

class Leaderboard {
    static async leaderboards() {
        const db = await getDb();
        const collection = await db.collection("leaderboards");
        return collection;
    }
    static async findOne(idUser) {
        try {
            const collection = await this.users();
            const findLeaderBoardById = await collection.findOne({ idUser });

            return findLeaderBoardById;
        } catch (err) {
            throw err;
        }
    }
    static async create(idUser, time) {
        try {
            let leaderboardTime
            const leaderboardsCollection = await this.leaderboards();
            const isLeaderBoardUserExists = (await leaderboardsCollection.findOne({ idUser }))
            if (isLeaderBoardUserExists ? true : false) {
                leaderboardTime = isLeaderBoardUserExists['leaderboard-time']+time
                await leaderboardsCollection.updateOne({ idUser }, { $set: { "leaderboard-time":leaderboardTime } })
            } else {
                await leaderboardsCollection.insertOne({
                    idUser,
                    "leaderboard-time": getTimer(time)
                });
                leaderboardTime = time
            }
            return leaderboardTime
        } catch (err) {
            throw err;
        }
    }
}
module.exports = Leaderboard