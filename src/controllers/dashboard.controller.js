const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

const sendBasicDashboardData = async (req, res) => {
    const { userApiKey } = req.body;

    if (!userApiKey) {
        return res.status(400).json({
            error: "A userApiKey is required",
        });
    }

   try {
    const decoded = jwt.verify(userApiKey, process.env.JWT_SECRET);

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const currentUserDailyRecord = await prisma.dailyRecord.findFirst({
        where: {
            userId: decoded.userId,
            date: {
                gte: startOfToday,
                lte: now
            }
        }
    });

    // Need to also get the heart rate data
    const heartRateRecordLatest = await prisma.userHeartRate.findFirst({
        where: {
            dailyRecordId: currentUserDailyRecord.dailyRecordId
        },

        orderBy: [
            {
                hour: 'desc'
            }, 
            {
                minute: 'desc'
            }
        ]
    })

    if (currentUserDailyRecord != null) {
        return res.status(200).json({
            steps: currentUserDailyRecord.steps,
            calories: currentUserDailyRecord.calories,
            systolic: currentUserDailyRecord.systolic,
            diastolic: currentUserDailyRecord.diastolic,
            heartRate: heartRateRecordLatest.reading
        });
    } else {
        // create a new daily record for today, and return all the values
        const dailyRecord = await prisma.dailyRecord.create({
            data: {
                userId: decoded.userId,
                date: now
            }
        });

        return res.status(200).json({
            steps: dailyRecord.steps,
            calories: dailyRecord.calories,
            systolic: dailyRecord.systolic,
            diastolic: dailyRecord.diastolic
        });
    }

   } catch (err) {
    return res.status(400).json({
        error: err.name
    })
   }
}

module.exports = { sendBasicDashboardData };