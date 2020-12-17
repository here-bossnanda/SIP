const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(plainPassword, salt);

    return hash;
}

module.exports = hashPassword;