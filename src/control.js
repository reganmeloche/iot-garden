
module.exports = function (app) {
    app.get('/api/test', (req, res) => {
        res.status(200).send({test: 1});
    });
}