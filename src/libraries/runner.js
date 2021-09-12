const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = class Runner{    
    Init(command) {
        try {
            const ps = exec(command,  { stdio: "ignore" });
    
            return ps;
        } catch (error) {
            console.log('Error');
            return null;    
        }
    };
}