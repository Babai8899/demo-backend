import trainData from "../models/trainModel.js";

const findAll = async (req, res) => {
    if (!req.body.sourceStation || !req.body.destinationStation || !req.body.date) {
        res.status(400).send({
            status: "fail",
            message: "Source station, destination station and date required!!"
        });
        return;
    }

    await trainData.find({ sourceStation: req.body.sourceStation, destinationStation: req.body.destinationStation }).then(data => {
        if (data) {
            function dayofweek(d, m, y)
            {
                let t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ];
                y -= (m < 3) ? 1 : 0;
                return ( y + y/4 - y/100 + y/400 + t[m-1] + d) % 7;
            }

            let dayIn = req.body.date.split("-");
            let day = dayofweek(parseInt(dayIn[2]), parseInt(dayIn[1]), parseInt(dayIn[0]));

            console.log(day);

            let trains = [];

            for (const element of data) {
                if (element.runsOn.includes(Math.round(day))) {
                    trains.push(element);
                }
            }
            res.send(trains);
        }
        else {
            res.status(404).send({
                status: "fail",
                message: "Train not found!!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving Train"
        });
    });
}

const createTrain = async (req, res) => {
    const train = new trainData(req.body);
    await train.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while creating Train"
        });
    });
}

export {findAll, createTrain};