
exports.handlePsqlErrors = (err, req, res, next) => { 
    if (err === '22P02') {
        res.status(400).send({msg: 'bad request'})
    }
    if (err === '23503') { 
        res.status(400).send({msg: 'requested item does not exist' })
    }
    next(err)
}

exports.handleCustomErrors = (err, req, res, next) => { 
    if (err) {
        res.status(err.status).send({msg: err.msg})
    }
    next(err)
}

exports.handleServerErrors = (err, req, res) => { 
    if (err.status) {
        console.log(err, "<<FROM ERROR CONTROLLER")
        res.status(500).send({ msg: 'Server not responding!' })
    } 
}