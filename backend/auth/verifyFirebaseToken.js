const admin = require('firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split(' ')[1];

    if (!idToken) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        req.user = await admin.auth().verifyIdToken(idToken);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error });
    }
};

module.exports = verifyFirebaseToken;