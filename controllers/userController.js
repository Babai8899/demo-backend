import userData from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

const createUser = async (req, res) => {
    if (!req.body.userId || !req.body.userName || !req.body.password || !req.body.email || !req.body.phone || !req.body.gender || !req.body.address) {
        res.status(400).send({
            status: "fail",
            message: "User id, user name, password, email, phone, gender and address required!!"
        });
        return;
    }

    const id = req.body.userId;

    await userData.findOne({ userId: id }).then(data => {
        if (data) {
            res.status(400).send({
                status: "fail",
                message: "User id already exists!!"
            });
        }
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const user = new userData({
                userId: req.body.userId,
                userName: req.body.userName,
                password: hashedPassword,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                address: req.body.address
            });

            user.save().then(data => {
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
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while checking User id"
        });
    });


}

const logIn = async (req, res) => {
    if (!req.body.userId || !req.body.password) {
        res.status(400).send({
            status: "fail",
            message: "User id and password required!!"
        });
        return;
    }
    const user = new userData({
        userId: req.body.userId,
        password: req.body.password
    });
    await userData.findOne({ userId: user.userId }).then(data => {
        if (data) {
            const passwordMatch = bcrypt.compareSync(user.password, data.password);
            if (passwordMatch) {
                const secretKey = process.env.secretKey;
                const token = jwt.sign({ userId: data.userId }, secretKey, { expiresIn: '1h' });
                console.log(token);
                res.status(200).json({
                    token: token,
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
    const address = req.body.address;
    await userData.findOne({ userId: id }).then(data => {
        if (data) {
            data.phone = phone;
            data.address = address;
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