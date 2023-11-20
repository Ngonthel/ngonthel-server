const Profile = require('../models/profile')
const formating = require('../helpers/Timmer/formating-time')

class ProfileController {
    
    static async stopGoes(req,res,next) {
        const { time , distance } = req.body
        const { id } = req.user
        const format = formating(time)
        const { minute } = format
        const D = (6 / 10) * distance; // 60% from distance (meters)
        const T = (4 / 10) * time; // 40% from time (seconds)
        const point = Math.round((D / T) * 10);
        try {
            const tempData = await Profile.findOne(id)
            const data = {
                totalPoint: tempData.totalPoint+point,
                totalDistance: tempData.totalDistance+Number(distance),
                totalTime:tempData.totalTime+minute
            }
            await Profile.update(id,data)
            return format
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController;
