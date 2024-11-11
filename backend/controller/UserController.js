let user = require('../model/User');
let admin = require('../db/Firebase');
const bcrypt = require('bcrypt');
const ride = require("../model/Ride");
const userController = {
    getUserById: async (req, res) => {
        try {
            const email = req.params.email;

            const detail = await user.findOne({email: email});

            if (detail === null) {
                return res.status(404).json({ message: 'user not found' });
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
            let  idToken = null;
            try {

                const userRecord = await admin.auth().createUser({
                    email,
                    password,
                });

                idToken = await admin.auth().createCustomToken(userRecord.uid);

            } catch (error) {
                res.status(400).send({ error: error.message });
                return;
            }
            console.log(data);
            data.password = await bcrypt.hash(password, 10);

            const exist = await user.findOne({ email: data.email });

            if (exist !== null) {
                return res.status(409).json({ message: 'User already exists' });
            }
            await user.create(data);
            res.status(201).send({ customToken: idToken });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    signIn: async function (req, res) {
        const { email, password } = req.body;

        try {
            const exist = await user.findOne({ email: email });

            if (exist == null) {
                return res.status(404).json({ message: 'User not found' });
            }
            let compare = await  bcrypt.compare(password,exist.password);

            if (!compare) {
                console.log(compare)
                console.log(byPassword)
                return res.status(400).json({ message: 'password not match' });
            }

            const userRecord = await admin.auth().getUserByEmail(email);

            const customToken = await admin.auth().createCustomToken(userRecord.uid);

            res.status(200).json({ customToken: customToken });
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed', error });
        }
    },
    updateUser: async function (req, res) {
        try {
            const detail = req.body;

            const exist = await user.findOne({ email: detail.email });

            if (exist == null) {
                return res.status(404).json({ message: 'User not found' });
            }
            detail.password = exist.password;
            console.log(detail)
            const updatedUser = await user.findOneAndUpdate({email: detail.email}, detail, {new: true});
            if (!updatedUser) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(204).json({ message: 'User update successfully' });

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
    removeUser: async function (req, res) {

        const session = await user.startSession();
        session.startTransaction();
        try {
            const email = req.query.email;
            try {
                const userRecord = await admin.auth().getUserByEmail(email);
                await admin.auth().deleteUser(userRecord.uid);

            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    await session.abortTransaction();
                    await session.endSession();
                    return res.status(404).json({ error: 'User not found in firebase' });
                }
                await session.abortTransaction();
                await session.endSession();
                res.status(500).json({ error: 'Error deleting user in firebase' });
                return;
            }

            const result = await user.deleteOne({email: email});

            if (result.deletedCount == 0) {
                await session.abortTransaction();
                await session.endSession();
                return res.status(404).json({error: 'User not found'});
            }
            const rideResult = await ride.deleteOne({email: email});

            if (rideResult.deletedCount == 0) {
                await session.abortTransaction();
                await session.endSession();
                return res.status(404).json({error: 'Ride not found'});
            }
            await session.commitTransaction();
            session.endSession();
            res.status(204).json({message: 'User deleted success'});

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
}

module.exports = userController;