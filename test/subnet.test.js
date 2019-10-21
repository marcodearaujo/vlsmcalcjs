const Subnet = require("./../lib/Subnet.js");

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

var scenario = scenarioFiveSubnet();

test('getSubnetCreated Test Shoud Return Eight When Five Subnet Need', () => {
  subnet = new Subnet(scenario.Item1, scenario.Item2);
  expect(subnet.getSubnetCreated()).toBe(9);
});

test('isValid Should Return False When Prefix Is Not A Valid Number', () => {
  subnet = new Subnet(scenario.Item1, "192.168.72.0/Z");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return False When Subnet Needed Greater Than Available', () => {
  subnet = new Subnet(scenario.Item1, "192.168.72.0/30");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return False When Prefix Not Informed', () => {
  subnet = new Subnet(scenario.Item1, "192.168.72.0");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return False When There IP Is Not Integer', () => {
  subnet = new Subnet(scenario.Item1, "192.168.A.0/30");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return False When IP With Less Than Four Octets', () => {
  subnet = new Subnet(scenario.Item1, "192.168.0/30");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return False When IP Octet Out of Range', () => {
  subnet = new Subnet(scenario.Item1, "192.168.1.256/30");
  expect(subnet.isValid()).toBe(false);
});

test('isValid Should Return True When Subnet Needed Lower Than Available', () => {
  subnet = new Subnet(scenario.Item1, scenario.Item2);
  expect(subnet.isValid()).toBe(true);
});

test('', () => {
  subnet = new Subnet(scenario.Item1, scenario.Item2);
  expect(subnet.getNetworks()[0].getNetwork()).toBe("192.168.72.0");
  expect(subnet.getNetworks()[1].getNetwork()).toBe("192.168.72.64");
  expect(subnet.getNetworks()[2].getNetwork()).toBe("192.168.72.96");
  expect(subnet.getNetworks()[3].getNetwork()).toBe("192.168.72.128");
  expect(subnet.getNetworks()[4].getNetwork()).toBe("192.168.72.144");
});
