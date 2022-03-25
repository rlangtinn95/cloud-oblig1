const userModel = require('../schema/userModel');

function handleCreate(req, res) {
    var query = req.body;
    var user = new userModel(query);

    user.save()
    .then(() => {res.send({user: user})})
    .catch((error) => {res.status(500).send({error: error})})
}

function handleRead(req, res) {
    var query = req.query;
    userModel.find(query).then((user) => {
        try {
            res.send({user: user});
        } catch(error) {
            res.status(500).send({error: error});
        }
    });
}

function handleUpdate(req, res) {
    var query = req.body;
    var filter = query.filter;
    delete query.filter;
    userModel.findOneAndUpdate(filter, query, (error, user) => {
        if(error)
            res.status(500).send({error: error});
        else
            res.send({user: user});
    });
}

function handleDelete(req, res) {
    var query = req.body;
    var filter = query.filter;
    delete query.filter;
    userModel.findOneAndDelete(filter, query, (error, user) => {
        if(error)
            res.status(500).send({error: error});
        else
            res.send({user: "deleted"});
    });
}

module.exports = (app, jsonParser) => {
    app.post('/user', jsonParser, handleCreate);
    app.get('/user', handleRead);
    app.put('/user', handleUpdate);
    app.delete('/user', handleDelete);
};