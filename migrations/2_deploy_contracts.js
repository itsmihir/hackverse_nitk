const Dbank = artifacts.require("Dbank");

module.exports = function(deployer) {
    deployer.deploy(Dbank);
};