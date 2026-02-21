const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

const verifyJwt = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            error: "A token is required",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userExists = await prisma.user.count({
            where: {
                userId: decoded.userId,
                emailAddress: decoded.emailAddress,
            }
        });

        if (userExists > 0) {
            return res.status(200).json({
                message: "Verified"
            });
        } else {
            return res.status(401).json({
                error: "User not found"
            })
        }
    } catch (err) {
        if (err.name == "TokenExpiredError") {
            return res.status(401).json({
                error: "Token expired"
            })
        }
        
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}

module.exports = {
    verifyJwt,
}