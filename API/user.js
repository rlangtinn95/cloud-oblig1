const userModel = require('../schema/userModel');
const serverTimestamp = require('../timestamp');

function handleCreate(req, res) {
    var receivedTimestamp = Date.now();
    var query = req.body;
    var user = new userModel(query);

    user.save()
    .then(() => {
        res.send({user: user, timestamps: serverTimestamp(receivedTimestamp)})
    })
    .catch((error) => {res.status(500).send({error: error})})
}

function handleRead(req, res) {
    var receivedTimestamp = Date.now();
    var query = req.query;
    userModel.find(query).then((user) => {
        try {
            res.send({user: user, timestamps: serverTimestamp(receivedTimestamp)});
        } catch(error) {
            res.status(500).send({error: error});
        }
    });
}

function handleUpdate(req, res) {
    var receivedTimestamp = Date.now();
    var query = req.body;
    var filter = query.filter;
    delete query.filter;
    userModel.findOneAndUpdate(filter, query, (error, user) => {
        if(error)
            res.status(500).send({error: error});
        else
            res.send({user: user, timestamps: serverTimestamp(receivedTimestamp)});
    });
}

function handleDelete(req, res) {
    var receivedTimestamp = Date.now();
    var query = req.body;
    var filter = query.filter;
    delete query.filter;
    userModel.findOneAndDelete(filter, query, (error, user) => {
        if(error)
            res.status(500).send({error: error});
        else
            res.send({user: "deleted", timestamps: serverTimestamp(receivedTimestamp)});
    });
}

module.exports = (app, jsonParser) => {
    app.post('/user', jsonParser, handleCreate);
    app.get('/user', handleRead);
    app.put('/user', handleUpdate);
    app.delete('/user', handleDelete);
};