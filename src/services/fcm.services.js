const admin = require("firebase-admin");

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

/**
 * 
 * @param {string} token The users' FCM device token
 * @param {string} title The title of the notification
 * @param {string} body The main content of the notification
 * @returns The response from FCM
 * @author Owen Plimer
 * @version 1.0.0
 */
const sendNotification = async (token, title, body) => {
    const message = {
        notification: {
            title,
            body
        },
        token
    };

    return await admin.messaging().send(message);
}

module.exports = {
    sendNotification,
}