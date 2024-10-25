const admin = require("firebase-admin");
var express = require('express');
var router = express.Router();


router.get('/',

async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        const newToken = await admin.auth().createCustomToken(decodedToken.uid);

        res.status(200).send({ token: newToken });
    } catch (error) {
        console.error('Error refreshing token', error);
        res.status(401).send({ error: 'Unauthorized' });
    }
}
);

module.exports = router;