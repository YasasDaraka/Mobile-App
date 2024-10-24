let user = require('../model/User');
const bcrypt = require('bcrypt');
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
    addUser: async function (req, res) {
        try {
            const data = req.body
            const password = data.password;

            data.password = await bcrypt.hash(password, 10);
            console.log(data);
            const exist = await user.findOne({ email: data.email });

            if (exist !== null) {
                return res.status(409).json({ message: 'User already exists' });
            }
            await user.create(data);
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    updateUser: async function (req, res) {
        try {
            const detail = req.body;

            const exist = await user.findOne({ email: detail.email });

            if (exist == null) {
                return res.status(404).json({ message: 'User not found' });
            }
            detail.password = await bcrypt.hash(detail.password, 10);

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
        try {
            const email = req.query.email;
            const result = await user.deleteOne({email: email});

            if (result.deletedCount == 0) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(204).json({message: 'User deleted success'});

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
}

module.exports = userController;