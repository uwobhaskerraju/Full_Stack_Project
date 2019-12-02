function generateKeyValueFromBody(body) {
    const entries = Object.keys(body)
    const inserts = {}
    for (let i = 0; i < entries.length; i++) {
        inserts[entries[i]] = Object.values(body)[i]
    }
    return inserts;
}

const errMsg='[INVALID] Not a valid request'

module.exports = (req, res, next) => {

    var exports = generateKeyValueFromBody(req.body)
    console.log(exports)
    if(!exports.email) return res.send({message:errMsg})
    if(!exports.username) return res.send({message:errMsg})
    if(!exports.password) return res.send({message:errMsg})
    //write validation code here
    next();

};