const express = require('express');

// import Drink router
const { createVoucher, getAllVoucher, getVoucherById, updateVoucherById, deleteVoucherById } = require("../controllers/voucherController");

const router = express.Router();

router.post("/vouchers", createVoucher);

router.get("/vouchers", getAllVoucher);
router.get("/vouchers/:voucherId", getVoucherById);
router.put("/vouchers/:voucherId", updateVoucherById);
router.delete("/vouchers/:voucherId", deleteVoucherById)

module.exports = router;