
exports.handlePsqlErrors = (err, req, res, next) => { 
    if (err.code === '22P02') {
        console.log(err, "<<FROM ERR HAND")
        res.status(400).send({msg: 'bad request'})
    }
    next(err)
}

exports.handleCustomErrors = (err, req, res, next) => { 
    if(err.status) {
        res.status(err.status).send({msg: err.msg})
    }
}

exports.handleserverError = (err, req, res) => { 
    if (err.status) {
        res.status(500).send({ msg: 'Server not responding!' })
    } 
}