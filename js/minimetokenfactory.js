const MagicCubeTokenFactoryAbi = require('../build/MagicCubeToken.sol').MagicCubeTokenFactoryAbi;
const MagicCubeTokenFactoryByteCode = require('../build/MagicCubeToken.sol').MagicCubeTokenFactoryByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(MagicCubeTokenFactoryAbi, MagicCubeTokenFactoryByteCode);
