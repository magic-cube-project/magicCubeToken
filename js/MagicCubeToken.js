const MagicCubeTokenAbi = require('../build/MagicCubeToken.sol').MagicCubeTokenAbi;
const MagicCubeTokenByteCode = require('../build/MagicCubeToken.sol').MagicCubeTokenByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(MagicCubeTokenAbi, MagicCubeTokenByteCode);
