var Assert      = require("./Assert.js");
var Network     = require("./../lib/Network.js");

NetworkTest = [
    function getAllocatedSizeTestShouldReturnZeroWhenSizeNeededIsLessThanTwo()
    {
        network = new Network(1, "192.168.10.0/24");
        Assert.AreEqual(0, network.getAllocatedSize());
    },

    /*
     * Size 2 case
     */

    function getAllocatedSizeTestShouldReturnFourWhenSizeNeededAreTwo()
    {
        network = new Network(2, "192.168.10.0/24");
        Assert.AreEqual(4, network.getAllocatedSize());
    },


    function getPrefixTestShouldReturnThirtyWhenSizeNeededAreTwo()
    {
        network = new Network(2, "192.168.10.0/24");
        Assert.AreEqual(30, network.getPrefix());
    },


    function getNetworkMultipleTestShouldReturnFourWhenSizeNeededAreTwo()
    {
        network = new Network(2, "192.168.10.0/24");
        Assert.AreEqual(4, network.getNetworkMultiple());
    },


    function getMaskTestShouldReturnTwoFiveTwoWhenSizeNeededAreTwo()
    {
        network = new Network(2, "192.168.10.0/24");
        Assert.AreEqual(252, network.getMask());
    },


    function getSubnetMaskTestShouldReturnSubnetMaskForPrefixThirtyWhenSizeNeededAreTwo()
    {
        network = new Network(2, "192.168.10.0/24");
        Assert.AreEqual("255.255.255.252", network.getSubnetMask());
    },


    function isValidMajorNetworkShouldReturnFalseWhenDoNotHaveEnoughOctets()
    {
        network = new Network(2, "192.168.0/24");
        Assert.IsFalse(network.isValidMajorNetwork());
    },


    function isValidMajorNetworkShouldReturnFalseWhenItDoNoHavePrefix()
    {
        network = new Network(2, "192.168.0.0");
        Assert.IsFalse(network.isValidMajorNetwork());
    },


    function isValidMajorNetworkShouldReturnFalseWhenInvalidNumbersInformed()
    {
        network = new Network(2, "192.168.256.0/24");
        Assert.IsFalse(network.isValidMajorNetwork());
    },


    function isValidMajorNetworkShouldReturnFalseWhenAlphabetInformed()
    {
        network = new Network(2, "A.B.C.D/24");
        Assert.IsFalse(network.isValidMajorNetwork());
    },


    function isValidMajorNetworkShouldReturnTrueWhenValidDataInformed()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.IsTrue(network.isValidMajorNetwork());
    },


    function getNetworkShouldReturnEmptyWhenInvalidMajorNetworkInformed()
    {
        network = new Network(2, "192.168.1.0");
        Assert.AreEqual("", network.getNetwork());
    },


    function getNetworkShouldReturnMajorNetworkFirstOctetPlusZeros()
    {
        network = new Network(2, "192.168.1.0/8");
        Assert.AreEqual("192.0.0.0", network.getNetwork());
    },


    function getNetworkShouldReturnMajorNetworkTheTwoFirstOctetPlusZeros()
    {
        network = new Network(2, "192.168.1.0/16");
        Assert.AreEqual("192.168.0.0", network.getNetwork());
    },


    function getNetworkShouldReturnMajorNetworkTheThreeFirstOctetPlusZeros()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual("192.168.1.0", network.getNetwork());
    },


    function getNextNetworkShouldReturnCorrectNetworkForTwo()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual("192.168.1.4", network.getNextNetwork());
    },


    function getBroadcastShouldReturnCorrectNetworkForTwo()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual("192.168.1.3", network.getBroadcast());
    },


    function getFirstIPShouldReturnCorrectFirstUsableIPForTwo()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual("192.168.1.1", network.getFirstIP());
    },


    function getLastIPShouldReturnCorrectLastUsableIPForTwo()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual("192.168.1.2", network.getLastIP());
    },


    function getMajorNetworPrefixShouldReturnTwentyFour()
    {
        network = new Network(2, "192.168.1.0/24");
        Assert.AreEqual(24, network.getMajorNetworkPrefix());
    },

    /*
     * Size 1000 case
     */

    function getAllocatedSizeTestShouldReturnFourWhenSizeNeededAreOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual(1024, network.getAllocatedSize());
    },


    function getPrefixTestShouldReturnThirtyWhenSizeNeededAreOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual(22, network.getPrefix());
    },


    function getNetworkMultipleTestShouldReturnFourWhenSizeNeededAreOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual(4, network.getNetworkMultiple());
    },


    function getMaskTestShouldReturnTwoFiveTwoWhenSizeNeededAreOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual(252, network.getMask());
    },


    function getSubnetMaskTestShouldReturnSubnetMaskForTwentyTwoPrefixWhenSizeNeededAreOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual("255.255.252.0", network.getSubnetMask());
    },


    function getNextNetworkShouldReturnCorrectNetworkForOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual("192.168.8.0", network.getNextNetwork());
    },


    function getBroadcastShouldReturnCorrectNetworkForOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual("192.168.7.255", network.getBroadcast());
    },


    function getFirstIPShouldReturnCorrectFirstUsableIPForOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual("192.168.4.1", network.getFirstIP());
    },


    function getLastIPShouldReturnCorrectLastUsableIPForOneThousand()
    {
        network = new Network(1000, "192.168.4.0/22");
        Assert.AreEqual("192.168.7.254", network.getLastIP());
    },


    function getMajorNetworPrefixShouldReturnTwentyTwo()
    {
        network = new Network(1000, "192.168.1.0/22");
        Assert.AreEqual(22, network.getMajorNetworkPrefix());
    },

    /*
     * Size 5000 case
     */

    function getAllocatedSizeTestShouldReturnEightThousandWhenSizeNeededAreFiveThousand()
    {
        network = new Network(5000, "192.168.0.0/16");
        Assert.AreEqual(8192, network.getAllocatedSize());
    },


    function getPrefixTestShouldReturnNineteenWhenSizeNeededAreFiveThousand()
    {
        network = new Network(5000, "192.168.0.0/16");
        Assert.AreEqual(19, network.getPrefix());
    },


    function getNetworkMultipleTestShouldReturnThirtyTwoWhenSizeNeededAreFiveThousand()
    {
        network = new Network(5000, "192.168.0.0/16");
        Assert.AreEqual(32, network.getNetworkMultiple());
    },


    function getMaskTestShouldReturnTwoTwoFourTwoWhenSizeNeededAreFiveThousand()
    {
        network = new Network(5000, "192.168.0.0/16");
        Assert.AreEqual(224, network.getMask());
    },


    function getSubnetMaskTestShouldReturnSubnetMaskForPrefixNineteenWhenSizeNeededAreFiveThousand()
    {
        network = new Network(5000, "192.168.0.0/16");
        Assert.AreEqual("255.255.224.0", network.getSubnetMask());
    },


    function getNextNetworkShouldReturnCorrectNetworkForFiveThousand()
    {
        network = new Network(5000, "192.168.1.0/16");
        Assert.AreEqual("192.168.32.0", network.getNextNetwork());
    },


    function getBroadcastShouldReturnCorrectNetworkForFiveThousand()
    {
        network = new Network(5000, "192.168.1.0/16");
        Assert.AreEqual("192.168.31.255", network.getBroadcast());
    },


    function getLastIPShouldReturnCorrectLastIPForFiveThousand()
    {
        network = new Network(5000, "192.168.4.0/16");
        Assert.AreEqual("192.168.0.1", network.getFirstIP());
    },


    function getLasIPShouldReturnCorrectLastUsableIPForFiveThousand()
    {
        network = new Network(5000, "192.168.4.0/16");
        Assert.AreEqual("192.168.31.254", network.getLastIP());
    },


    function getMajorNetworPrefixShouldReturnSixteen()
    {
        network = new Network(5000, "192.168.4.0/16");
        Assert.AreEqual(16, network.getMajorNetworkPrefix());
    }
];

module.exports = NetworkTest