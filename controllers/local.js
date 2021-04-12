const Local = require('../models/local');

exports.createLocal = (req, res, next) => {
    const localReqBody = req.body;

    const local = new Local({
        name: localReqBody.name,
        scoreAverage: 0.0,
        location: {
            mapPoint: {
                type: 'Point',
                coordinates: [
                    localReqBody.location.longitude,
                    localReqBody.location.latitude
                ]
            },
            roadName: localReqBody.location.roadName,
            roadNumber: localReqBody.location.roadNumber,
            zipCode: localReqBody.location.zipCode,
            city: localReqBody.location.city,
            state: localReqBody.location.state,
            country: localReqBody.location.country,
        }

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
            if (existingLocal) {
                existingLocal
                    .populate('reviews.reviewId')
                    .execPopulate()
                    .then(populatedLocal => {
                        res.status(200).json({
                            message: 'Local ' + existingLocal.name + ' retornado.',
                            result: populatedLocal
                        });
                    });
            } else {
                res.status(404).json({
                    message: 'Local com id ' + localId + ' não encontrado.'
                });
            }
        })
        .catch(err => {
            const errorMessage = 'Erro ao buscar local: ' + err;
            res.status(500).json({
                message: errorMessage
            });
        });
}

exports.getListLocal = (req, res, next) => {
    Local.find()
        .sort({ name: 'asc' })
        .then(locals => {
            res.status(200).json({
                message: 'Locais retornados em ordem alfabética de nome.',
                result: locals
            });
        })
        .catch(err => {
            const errorMessage = 'Erro ao buscar todos os locais: ' + err;
            res.status(500).json({
                message: errorMessage
            });
        });
}

exports.getMapLocal = (req, res, next) => {
    const centerLatitude = req.body.latitude;
    const centerLongitude = req.body.longitude;
    const meterRadius = parseInt(req.body.meterRadius);

    Local.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [centerLongitude, centerLatitude]
                },
                maxDistance: meterRadius,
                distanceField: "distance",
                spherical: true
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Erro ao buscar local por proximidade: ' + err
            });
        } else {
            res.status(200).json({
                message: 'Locais retornados em ordem de proximidade de ' + meterRadius + ' metros.',
                result: data
            });
        }
    });
}
