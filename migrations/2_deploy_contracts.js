var MagicCubeToken = artifacts.require("./MagicCubeToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MagicCubeToken);
};