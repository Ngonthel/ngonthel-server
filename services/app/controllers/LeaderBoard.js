const responseLeaderBoard = require("../helpers/Timmer/get-timmer")
const leaderboard = require('../models/leaderboard')
const formating = require('../helpers/Timmer/formating-time')
class ControllerLeaderBoard {
    static async start(req,res,next){
        try {
            const data = responseLeaderBoard()
            return res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }
    static async stop(req,res,next){
       try {
            const { date , minute , time } = await responseLeaderBoard(Number(req.body.timeStart))
            const data = await leaderboard.create(req.user.id, time)
            console.log(((70*(20*(minute/60)))*(177/875)))
            return res.status(200).json({
                Timmer:date,
                Kalori:((70*(20*(minute/60)))*(177/875)),
                "leaderboard-time":formating(data).date
            })
       } catch (error) {
            next(error)
       }
    }
}

module.exports = ControllerLeaderBoard