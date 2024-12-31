var Network = /** @class */ (function () {
  const MAX_MULTIPLIER = 128

  /**
   * @param {number} size - The size of the network in terms of required IPs.
   * @param {string} majorNetwork - The major network in CIDR notation (e.g., '192.168.0.0/24').
   */
  function Network (size, majorNetwork) {
    this.size = size
    this.majorNetwork = majorNetwork
    this.power = 0
    this.prefix = 32
    this.allocatedSize = 0
    this.networkMultiplier = 1
    this.majorNetworkPrefix = 0
    this.ipOctets = null
    this.octetIndex = null
    this.calculateNetworkDetails()
  }

  /**
   * Returns the needed network size.
   * @returns {number} The size of the network.
   */
  Network.prototype.getNeededSize = function () { return this.size }

  /**
   * Returns the allocated size.
   * @returns {number} The allocated network size.
   */
  Network.prototype.getAllocatedSize = function () { return this.allocatedSize }

  /**
   * Returns the prefix (subnet size).
   * @returns {number} The prefix size.
   */
  Network.prototype.getPrefix = function () { return this.prefix }

  /**
   * Returns the network multiplier.
   * @returns {number} The network multiplier.
   */
  Network.prototype.getNetworkMultiplier = function () { return this.networkMultiplier }

  /**
   * Returns the network mask.
   * @returns {number} The network mask.
   */
  Network.prototype.getMask = function () { return 256 - this.getNetworkMultiplier() }

  /**
   * Returns the major network prefix.
   * @returns {number} The major network prefix.
   */
  Network.prototype.getMajorNetworkPrefix = function () { return this.majorNetworkPrefix }

  /**
   * Returns the subnet mask in dotted-decimal format.
   * @returns {string} The subnet mask.
   */
  Network.prototype.getSubnetMask = function () {
    const mask = this.getMask()
    if (this.prefix < 9) return `${mask}.0.0.0`
    if (this.prefix < 17) return `255.${mask}.0.0`
    if (this.prefix < 25) return `255.255.${mask}.0`
    return `255.255.255.${mask}`
  }

  /**
   * Returns the network address in dotted-decimal notation.
   * @returns {string} The network address.
   */
  Network.prototype.getNetwork = function () {
    if (!this.isValidMajorNetwork()) return ''
    const network = this.ipOctets.slice(0, Math.ceil(this.majorNetworkPrefix / 8))
    const remainingOctets = 4 - network.length
  
    return network.concat(new Array(remainingOctets).fill(0)).join('.')
  }

  /**
   * Returns the next network address by incrementing the current network.
   * @returns {string} The next network address.
   */
  Network.prototype.getNextNetwork = function () {
    let network = this.getNetwork().split('.')

    if (this.getPrefix() > 0 && this.getPrefix() <= 8) {
      this.octetIndex = 0
    }

    if (this.getPrefix() > 8 && this.getPrefix() <= 16) {
      this.octetIndex = 1
    }

    if (this.getPrefix() > 16 && this.getPrefix() <= 24) {
      this.octetIndex = 2
    }

    if (this.getPrefix() > 24) {
      this.octetIndex = 3
    }

    network[this.octetIndex] = (parseInt(network[this.octetIndex]) + this.networkMultiplier).toString()
    return network.join('.')
  }

  /**
   * Returns the broadcast address of the network.
   * @returns {string} The broadcast address.
   */
  Network.prototype.getBroadcast = function () {
    let broadcast = this.ipToInt(this.getNextNetwork())
    broadcast[this.octetIndex]--

    if (this.octetIndex > 0 && this.octetIndex < 3) {
      for (let i = this.octetIndex + 1; i <= 3; i++) {
        broadcast[i] = (broadcast[i] === 0) ? 255 : broadcast[i] - 1
      }
    }

    return broadcast.join('.')
  }

  /**
   * Returns the first usable IP in the network.
   * @returns {string} The first usable IP address.
   */
  Network.prototype.getFirstIP = function () {
    let ip = this.ipToInt(this.getNetwork())
    ip[3]++
    return ip.join('.')
  }

  /**
   * Returns the last usable IP in the network.
   * @returns {string} The last usable IP address.
   */
  Network.prototype.getLastIP = function () {
    let ip = this.ipToInt(this.getBroadcast())
    ip[3]--
    return ip.join('.')
  }

  /**
   * Calculates and updates the network details (e.g., allocated size, network mask, etc.).
   * @returns {void}
   */
  Network.prototype.calculateNetworkDetails = function () {
    if (this.size < 2 || !this.isValidMajorNetwork()) return

    while (this.size > this.allocatedSize - 2) {
      this.power++
      this.prefix--
      this.networkMultiplier *= 2

      if (this.networkMultiplier > MAX_MULTIPLIER) {
        this.networkMultiplier = 1
      }

      this.allocatedSize = Math.pow(2, this.power)
    }
  }

  /**
   * Converts an IP address from dotted-decimal format to an array of integers.
   * @param {string} ip - The IP address in dotted-decimal format.
   * @returns {number[]} The IP address as an array of integers.
   */
  Network.prototype.ipToInt = function (ip) {
    return ip.split('.').map(Number); // Map the split IP to numbers
  }

  /**
   * Validates the major network format and extracts the network and prefix.
   * @returns {boolean} Whether the major network is valid.
   */
  Network.prototype.isValidMajorNetwork = function () {
    let ip = this.majorNetwork.split('/')

    if (!(ip.length === 2)) {
      return false
    }

    this.ipOctets = this.ipToInt(ip[0])

    this.majorNetworkPrefix = parseInt(ip[1])

    if (!(this.ipOctets.length === 4)) {
      return false
    }

    for (let octet in this.ipOctets) {
      if (!(this.ipOctets[octet] >= 0 && this.ipOctets[octet] <= 255)) {
        return false
      }
    }
    return true
  }

  return Network
}())

module.exports = Network
