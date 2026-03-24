const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

const getGraphData = async (req, res) => {
    console.log("graph req.body =", req.body);
    const { userApiKey, type, dateFrame} = req.body;

    if (!userApiKey || type == undefined || !dateFrame ) {
        return res.status(400).json ({
            message: "An api key, type, and dateFrame are required",
        });
    };

    try {
        const decoded = jwt.verify(userApiKey, process.env.JWT_SECRET);

        if (!isBiometricTypeValid(type)) {
            return res.status(400).json({
                message: `Biometric Type must be between 0 and 3, received: ${type}`
            });
        };

        if (!isDateFrameValid(dateFrame)) {
            return res.status(400).json({
                message: `DateFrame must be in the format 'integer...string'. Received: ${dateFrame}`
            });
        };
        const daysToGrab = convertDateFrameToDays(dateFrame);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysToGrab);
        startDate.setHours(0,0,0,0);

        const numericType = Number(type);
        if(numericType === 0){
            const records = await prisma.dailyRecord.findMany({
               where: {
                userId: decoded.userId,
                date: {
                    gte: startDate
                }
               },
               include: {
                userHeartRates: true
               },
               orderBy: {
                date: "asc"
               }
            });
            const labels = [];
            const values = [];
            records.forEach((record) => {
                const sorted = [...record.userHeartRates].sort((a,b) => {
                    if (a.hour !== b.hour) return a.hour - b.hour;
                    return a.minute - b.minute;
                });
                sorted.forEach((row) => {
                    labels.push(`${pad(row.hour)}:${pad(row.minute)}`);
                    values.push(row.reading);
                });
            });
            return res.status(200).json({ labels, values });
        }
        if (numericType === 1) {
            const records = await prisma.dailyRecord.findMany({
                where: {
                    userId: decoded.userId,
                    date: {
                        gte: startDate
                    }
                },
                orderBy: {
                    date: "asc"
                }
            });
            return res.status(200).json({
                labels: records.map((r) => formatDate(r.date)),
                values: records.map((r) => r.steps)
            });
        }
        if (numericType === 2) {
            const records = await prisma.dailyRecord.findMany({
                where: {
                    userId: decoded.userId,
                    date: {
                        gte: startDate
                    }
                },
                orderBy: {
                    date: "asc"
                }
            });
            return res.status(200).json({
                labels: records.map((r) => formatDate(r.date)),
                systolic: records.map((r) => r.systolic),
                diastolic: records.map((r) => r.diastolic)
            });
        }
        if (numericType === 3) {
            const records = await prisma.dailyRecord.findMany({
                where: {
                    userId: decoded.userId,
                    date: {
                        gte: startDate
                    }
                },
                orderBy: {
                    date: "asc"
                }
            });
            return res.status(200).json({
                labels: records.map((r) => formatDate(r.date)),
                values: records.map((r) => r.calories)
            });
        }
        return res.status(400).json({
            message: "Invalid graph type"
        });
    } catch(err) {
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}

/**
 * Check if the supplied type identifier falls within the expected range
 * 
 * @param {string} type Should be a string containing an integer value
 * @returns true if the biometric type identifier is valid, false otherwise
 */
function isBiometricTypeValid(type) {
    return Number(type) <= 3 && Number(type) >= 0;
}

/**
 * Check if the date frame consists of only integers followed by a single character
 * It also checks if the single character is one of the expected values
 * 
 * @param {string} dateFrame 
 * @returns true if the date frame is in a valid format, false otherwise
 */
function isDateFrameValid(dateFrame) {
    const unit = dateFrame.at(-1);
    const numberPart = dateFrame.slice(0,-1);
    return ["d", "w", "m", "y"].includes(unit) && !isNaN(numberPart);
}
function convertDateFrameToDays(dateFrame) {
    const unit = dateFrame.at(-1);
    const numberPart = Number(dateFrame.slice(0, -1));

    switch (unit) {
        case "d": return numberPart;
        case "w": return numberPart * 7;
        case "m": return numberPart * 30;
        case "y": return numberPart * 365;
        default: return 0;
    }
}
function pad(value) {
    return String(value).padStart(2, "0");
}

function formatDate(date) {
    const d = new Date(date);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

module.exports = {
    getGraphData
};