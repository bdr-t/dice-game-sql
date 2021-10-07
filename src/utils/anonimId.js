let id = 0;

const anonimId = () => {
  id += 1;
  return id;
};

module.exports = anonimId;
