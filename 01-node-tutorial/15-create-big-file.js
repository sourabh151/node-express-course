const { writeFileSync, write, openSync, createWriteStream } = require("fs");
// createWriteStream();
function writeData() {
  // for (let i = 0; i < 10000; i++) {
  //   write(fd, `hello ${i}`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // }
  console.log(fd);
  for (let i = 0; i < 10000; i++) {
    writeFileSync("./content/big.txt", `hello world ${i}\n`,{flag:'a'});
  }
}
let fd = openSync("./content/big.txt");
console.log("hello world");
writeData();
