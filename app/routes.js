var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send('Err in Food Route', err);
        }
        console.log('Get Food from Route', food);
        res.json(food); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/food_items', function (req, res) {
        // use mongoose to get all todos in the database
        getFood(res);
    });

    app.post('/api/food_items', function (req, res) {
        Food.create({
            food:req.body.text,
            price: req.body.price,
            //text: req.body.text,
            done: false
        }, function (err, food) {
            if (err)
                //console.log('route', err);
                res.send(err);
            getFood(res);
        });

    });


    app.delete('/api/food_items/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);
            getFood(res);
        });
    });

    //total order price
    app.get('/api/total', function (req, res) {
        
        Food.find(function (err, food) {
        if (err) {
            res.send('Err in Food Route', err);
        }
        var total = 0;
            for(var i = 0; i < food.length; i++){
            var product = food[i];
            total += (product.price);
             }
            total = total + (0.075*total);
            console.log(total);
            res.json(total);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};