const getFile = async (file) => {
  const fileInfo = await client.downloadAndSaveMediaMessage(file);
  return {
    file: fileInfo,
    mimetype: fileInfo.mimetype,
  };
};

const jsonFormat = (json) => {
  return JSON.stringify(json, null, 2);
};

module.exports = {
  getFile,
  jsonFormat,
};
