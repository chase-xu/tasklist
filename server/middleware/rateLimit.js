const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 1000, //one minutes
  max: async (request, response)=>{
      if(request.user) return 20
      else return 6
  },
  message: (req, res)=>{
    if(!req.user){
      return 'You have exceeded the 6 requests in one minute!';
    } else{
      return 'You have exceeded the 20 requests in one minute!'; 
    }
  },
  standardHeaders: true,
});

module.exports = rateLimiterUsingThirdParty