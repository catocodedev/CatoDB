exports.sleep = async function (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
exports.clear = function (){
  console.log("\033[2J")
  console.log("\033[H")
}