'use strict';
var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var decode_module = require('./decode');

var decoder = express();

decoder.use(cors());
decoder.use(bodyParser.json());
decoder.use('/', express.static('./public'));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:'P8r8gl1d1ng',
  database: 'decoder',
});

con.connect(function(err){
  if(err){
    console.log("JAAAAJ");
  } else {
  console.log("SIKERULT");
  };
});

decoder.get('/decode/all', function getid(req, resp) {
  con.query('SELECT decoded FROM texts', function(err,rows){
    if(err) {
      console.log(err.toString());
      return;
    }
    var all_texts = [];
    for (var i = 0; i < rows.length; i++){
      all_texts.push(rows[i].decoded);
    }
    resp.send({all: all_texts});
  });
});

decoder.post('/decode', function add(req, resp) {
  if (req.body.text !== '' && req.body.shift !== ''){
    if ( req.body.shift > -25 && req.body.shift < 25 ) {
      con.query('INSERT INTO texts SET ?', [{decoded: decode_module.decode(req.body.text, req.body.shift)}], function(err,res){
        resp.sendsStatus(200);
        resp.send({status: 'ok', text: decode_module.decode(req.body.text, req.body.shift)});
      });
    } else {
      resp.sendsStatus(400);
      resp.send({status: 'error', text: 'Shift is out of bound'});
    };
  };
});

decoder.listen(3000);
