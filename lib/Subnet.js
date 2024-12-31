const Subnet = /** @class */ (function () {
  function Subnet (hostsEachSubnet, majorNetwork) {
    this.networks = new Map()
    this.subnetCreated = 0
    this.power = 0
    this.majorNetworkPrefix = 0
    this.hostsEachSubnet = hostsEachSubnet
    this.majorNetwork = majorNetwork
    this.needed = hostsEachSubnet.length + 1
    this.Network = require('./Network.js')
    this.calculateNetworkDetails()
  }

  Subnet.prototype.getSubnetCreated = function () {
    return this.subnetCreated
  }

  Subnet.prototype.isValid = function () {
    if (!this.isValidMajorNetwork()) {
      return false
    }

    return this.power <= (30 - this.majorNetworkPrefix)
  }

  Subnet.prototype.getNetworks = function () {
    return Array.from(this.networks.values())
  }

  Subnet.prototype.isValidMajorNetwork = function () {
    const ip = this.majorNetwork.split('/')

    // Ensure correct format (IP + prefix)
    if (ip.length !== 2) return false

    const [ipAddress, prefix] = ip
    this.majorNetworkPrefix = parseInt(prefix)

    // Validate the prefix is a number and within the correct range
    if (isNaN(this.majorNetworkPrefix) || this.majorNetworkPrefix < 0 || this.majorNetworkPrefix > 32) return false

    return this.isValidIPAddress(ipAddress)
  }

  Subnet.prototype.isValidIPAddress = function (ipAddress) {
    const ipOctets = ipAddress.split('.')
    if (ipOctets.length !== 4) return false

    return ipOctets.every(octet => {
      const num = parseInt(octet)
      return !isNaN(num) && num >= 0 && num <= 255
    })
  };  

  Subnet.prototype.calculateNetworkDetails = function () {
    if (!this.isValid()) return

    let majorNetwork = this.majorNetwork
    this.hostsEachSubnet.sort((a, b) => a - b).reverse()
  
    this.hostsEachSubnet.forEach(hosts => {
      const network = new this.Network(hosts, majorNetwork)
      this.networks.set(hosts, network); // Use the number of hosts as the key
      majorNetwork = network.getNextNetwork() + '/' + network.getPrefix()
    })

    do {
      this.subnetCreated = Math.pow(2, this.power)
      if (isNaN(this.subnetCreated) || this.needed <= this.subnetCreated) break
      this.power++
    } while (true)
  }

  return Subnet
}())

module.exports = Subnet
