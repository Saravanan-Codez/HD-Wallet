const express = require('express');
const { getKeyPair, healthCheck } = require('../Controllers/key');

const router = express.Router();

router.post('/keys', getKeyPair);
router.get('/health', healthCheck);
module.exports = router;