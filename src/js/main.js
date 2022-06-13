const fileTxt = new XMLHttpRequest();
const path = "https://drive.google.com/file/d/1x4rXysSemXxemLFeBslSpTFpX3kl95pK/view?usp=sharing";

fileTxt.open("GET", path, true);
fileTxt.send(null);
const API_KEY = fileTxt.responseText;
console.log(API_KEY);
