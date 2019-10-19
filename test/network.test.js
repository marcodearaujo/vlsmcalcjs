const Network = require("./../lib/Network.js");

test('getAllocatedSize Should Return Zero When Size Needed Is Less Than Two', () => {
  network = new Network(1, "192.168.10.0/24");
  expect(network.getAllocatedSize()).toBe(0);
});

test('getAllocatedSize Should Return Four When Size Needed Are Two', () => {
  network = new Network(2, "192.168.10.0/24");
  expect(network.getAllocatedSize()).toBe(4);
});

test('getPrefix Should Return Thirty When Size Needed Are Two', () => {
  network = new Network(2, "192.168.10.0/24");
  expect(network.getPrefix()).toBe(30);
});

test('getNetworkMultiple Test Should Return Four When Size Needed Are Two', () => {
  network = new Network(2, "192.168.10.0/24");
  expect(network.getNetworkMultiple()).toBe(4);
});

test('getMaskTest Should Return Two Five Two When Size Needed Are Two', () => {
  network = new Network(2, "192.168.10.0/24");
  expect(network.getMask()).toBe(252);
});

test('getSubnetMask Test Should Return Subnet Mask For Prefix Thirty When Size Needed Are Two', () => {
  network = new Network(2, "192.168.10.0/24");
  expect(network.getSubnetMask()).toBe("255.255.255.252");
});

test('isValidMajorNetwork Should Return False When Do Not Have Enough Octets', () => {
  network = new Network(2, "192.168.0/24");
  expect(network.isValidMajorNetwork()).toBe(false);
});

test('isValidMajorNetwork Should Return False When It Do No Have Prefix', () => {
  network = new Network(2, "192.168.0.0");
  expect(network.isValidMajorNetwork()).toBe(false);
});

test('isValidMajorNetwork Should Return False When Invalid Numbers Informed', () => {
  network = new Network(2, "192.168.256.0/24");
  expect(network.isValidMajorNetwork()).toBe(false);
});

test('isValidMajorNetwork Should Return False When Alphabet Informed', () => {
  network = new Network(2, "A.B.C.D/24");
  expect(network.isValidMajorNetwork()).toBe(false);
});

test('isValidMajorNetwork Should Return True When Valid Data Informed', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.isValidMajorNetwork()).toBe(true);
});

test('getNetwork Should Return Empty When Invalid Major Network Informed', () => {
  network = new Network(2, "192.168.1.0");
  expect(network.getNetwork()).toBe("");
});

test('getNetwork Should Return Major Network First Octet Plus Zeros', () => {
  network = new Network(2, "192.168.1.0/8");
  expect(network.getNetwork()).toBe("192.0.0.0");
});

test('getNetwork Should Return Major Network The Two First Octet Plus Zeros', () => {
  network = new Network(2, "192.168.1.0/16");
  expect(network.getNetwork()).toBe("192.168.0.0");
});

test('getNetwork Should Return Major Network The Three First Octet Plus Zeros', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getNetwork()).toBe("192.168.1.0");
});

test('getNextNetwork Should Return Correct Network For Two', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getNextNetwork()).toBe("192.168.1.4");
});

test('getBroadcast Should Return Correct Network For Two', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getBroadcast()).toBe("192.168.1.3");
});

test('getFirstIP Should Return Correct First Usable IP For Two', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getFirstIP()).toBe("192.168.1.1");
});

test('getLastIP Should Return Correct Last Usable IP For Two', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getLastIP()).toBe("192.168.1.2");
});

test('getMajorNetwor Prefix Should Return Twenty Four', () => {
  network = new Network(2, "192.168.1.0/24");
  expect(network.getMajorNetworkPrefix()).toBe(24);
});

test('getAllocatedSize Test Should Return Four When Size Needed Are One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getAllocatedSize()).toBe(1024);
});

test('getPrefix Test Should Return Thirty When Size Needed Are One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getPrefix()).toBe(22);
});

test('getNetworkMultiple Test Should Return Four When Size Needed Are One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getNetworkMultiple()).toBe(4);
});

test('getMaskTest Should Return Two Five Two When Size Needed Are One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getMask()).toBe(252);
});

