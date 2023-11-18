const Profile = require('../models/profile')

const responseLeaderBoard = require("../helpers/Timmer/get-timmer")
const formating = require('../helpers/Timmer/formating-time')

class ProfileController {
    static async register(req, res, next) {
        const { name:NameUser , phoneNumber , address , userId , password } = req.body
        try {
            Profile
            return res.status(201).json({
                userId: userId,
                username: `${nameUser}#${Math.floor(Math.random()*1000)}`, // formatting  use slugging 
                phoneNumber,
                address,
                totalPoint: 0,
                totalDistance: 0,
                totalTime: 0,
                name:NameUser
            })
        } catch (error) {
            next(error)
        }
    }
    static startGoes(req,res,next) {
        try {
            res.status(201).json({
                time:Date.now()
            })
        } catch (error) {
            next(error)
        }
    }
    static stopGoes(req,res,next) {
        const { time , distance } = req.body
        const { date , minute } = formating(time)
        try {
            return res.status(201).json({
                point: Math.floor(distance/100),
                distance: `${distance} Meter`,
                time: date,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController;
