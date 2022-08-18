const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 1000, //one minutes
  max: 4,
  message: 'You have exceeded the 4 requests in one minute!', 
  standardHeaders: true,
});

module.exports = rateLimiterUsingThirdParty