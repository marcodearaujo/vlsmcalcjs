var Network = /** @class */ (function () {
  const MAX_MULTIPLIER = 128;

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

  Network.prototype.getNeededSize = function () { return this.size }

  Network.prototype.getAllocatedSize = function () { return this.allocatedSize }

  Network.prototype.getPrefix = function () { return this.prefix }

  Network.prototype.getNetworkMultiple = function () { return this.networkMultiplier }

  Network.prototype.getMask = function () { return 256 - this.getNetworkMultiple() }

  Network.prototype.getMajorNetworkPrefix = function () { return this.majorNetworkPrefix }

  Network.prototype.getSubnetMask = function () {
    const mask = this.getMask();
    if (this.prefix < 9) return `${mask}.0.0.0`;
    if (this.prefix < 17) return `255.${mask}.0.0`;
    if (this.prefix < 25) return `255.255.${mask}.0`;
    return `255.255.255.${mask}`;
  }

  Network.prototype.getNetwork = function () {
    if (!this.isValidMajorNetwork()) return '';
    const network = this.ipOctets.slice(0, Math.ceil(this.majorNetworkPrefix / 8));
    const remainingOctets = 4 - network.length;
  
    return network.concat(new Array(remainingOctets).fill(0)).join('.');
  }

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

  Network.prototype.getBroadcast = function () {
    let broadcast = this.ipToInt(this.getNextNetwork());
    broadcast[this.octetIndex]--;

    if (this.octetIndex > 0 && this.octetIndex < 3) {
      for (let i = this.octetIndex + 1; i <= 3; i++) {
        broadcast[i] = (broadcast[i] === 0) ? 255 : broadcast[i] - 1;
      }
    }

    return broadcast.join('.');
  }

  Network.prototype.getFirstIP = function () {
    let ip = this.ipToInt(this.getNetwork())
    ip[3]++
    return ip.join('.')
  }

  Network.prototype.getLastIP = function () {
    let ip = this.ipToInt(this.getBroadcast())
    ip[3]--
    return ip.join('.')
  }

  Network.prototype.calculateNetworkDetails = function () {
    if (this.size < 2 || !this.isValidMajorNetwork()) return;

    while (this.size > this.allocatedSize - 2) {
      this.power++;
      this.prefix--;
      this.networkMultiplier *= 2;

      if (this.networkMultiplier > MAX_MULTIPLIER) {
        this.networkMultiplier = 1;
      }

      this.allocatedSize = Math.pow(2, this.power);
    }
  }

  Network.prototype.ipToInt = function (ip) {
    let octet = ip.split('.')
    for (let i in octet) {
      octet[i] = parseInt(octet[i])
    }
    return octet
  }

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
