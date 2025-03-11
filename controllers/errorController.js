
exports.handlePsqlErrors = (err, req, res, next) => { 
    if (err.code === '22P02') {
        res.status(400).send({msg: 'bad request'})
    }
    next(err)
}

exports.handleserverError = (err, req, res, next) => { 
    if (err.status) {
        res.status(500).send({ msg: 'Server not responding!' })
    } 
}