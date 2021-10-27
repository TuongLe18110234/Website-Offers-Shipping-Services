var express = require('express');
var router = express.Router();

/**
 * Assign routers
 */
const demoRouter = require('./rest/demo/demo');
const RegisteredInfoRouter = require('./rest/RegisteredInfo/RegisteredInfoREST');
const ServicePacksRouter = require('./rest/ServicePacks/ServicePacksREST');
const RegisteredSPRouter = require('./rest/RegisteredSP/RegisteredSPREST');
const AddonsRouter = require('./rest/Addons/AddonsREST');
const CouponRouter = require('./rest/Coupon/CouponREST');
const FaresRouter = require('./rest/Fares/FaresREST');


/**
 * Routing
 */
router.use('/demo', demoRouter);
router.use('/RegisteredInfos', RegisteredInfoRouter);
router.use('/ServicePacks', ServicePacksRouter);
router.use('/RegisteredSPs', RegisteredSPRouter);
router.use('/Addons', AddonsRouter);
router.use('/Coupons', CouponRouter);
router.use('/Fares', FaresRouter);

/**
 * Export
 */
module.exports = router;