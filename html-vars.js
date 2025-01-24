const date = new Date();
const time = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()} (Minsk)`;

const htmlVars = {
  class: "",
  versiontime: time,
}

module.exports = htmlVars;