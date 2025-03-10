const { fetchAllTopics } = require("./models")

exports.getAllTopics = (req, res) => {
    fetchAllTopics().then((data) => { 
        if (data.length === 0) {
            res.status(400).send({msg: 'No topics founds' })
        }
        res.status(200).send({topics: data})
    })

}