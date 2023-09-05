function reqListener(){
  console.log(this.responseText);
  console.log(this);
}
function handleProgress(oEvent){
  console.log(oEvent);
  console.log((oEvent.loaded/oEvent.total)/100);
}
const oReq = new XMLHttpRequest();
oReq.addEventListener("load",reqListener);
oReq.addEventListener("progress",handleProgress);
oReq.open("GET","./sample.txt");
oReq.send();