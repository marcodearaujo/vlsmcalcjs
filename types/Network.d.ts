declare class Network {
  private size: number;
  private majorNetwork: string;
  private power: number;
  private prefix: number;
  private allocatedSize: number;
  private networkMultiplier: number;
  private majorNetworkPrefix: number;
  private ipOctets: number[];
  private octetIndex: number;

  /**
   * @param {number} size - The size of the network in terms of required IPs.
   * @param {string} majorNetwork - The major network in CIDR notation (e.g., '192.168.0.0/24').
   */
  constructor(size: number, majorNetwork: string);

  /**
   * Returns the needed network size.
   * @returns {number} The size of the network.
   */
  getNeededSize(): number;

  /**
   * Returns the allocated size.
   * @returns {number} The allocated network size.
   */
  getAllocatedSize(): number;

  /**
   * Returns the prefix (subnet size).
   * @returns {number} The prefix size.
   */
  getPrefix(): number;

  /**
   * Returns the network multiplier.
   * @returns {number} The network multiplier.
   */
  getNetworkMultiplier(): number;

  /**
   * Returns the network mask.
   * @returns {number} The network mask.
   */
  getMask(): number;

  /**
   * Returns the major network prefix.
   * @returns {number} The major network prefix.
   */
  getMajorNetworkPrefix(): number;

  /**
   * Returns the subnet mask in dotted-decimal format.
   * @returns {string} The subnet mask.
   */
  getSubnetMask(): string;

  /**
   * Returns the network address in dotted-decimal notation.
   * @returns {string} The network address.
   */
  getNetwork(): string;

  /**
   * Returns the next network address by incrementing the current network.
   * @returns {string} The next network address.
   */
  getNextNetwork(): string;

  /**
   * Returns the broadcast address of the network.
   * @returns {string} The broadcast address.
   */
  getBroadcast(): string;

  /**
   * Returns the first usable IP in the network.
   * @returns {string} The first usable IP address.
   */
  getFirstIP(): string;

  /**
   * Returns the last usable IP in the network.
   * @returns {string} The last usable IP address.
   */
  getLastIP(): string;

  /**
   * Calculates and updates the network details (e.g., allocated size, network mask, etc.).
   * @returns {void}
   */
  calculateNetworkDetails(): void;

  /**
   * Converts an IP address from dotted-decimal format to an array of integers.
   * @param {string} ip - The IP address in dotted-decimal format.
   * @returns {number[]} The IP address as an array of integers.
   */
  ipToInt(ip: string): number[];

  /**
   * Validates the major network format and extracts the network and prefix.
   * @returns {boolean} Whether the major network is valid.
   */
  isValidMajorNetwork(): boolean;
}

  export = Network;
