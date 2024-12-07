import userData from "../models/userModel.js";

const createUser = async (req, res) => {
    const user = new userData({
        userId: req.body.userId,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message: "User saved successfully!!",
            user: data
        });
        console.log(data);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while saving User"
        });
    });
}

const logIn = async (req, res) => {
    const user = new userData({
        userId: req.body.userId,
        password: req.body.password
    });
    await userData.findOne({ userId: user.userId }).then(data => {
        if (data) {
            if (data.password === user.password) {
                res.send({
                    message: "User logged in successfully!!",
                    user: data
                });
            } else {
                res.status(401).send({
                    status: "fail",
                    message: "Password incorrect!!"
                });
            }
        } else {
            res.status(404).send({
                status: "fail",
                message: "User not found!!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while logging in User"
        });
    });
}

const findAll = async (req, res) => {
    await userData.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving User"
        });
    });
}

const findOne = async (req, res) => {
    const id = req.params.id;
    await userData.findOne({ userId: id }).then(data => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                status: "fail",
                message: "User not found!!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User"
        });
    });
}

const update = async (req, res) => {
    const id = req.params.id;
    const phone = req.body.phone;
    await userData.findOne({ userId: id }).then(data => {
        if (data) {
            data.phone = phone;
            data.save().then(data => {
                res.send({
                    message: "User updated successfully",
                });
            })
        }
        else {
            res.status(404).send({
                status: "fail",
                message: "User not found!!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while updating User"
        });
    });
}

const remove = async (req, res) => {
    const id = req.params.id;
    await userData.findOne({ userId: id }).then(data => {
        if (data) {
            data.deleteOne().then(data => {
                res.send({
                    message: "User deleted successfully",
                });
            })
        }
        else {
            res.status(404).send({
                status: "fail",
                message: "User not found!!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while deleting User"
        });
    });
}

export { createUser, findAll, findOne, update, remove, logIn };