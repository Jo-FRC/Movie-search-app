var express = require('express');
var app = express();
var request = require('request');

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('search');
});

//se guardi la url vedi che dopo il .com c'è ?s= questa cosa la aggiungi perchè
//così dice di fare la pagina dell api per trovare cose, mentre &apikey è la key
//a pagamento di Colt
app.get('/results', function(req, res){
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
    request(url, function(err, resp, body){
        if (!err && resp.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(results.Search[0].Title);
            res.render('results', {
                data : data
            });
        } else {
            if(err){
                console.log(err);
            }
        }
    });
});

app.listen(8080, function(){
    console.log('Listenting on 8080');
});
