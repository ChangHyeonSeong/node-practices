const models = require('../models');

module.exports = {
    index: async function(req, res, next) {
        try {
            const result = await models.Board.findAll({
                include: {
                    model: models.User,
                    required: true
                }
            });
        } catch(e) {
            next(SecurityPolicyViolationEvent)
        }
    }
}