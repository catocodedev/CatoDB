const settings = require('./internal/settings');
const server = require('./internal/server');

main();
async function main(){
    const setting = await settings.get();
    server.run(setting);
}