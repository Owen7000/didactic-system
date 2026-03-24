const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const { getNotifications } = require("./getNotifications.controller");

/**
 * A set of values which represent the biomarker values expected by the API
 */
const biomarkerTypes = {
    heartRate: 0,
    steps: 1,
    bloodPressure: 2,
    calories: 3,
    water: 4,
    height: 5,
    weight: 6,
}

/**
 * Upload a set of data to the user record
 * @param {*} req The reqeust
 * @param {*} res The response
 * @returns Response
 */
const uploadData = async (req, res) => {
    const { userApiKey, type, data } = req.body;

    if (!userApiKey || type == null || data == null) {
        console.log(userApiKey);
        console.log(type);
        console.log(data);

        return res.status(400).json({
            message: "A userApiKey, type, and data are required"
        });
    }

    try {
        const decoded = jwt.verify(userApiKey, process.env.JWT_SECRET);
        
        // Try to get a daily record for today
        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        let currentUserDailyRecord = await prisma.dailyRecord.findFirst({
            where: {
                userId: decoded.userId,
                date: {
                    gte: startOfToday,
                    lte: now
                }
            }
        });

        if (currentUserDailyRecord == null) {
            // There is not a daily record for today, so make one
            currentUserDailyRecord = await prisma.dailyRecord.create({
                data: {
                    userId: decoded.userId,
                    date: now
                }
            });
        }

        // From here, currentUserDailyRecord will contain a daily record object, so get it's ID value
        const dailyRecordId = currentUserDailyRecord.dailyRecordId;

        // Now, determine what data is being uplaoded
        // The only data type that has it's own format is blood pressure, so check if we're uploading that, first
        if (type == biomarkerTypes.bloodPressure) {
            // Check that there are two items in data
            if (data.length == 2) {
                // There is the right amount of data, upload it

                const updatedRecord = await prisma.dailyRecord.update({
                    where: {
                        dailyRecordId: dailyRecordId
                    },

                    data: {
                        systolic: data[0],
                        diastolic: data[1]
                    }
                });
            } else {
                return res.status(400).json({
                    "message": `2 numbers expected, but got ${data.length}`
                })
            };
        } else {
            // All data is handled the same for all other biomarkers, so just check that there is one number
            if (!(data.length == 1)) {
                return res.status(400).json({
                    "message": `1 number expected, but got ${data.length}`                   
                });
            };

            // It can be assumed that there is the right dataset now. 

            switch (type) {
                case biomarkerTypes.heartRate:
                    // Create a new userHeartRate record
                    const now = new Date();

                    const userHeartRateRecord = await prisma.userHeartRate.create({
                        data: {
                            dailyRecordId: dailyRecordId,
                            hour: now.getHours(),
                            minute: now.getMinutes(),
                            reading: data[0]
                        }
                    });
                    break;

                case biomarkerTypes.steps: 
                    updatedRecord = await prisma.dailyRecord.update({
                        where: {
                            dailyRecordId: dailyRecordId
                        },

                        data: {
                            steps: data[0]
                        }
                    });
                    break;

                case biomarkerTypes.calories:
                    updatedRecord = await prisma.dailyRecord.update({
                        where: {
                            dailyRecordId: dailyRecordId
                        },

                        data: {
                            calories: data[0]
                        }
                    });
                    break;

                case biomarkerTypes.water:
                    updatedRecord = await prisma.dailyRecord.update({
                        where: {
                            dailyRecordId: dailyRecordId
                        },

                        data: {
                            waterConsumption: data[0]
                        }
                    });
                    break;

                case biomarkerTypes.height: 
                    updatedRecord = await prisma.dailyRecord.update({
                        where: {
                            dailyRecordId: dailyRecordId
                        },

                        data: {
                            height: data[0]
                        }
                    });
                    break;

                case biomarkerTypes.weight: 
                    updatedRecord = await prisma.dailyRecord.update({
                        where: {
                            dailyRecordId: dailyRecordId
                        },

                        data: {
                            weight: data[0]
                        }
                    });
                    break;

                default:
                    return res.status(400).json({
                        "message": `Invalid biomarker type. Expected value between 0 and 7. Got ${type}`
                    })
            }
        }

        return res.status(200).json({
            "message": "Uploaded data"
        })


    } catch (err) {
        console.log(err);

        return res.status(401).json({
            error:"Invalid userApiKey",
            message: err.name
        });
    }
}

module.exports = { uploadData };