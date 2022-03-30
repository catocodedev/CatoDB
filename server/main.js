const settings = require('./internal/settings');
const server = require('./internal/server');

main();
async function main(){
    try{
    const setting = await settings.get();
    console.log(setting)
    await server.run(setting);
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}