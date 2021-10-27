var express = require('express');
var router = express.Router();

/**
 * Config JSON Parser
 */
// router.use(bodyParser.json());

/**
 * CRUD
 */

// URI: http://localhost:5000/rest/api/v1/demo/demoget/5
router.get('/:id', function(req, res, next) {

    res.send({
        uid: req.params.id,
        name: 'meo',
    });
});


/**
 * Export API module
 */
module.exports = router;