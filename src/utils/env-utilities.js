const getEnvAsInteger = (variable, defaultValue) => {
    let value = process.env[variable];
    if (!value || value.trim() == '') {
        value = defaultValue;
    }

    const integerValue = parseInt(value, 10);

    return integerValue;
}

module.exports = {
    getEnvAsInteger
}