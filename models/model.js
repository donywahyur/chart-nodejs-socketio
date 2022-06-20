const fs = require("fs");

const loadContact = () => {
  const file = fs.readFileSync("data/data.json", "utf-8");
  const data = JSON.parse(file);
  return data;
};

const getData = () => {
  const data = loadContact();
  return data;
};

function cekDuplikat(nama) {
  const data = loadContact();
  const duplikat = data.find((d) => d.nama === nama);
  if (!duplikat) {
    return false;
  }
  return true;
}

const simpanData = (nama, jk) => {
  const data = loadContact();
  const body = { nama, jk };
  if (cekDuplikat(nama) === true) {
    const filteredData = data.filter((d) => d.nama.toLowerCase() !== nama.toLowerCase());
    filteredData.push(body);
    fs.writeFileSync("data/data.json", JSON.stringify(filteredData));
    return 1;
  } else {
    data.push(body);
    fs.writeFileSync("data/data.json", JSON.stringify(data));
    return 2;
  }
};
module.exports = { getData, simpanData };
