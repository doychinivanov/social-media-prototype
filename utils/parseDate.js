function parseDate(date){
    const regex = /(?<month>[A-Z][a-z]{2}) (?<day>[0-9]{2}) (?<year>[1-9][0-9]{3})\b/g;
    
    return date.match(regex)[0];
}

module.exports = {parseDate};