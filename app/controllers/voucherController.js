const voucherModel = require('../model/voucherModel');
const mongoose = require('mongoose');

//POST 
const createVoucher = (req, resp) => {
        //1 chuan bi
        let bodyReq = req.body;
        //2 validate
        if (!bodyReq.maVoucher) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "maVoucher is required"
            })
        }
        if (!bodyReq.phanTramGiamGia) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "phanTramGiamGia is required"
            });
        }
        if (!(Number.isInteger(bodyReq.phanTramGiamGia) && bodyReq.phanTramGiamGia > 0)) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "phanTramGiamGia is  not valid"
            });
        }

        // 3: thao tac
        let createVoucher = {
            _id: mongoose.Types.ObjectId(),
            maVoucher: bodyReq.maVoucher,
            phanTramGiamGia: bodyReq.phanTramGiamGia,
            ghiChu: bodyReq.ghiChu
        }

        voucherModel.create(createVoucher, (err, data) => {
            if (err) {
                resp.status(500).json({
                    status: "Error 500: Internal server error",
                    message: err.message
                })
            } else {

                resp.status(201).json({
                    status: "Success: Voucher created",
                    data: data
                });
            }
        });
    }
    // GET ALL 
const getAllVoucher = (req, resp) => {
    //1: chuan bi
    //2: validate
    //3: thao tac
    voucherModel.find((err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(201).json({
                status: "Success: Get Voucher success",
                data: data
            });
        }
    });
}

// GET BY ID
const getVoucherById = (req, resp) => {
        //1 chuan bi
        let voucherId = req.params.voucherId;
        //2: validate
        if (!mongoose.Types.ObjectId.isValid(voucherId)) {
            resp.status(400).json({
                status: "Error 400: Bad Request",
                message: "Voucher ID is  not valid"
            });
        }
        //3: thao tac
        voucherModel.findById(voucherId, (err, data) => {
            if (err) {
                resp.status(500).json({
                    status: "Error 500: Internal server error",
                    message: err.message
                })
            } else {

                resp.status(200).json({
                    status: "Success: Get Voucher success",
                    data: data
                });
            }
        });
    }
    // PUT
const updateVoucherById = (req, resp) => {
    //1: chuan bi
    let voucherId = req.params.voucherId;
    let bodyReq = req.body;
    //2: validate
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "Voucher ID is  not valid"
        });
    }
    //3: thao tac
    let updateVoucher = {
        maVoucher: bodyReq.maVoucher,
        phanTramGiamGia: bodyReq.phanTramGiamGia,
        ghiChu: bodyReq.ghiChu
    }
    voucherModel.findByIdAndUpdate(voucherId, updateVoucher, (err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {

            resp.status(200).json({
                status: "Success: Put Voucher success",
                data: data
            });
        }
    });

}

//DELETE
const deleteVoucherById = (req, resp) => {
    //1: chuan bi
    let voucherId = req.params.voucherId;
    //2 : validate
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        resp.status(400).json({
            status: "Error 400: Bad Request",
            message: "Voucher ID is  not valid"
        });
    }
    //3: thao tac
    voucherModel.findByIdAndDelete(voucherId, (err, data) => {
        if (err) {
            resp.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message
            })
        } else {
            resp.status(200).json({
                status: "Success: Delete Voucher success",

            });
        }
    });
}


module.exports = {
    createVoucher,
    getAllVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
}