function errorParser(err){
    if(err.name == 'ValidationError'){
        return Object.values(err.errors).map(e => e.properties.message);
    } else {
        return Array.from(new Set(err.message.split('\n')));
    }
}

module.exports = {errorParser};