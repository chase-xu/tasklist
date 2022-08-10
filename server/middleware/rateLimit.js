const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 1000, //one minutes
  max: 1,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
});

module.exports = rateLimiterUsingThirdParty