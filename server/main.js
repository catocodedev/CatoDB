const settings = require('./internal/settings');
const server = require('./internal/server');

main();
async function main(){
    const setting = await settings.get();
    console.log(setting)
    await server.run(setting);
}