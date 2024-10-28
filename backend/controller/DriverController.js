let driver = require('../model/Driver');
const bcrypt = require("bcrypt");
const admin = require("../db/Firebase");

const driverController = {
    getDriverById: async (req, res) => {
        try {
            const email = req.params.email;

            const detail = await driver.findOne({email: email});

            if (detail === null) {
                return res.status(404).json({message: 'Driver not found'});
            }
            res.status(200).json(detail);
        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
    signUp: async function (req, res) {
        try {
            const data = req.body
            const password = data.password;
            const email = data.email
            let idToken = null;
            try {

                const driverRecord = await admin.auth().createUser({
                    email,
                    password,
                });

                idToken = await admin.auth().createCustomToken(driverRecord.uid);

            } catch (error) {
                res.status(400).send({error: error.message});
                return;
            }
            console.log(data);
            data.password = await bcrypt.hash(password, 10);

            const exist = await driver.findOne({email: data.email});

            if (exist !== null) {
                return res.status(409).json({message: 'Driver already exists'});
            }
            await driver.create(data);
            res.status(201).send({customToken: idToken});
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    signIn: async function (req, res) {
        const {email, password} = req.body;

        try {
            const exist = await driver.findOne({email: email});

            if (exist == null) {
                return res.status(404).json({message: 'Driver not found'});
            }
            let compare = await bcrypt.compare(password, exist.password);

            if (!compare) {
                console.log(compare)
                console.log(byPassword)
                return res.status(400).json({message: 'password not match'});
            }

            const driverRecord = await admin.auth().getUserByEmail(email);

            const customToken = await admin.auth().createCustomToken(driverRecord.uid);

            res.status(200).json({customToken: customToken});
        } catch (error) {
            res.status(401).json({message: 'Authentication failed', error});
        }
    },
    updateDriver: async function (req, res) {
        try {
            const detail = req.body;

            const exist = await driver.findOne({ email: detail.email });

            if (exist == null) {
                return res.status(404).json({ message: 'Driver not found' });
            }
            detail.password = exist.password;
            detail.vehicle = exist.vehicle;
            console.log(detail)
            const updatedDriver = await driver.findOneAndUpdate({email: detail.email}, detail, {new: true});
            if (!updatedDriver) {
                return res.status(404).json({error: 'Driver not found'});
            }

            res.status(204).json({ message: 'Driver update successfully' });

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
    removeDriver: async function (req, res) {
        try {
            const email = req.query.email;
            try {
                const driverRecord = await admin.auth().getUserByEmail(email);
                await admin.auth().deleteUser(driverRecord.uid);

            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    return res.status(404).json({ error: 'Driver not found in firebase' });
                }
                res.status(500).json({ error: 'Error deleting driver in firebase' });
                return;
            }

            const result = await driver.deleteOne({email: email});

            if (result.deletedCount == 0) {
                return res.status(404).json({error: 'Driver not found'});
            }
            res.status(204).json({message: 'Driver deleted success'});

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
}
module.exports = driverController;