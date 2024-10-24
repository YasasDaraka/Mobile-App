let ride = require('../model/Ride');
const rideController = {
    getRideByUsername: async (req, res) => {
        try {
            const email = req.params.email;

            const detail = await ride.findOne({email: email});

            if (detail === null) {
                return res.status(404).json({ message: 'Ride not found' });
            }
            res.status(200).json(detail);
        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
    addRide: async function (req, res) {
        try {
            const data = req.body
            console.log(data);
            const exist = await ride.findOne({ email: data.email });

            if (exist !== null) {
                return res.status(409).json({ message: 'Ride already exists' });
            }
            await ride.create(data);
            res.status(201).json({ message: 'Ride created successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    removeRide: async function (req, res) {
        try {
            const email = req.query.email;
            const result = await ride.deleteOne({email: email});

            if (result.deletedCount == 0) {
                return res.status(404).json({error: 'Ride not found'});
            }
            res.status(204).json({message: 'Ride deleted success'});

        } catch (error) {
            console.log("Error ", error);
            res.status(500).json(error);
        }
    },
}
module.exports = rideController;