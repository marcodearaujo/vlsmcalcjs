var Subnet = /** @class */ (function () {
  function Subnet (hostsEachSubnet, majorNetwork) {
    this.networks = []
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
    return this.networks
  }

  Subnet.prototype.isValidMajorNetwork = function () {
    let ip = this.majorNetwork.split('/')

    if (!(ip.length === 2)) {
      return false
    }

    this.majorNetworkPrefix = parseInt(ip[1])
    if (isNaN(this.majorNetworkPrefix)) {
      return false
    }

    let ipOctets = ip[0].split('.')
    for (let i in ipOctets) {
      ipOctets[i] = parseInt(ipOctets[i])
      if (isNaN(ipOctets[i])) {
        return false
      }
      if (!(ipOctets[i] >= 0 && ipOctets[i] <= 255)) {
        return false
      }
    }

    if (!(ipOctets.length === 4)) {
      return false
    }
    return true
  }

  Subnet.prototype.calculateNetworkDetails = function () {
    if (!this.isValid()) {
      return
    }

    let majorNetwork = this.majorNetwork
    this.hostsEachSubnet = this.hostsEachSubnet.sort((a, b) => b - a)

    for (let i in this.hostsEachSubnet) {
      let hosts = this.hostsEachSubnet[i]
      let network = new this.Network(hosts, majorNetwork)
      this.networks.push(network)
      let prefix = network.getPrefix().toString()
      majorNetwork = network.getNextNetwork() + '/' + prefix
    }

    let loop = true
    while (loop) {
      this.subnetCreated = parseInt(Math.pow(2, this.power))
      if (isNaN(this.subnetCreated) || this.needed <= this.subnetCreated) {
        loop = false
        break
      }
      this.power++
    }
  }

  return Subnet
}())

module.exports = Subnet
