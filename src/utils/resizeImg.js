const Jimp = require("jimp");

async function resize(filename) {
  const image = await (await Jimp.read(`tmp/${filename}`)).resize(250, 250);

  return await image.writeAsync(`public/avatars/${filename}`);
}

module.exports = resize;
