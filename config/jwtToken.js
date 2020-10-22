module.exports = {
  algorithm: process.env.JWT_ALG,
  audience: process.env.JWT_AUD,
  issuer: process.env.JWT_ISS,
  subject: process.env.JWT_SUB,
};
