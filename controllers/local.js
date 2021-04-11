const Local = require("../models/local");

exports.createLocal = (req, res, next) => {
    const localReqBody = req.body;

    const local = new Local({
        name: localReqBody.name,
        scoreAverage: 0.0,
        latitude: localReqBody.latitude,
        longitude: localReqBody.longitude,
        roadName: localReqBody.roadName,
        roadNumber: localReqBody.roadNumber,
        zipCode: localReqBody.zipCode,
        city: localReqBody.city,
        state: localReqBody.state,
        country: localReqBody.country
    });
    local.save()
        .then(createdLocal => {
            res.status(201).json({
                message: 'Local ' + localReqBody.name + ' criado.',
                result: createdLocal
            });
        })
        .catch(err => {
            const errorMessage = 'Erro ao criar local: ' + err;
            res.status(500).json({
                message: errorMessage
            });
        });
}

exports.getLocal = (req, res, next) => {
    const localId = req.params.localId;

    Local.findById(localId)
        .then(existingLocal => {
            res.status(200).json({
                message: 'Local ' + existingLocal.name + ' retornado.',
                result: existingLocal
            });
        })
}
