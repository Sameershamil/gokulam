const express = require('express');
const router = express.Router();
const SiteData = require('../models/SiteData');
const { z } = require('zod');

// Get site data
router.get('/', async (req, res, next) => {
  try {
    let siteData = await SiteData.findOne();

    if (!siteData) {
      siteData = await SiteData.create({});
    }

    res.json({
      success: true,
      data: siteData.toObject(),
    });
  } catch (err) {
    next(err);
  }
});

// Update site data
router.put('/', async (req, res, next) => {
  try {
    // Validate request body
    const updateData = req.body;
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const siteData = await SiteData.findOneAndUpdate(
      {},
      { $set: updateData },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    res.json({
      success: true,
      data: siteData.toObject(),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
