const moment = require('moment');

const deadline = (date) => {
    let change = date.toISOString().split('T')[0];
    let replace = change.replace(/[^0-9\.]+/g, "");

    return moment(replace, "YYYYMMDD").fromNow();
};

module.exports = deadline