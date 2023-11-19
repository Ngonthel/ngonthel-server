const Profile = require('../models/profile')
const getTimmer = require('../helpers/Timmer/get-timmer')
const formating = require('../helpers/Timmer/formating-time')

class ProfileController {
    static async register(req, res, next) {
        const { name:NameUser , phoneNumber , address , userId } = req.body
        try {
            const data = {
                userId: userId,
                username: `${NameUser}#${Math.floor(Math.random()*1000)}`, // formatting  use slugging 
                phoneNumber,
                address,
                totalPoint: 0,
                totalDistance: 0,
                totalTime: 0,
                name:NameUser
            }
            Profile.create(data)
            return res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static startGoes(req,res,next) {
        try {
            res.status(201).json({
                time:getTimmer()
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async stopGoes(req,res,next) {
        const { time , distance } = req.body
        const { id } = req.user
        const timmer = getTimmer(Number(time))
        const { minute } = formating(timmer.time)

        // Points formula
        const D = (6 / 10) * distance; // 60% from distance (meters)
        const T = (4 / 10) * time; // 40% from time (seconds)
        const point = (D * T) / 10;

        try {
            const tempData = await Profile.findOne(id)
            const data = {
                totalPoint: tempData.totalPoint+point,
                totalDistance: tempData.totalDistance+Number(distance),
                totalTime:tempData.totalTime+minute
            }
            await Profile.update({userId:id},data)
            return res.status(201).json({
                point: point,
                distance: `${Number(distance)} Meter`,
                time: timmer.date,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController;
