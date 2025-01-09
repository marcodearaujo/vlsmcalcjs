/** @type {import('./Network')} */
const Network = require('./Network')

/**
 * Represents a subnet and performs calculations related to subnetting
 * @class
 */
const Subnet = /** @class */ (function () {
  /**
   * Creates an instance of Subnet
   * @param {number[]} hostsEachSubnet - An array representing the number of hosts for each subnet
   * @param {string} majorNetwork - The major network in CIDR format (e.g., '192.168.0.0/24')
   */
  function Subnet(hostsEachSubnet, majorNetwork) {
    this.networks = new Map()
    this.subnetCreated = 0
    this.power = 0
    this.majorNetworkPrefix = 0
    this.hostsEachSubnet = hostsEachSubnet
    this.majorNetwork = majorNetwork
    this.needed = hostsEachSubnet.length + 1
    this.Network = Network
    this.calculateNetworkDetails()
  }

  /**
   * Returns the number of subnets that were created
   * @returns {number} The number of subnets created
   */
  Subnet.prototype.getSubnetCreated = function () {
    return this.subnetCreated
  }

  /**
   * Validates the subnet based on the major network and the number of required subnets
   * @returns {boolean} True if the subnet is valid, false otherwise
   */
  Subnet.prototype.isValid = function () {
    if (!this.isValidMajorNetwork()) {
      return false
    }

    return this.power <= (30 - this.majorNetworkPrefix)
  }

  /**
   * Returns the list of created networks
   * @returns {import('./Network')[]} An array of Network objects created for each subnet
   */
  Subnet.prototype.getNetworks = function () {
    return Array.from(this.networks.values()) // Convert Map values to an array
  }

  /**
   * Validates the major network (IP address and subnet prefix)
   * @returns {boolean} True if the major network is valid, false otherwise
   */
  Subnet.prototype.isValidMajorNetwork = function () {
    const ip = this.majorNetwork.split('/')
    if (ip.length !== 2) return false

    const [ipAddress, prefix] = ip
    this.majorNetworkPrefix = parseInt(prefix)

    if (isNaN(this.majorNetworkPrefix) || this.majorNetworkPrefix < 0 || this.majorNetworkPrefix > 32) return false

    return this.isValidIPAddress(ipAddress)
  }

  /**
   * Validates an IP address to ensure it is correctly formatted
   * @param {string} ipAddress - The IP address to validate
   * @returns {boolean} True if the IP address is valid, false otherwise
   */
  Subnet.prototype.isValidIPAddress = function (ipAddress) {
    const ipOctets = ipAddress.split('.')
    if (ipOctets.length !== 4) return false

    return ipOctets.every(octet => {
      const num = parseInt(octet)
      return !isNaN(num) && num >= 0 && num <= 255
    })
  }

  /**
   * Calculates the network details, including subnets and their properties
   * This function sorts the subnets, creates networks for each subnet, and calculates the number of subnets needed
   * @returns {void}
   */
  Subnet.prototype.calculateNetworkDetails = function () {
    if (!this.isValid()) return

    let majorNetwork = this.majorNetwork
    this.hostsEachSubnet.sort((a, b) => a - b).reverse()

    this.hostsEachSubnet.forEach(hosts => {
      const network = new this.Network(hosts, majorNetwork)
      this.networks.set(hosts, network)
      majorNetwork = network.getNextNetwork() + '/' + network.getPrefix()
    })

    // Calculate the number of subnets required based on the power
    do {
      this.subnetCreated = Math.pow(2, this.power)
      if (isNaN(this.subnetCreated) || this.needed <= this.subnetCreated) break
      this.power++
    } while (true)
  }

  return Subnet
}())

module.exports = Subnet
