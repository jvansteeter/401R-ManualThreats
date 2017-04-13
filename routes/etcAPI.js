var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

var connection = {
    host: 'localhost',
    port: 5432,
    database: 'manualthreats',
    user: 'go',
    password: 'gogo2017'
};

var db = pgp(connection);

//
// ETC API
//

router.get('/post', function (req, res)
{
    db.query("select * from post where threat is null offset floor(random()*(select count(*)from post where threat is null)) limit 1").then(function(result)
    {
        res.json(result);
    });
});

router.post('/threat', function(req, res)
{
    db.query("update post set threat = true where uuid = $1", [req.body.uuid]).then(function(result)
    {
        res.sendStatus(200);
    });
});

router.post('/nothreat', function(req, res)
{
    db.query("update post set threat = false where uuid = $1", [req.body.uuid]).then(function(result)
    {
        res.sendStatus(200);
    });
});

module.exports = router;