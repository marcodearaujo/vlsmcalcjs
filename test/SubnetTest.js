var Assert      = require("./Assert.js");
var Subnet      = require("./../lib/Subnet.js");

function scenarioFiveSubnet()
{
    subnets = [];
    subnets.push(2);
    subnets.push(7);
    subnets.push(15);
    subnets.push(29);
    subnets.push(58);
    return {Item1: subnets, Item2: "192.168.72.0/24"};
}

SubnetTest = [

    function getSubnetCreatedTestShoudReturnEightWhenFiveSubnetNeed()
    {
        var scenario = scenarioFiveSubnet();
        subnet = new Subnet(scenario.Item1, scenario.Item2);
        Assert.AreEqual(8, subnet.getSubnetCreated());
    },


    function isValidShouldShouldReturnFalseWhenPrefixIsNotAValidNumber()
    {
        var scenario = scenarioFiveSubnet();
        subnet = new Subnet(scenario.Item1, "192.168.72.0/Z");
        Assert.IsFalse(subnet.isValid());
    },


    function isValidShouldShouldReturnFalseWhenSubnetNeededGreaterThanAvailable()
    {
        var scenario = scenarioFiveSubnet();
        subnet = new Subnet(scenario.Item1, "192.168.72.0/30");
        Assert.IsFalse(subnet.isValid());
    },


    function isValidShouldShouldReturnTrueWhenSubnetNeededLowerThanAvailable()
    {
        var scenario = scenarioFiveSubnet();
        subnet = new Subnet(scenario.Item1, scenario.Item2);
        Assert.IsTrue(subnet.isValid());
    },


    function getNetworksShouldReturnValidListOfNetworks()
    {
        var scenario = scenarioFiveSubnet();
        subnet = new Subnet(scenario.Item1, scenario.Item2);
        Assert.AreEqual("192.168.72.0", subnet.getNetworks()[0].getNetwork());
        Assert.AreEqual("192.168.72.64", subnet.getNetworks()[1].getNetwork());
        Assert.AreEqual("192.168.72.96", subnet.getNetworks()[2].getNetwork());
        Assert.AreEqual("192.168.72.128", subnet.getNetworks()[3].getNetwork());
        Assert.AreEqual("192.168.72.144", subnet.getNetworks()[4].getNetwork());
    }

]

module.exports = SubnetTest