let ride = require('../model/Ride');
let user = require('../model/User');
const rideController = {
    getRideByUsername: async (req, res) => {
        try {
            const email = req.params.email;

            const detail = await ride.find({email: email});

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
            const exist = await user.findOne({ email: data.email });

            if (exist == null) {
                return res.status(404).json({ message: 'User not found' });
            }
            await ride.create(data);
            res.status(201).json({ message: 'Ride created successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
    },
    fareCalculate: async function (req, res) {
        try {
            const {distance} = req.body
            console.log(distance);

            if(distance == null){
                return res.status(400).json({error: 'distance not found'});
            }

            const surgeRate = process.env.SURGE_CHANGE_RATE;

            const car = (distance * surgeRate * process.env.CAR) / 50;
            const tuk = (distance * surgeRate * process.env.TUK) / 50;
            const moto = (distance * surgeRate * process.env.MOTO) / 50;

            res.status(200).json({ 1: car, 2: tuk, 3: moto });
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