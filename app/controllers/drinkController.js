// // Import course model vào controller
const drinkModel = require('../model/drinkModel');
//khai bao mongoose
const mongoose = require('mongoose');

// POST
const createDrink = (req, resp) => {
        //1: chuan bi
        let bodyReq = req.body;
        //2: validate
        if (!bodyReq.maNuocUong) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "maNuocUong is required"
            })
        }
        if (!bodyReq.tenNuocUong) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "tenNuocUong is required"
            })
        }
        if (!bodyReq.donGia) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "donGia is required"
            });
        }
        if (!(Number.isInteger(bodyReq.donGia) && bodyReq.donGia > 0)) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "donGia is  not valid"
            });
        }

        // 3: thao tac
        let createDrink = {
            _id: mongoose.Types.ObjectId(),
            maNuocUong: bodyReq.maNuocUong,
            tenNuocUong: bodyReq.tenNuocUong,
            donGia: bodyReq.donGia
        }

        drinkModel.create(createDrink, (err, data) => {
            if (err) {
                resp.status(500).json({
                    status: "Error 500: Internal server error",
                    message: err.message
                })
            } else {

                resp.status(201).json({
                    status: "Success: Drink created",
                    data: data
                });
            }
        })

    }
    // GET ALL
const getAllDrink = (req, resp) => {
    // 1: chuan bi
    // 2: validate
    // 3: thao tac
    drinkModel.find((err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(201).json({
                status: "Success: Get Drinks success",
                data: data
            });
        }
    });

}

// GET BY ID
const getDrinkById = (req, resp) => {
    // 1: chuan bi
    let drinkId = req.params.drinkId;
    //2: validate
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "Drink ID is  not valid"
        });
    }

    //3: thao tac
    drinkModel.findById(drinkId, (err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(200).json({
                status: "Success: Get Drinks success",
                data: data
            });
        }
    })
}

// PUT BY ID
const updateDrinkById = (req, resp) => {
    //1: chuan bi
    let drinkId = req.params.drinkId;
    let bodyReq = req.body;

    // 2: validate
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "Drink ID is  not valid"
        });
    }
    // 3: thao tac
    let drinkUpdate = {
        maNuocUong: bodyReq.maNuocUong,
        tenNuocUong: bodyReq.tenNuocUong,
        donGia: bodyReq.donGia
    }

    drinkModel.findByIdAndUpdate(drinkId, drinkUpdate, (err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(200).json({
                status: "Success: Put Drinks success",
                data: data
            });
        }
    });
}

//DELETE By ID 
const deleteDrinkById = (req, resp) => {
    //1: chuan bi
    let drinkId = req.params.drinkId;
    // 2: validate
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "Drink ID is  not valid"
        });
    }
    // 3: thao tac
    drinkModel.findByIdAndDelete(drinkId, (err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(200).json({
                status: "Success: Delete Drinks success",

            });
        }
    });
}








module.exports = {
    createDrink,
    getAllDrink,
    getDrinkById,
    updateDrinkById,
    deleteDrinkById

}