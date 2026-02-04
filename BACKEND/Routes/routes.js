const express = require('express');
const { getKeyPair, healthCheck, derivePath } = require('../Controllers/key');

const router = express.Router();

router.post('/keys', getKeyPair);
router.get('/health', healthCheck);
router.post('/path', derivePath);

module.exports = router;