test('getSubnetMask Test Should Return Subnet Mask For Twenty Two Prefix When Size Needed Are One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getSubnetMask()).toBe("255.255.252.0");
});

test('getNextNetwork Should Return Correct Network For One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getNextNetwork()).toBe("192.168.8.0");
});

test('getBroadcast Should Return Correct Network For One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getBroadcast()).toBe("192.168.7.255");
});

test('getFirstIP Should Return Correct First Usable IP For One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getFirstIP()).toBe("192.168.4.1");
});

test('getLastIP Should Return Correct Last Usable IP For One Thousand', () => {
  network = new Network(1000, "192.168.4.0/22");
  expect(network.getLastIP()).toBe("192.168.7.254");
});

test('getMajorNetworPrefix Should Return Twenty Two', () => {
  network = new Network(1000, "192.168.1.0/22");
  expect(network.getMajorNetworkPrefix()).toBe(22);
});

test('getAllocatedSize Test Should Return Eight Thousand When Size Needed Are Five Thousand', () => {
  network = new Network(5000, "192.168.0.0/16");
  expect(network.getAllocatedSize()).toBe(8192);
});

test('getPrefix Test Should Return Nineteen When Size Needed Are Five Thousand', () => {
  network = new Network(5000, "192.168.0.0/16");
  expect(network.getPrefix()).toBe(19);
});

test('getNetworkMultiple Test Should Return Thirty Two When Size Needed Are Five Thousand', () => {
  network = new Network(5000, "192.168.0.0/16");
  expect(network.getNetworkMultiple()).toBe(32);
});

test('getMask Test Should Return Two Twenty-Four When Size Needed Are Five Thousand', () => {
  network = new Network(5000, "192.168.0.0/16");
  expect(network.getMask()).toBe(224);
});

test('getSubnetMask Test Should Return Subnet Mask For Prefix Nineteen When Size Needed Are Five Thousand', () => {
  network = new Network(5000, "192.168.0.0/16");
  expect(network.getSubnetMask()).toBe("255.255.224.0");
});

test('getNextNetwork Should Return Correct Network For Five Thousand', () => {
  network = new Network(5000, "192.168.1.0/16");
  expect(network.getNextNetwork()).toBe("192.168.32.0");
});

test('getBroadcast Should Return Correct Network For Five Thousand', () => {
  network = new Network(5000, "192.168.1.0/16");
  expect(network.getBroadcast()).toBe("192.168.31.255");
});

test('getLastIP Should Return Correct Last IP For Five Thousand', () => {
  network = new Network(5000, "192.168.4.0/16");
  expect(network.getFirstIP()).toBe("192.168.0.1");
});

test('getLasIP Should Return Correct Last Usable IP For Five Thousand', () => {
  network = new Network(5000, "192.168.4.0/16");
  expect(network.getLastIP()).toBe("192.168.31.254");
});

test('getMajorNetworPrefix Should Return Sixteen', () => {
  network = new Network(5000, "192.168.4.0/16");
  expect(network.getMajorNetworkPrefix()).toBe(16);
});

test('getNeededSize Should Return Value Inputed', () => {
  network = new Network(5000, "192.168.4.0/16");
  expect(network.getNeededSize()).toBe(5000);
});

test('getSubnetMask Should Return', () => {
  network = new Network(8388608, "10.0.0.0/8");
  expect(network.getSubnetMask()).toBe("255.0.0.0");
});

test('getSubnetMask Should Return', () => {
  network = new Network(4194304, "10.0.0.0/16");
  expect(network.getSubnetMask()).toBe("255.128.0.0");
});

test('getNetwork Should Return Major Network', () => {
  network = new Network(2, "192.168.0.16/28");
  expect(network.getNetwork()).toBe("192.168.0.16");
});

test('getNextNetwork Should Return Correct Network', () => {
  network = new Network(8388608, "10.0.0.0/8");
  expect(network.getNextNetwork()).toBe("11.0.0.0");
});

test('getNextNetwork Should Return Correct Network', () => {
  network = new Network(4194304, "10.0.0.0/16");
  expect(network.getNextNetwork()).toBe("10.128.0.0");
});
