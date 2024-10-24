let driver = require('../model/Driver');
const bcrypt = require("bcrypt");
const driverController = {
    getDriverById: async (req, res) => {
        try {
            const email = req.params.email;

            const detail = await driver.findOne({email: email});

            if (detail === null) {
                return res.status(404).json({ message: 'Driver not found' });
            }
            res.status(200).json(detail);
        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
    addDriver: async function (req, res) {
        try {
            const data = req.body

            const password = data.password;

            data.password = await bcrypt.hash(password, 10);
            console.log(data);
            const exist = await driver.findOne({ email: data.email });

            if (exist !== null) {
                return res.status(409).json({ message: 'Driver already exists' });
            }
            await driver.create(data);
            res.status(201).json({ message: 'Driver created successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    updateDriver: async function (req, res) {
        try {
            const detail = req.body;

            const exist = await driver.findOne({ email: detail.email });

            if (exist == null) {
                return res.status(404).json({ message: 'Driver not found' });
            }
            detail.password = await bcrypt.hash(detail.password, 10);

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