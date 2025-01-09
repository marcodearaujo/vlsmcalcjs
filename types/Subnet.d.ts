import { Network } from './Network'

export declare class Subnet {
  networks: Map<number, Network>
  subnetCreated: number
  power: number
  majorNetworkPrefix: number
  hostsEachSubnet: number[]
  majorNetwork: string
  needed: number
  Network: typeof Network

  /**
   * Creates an instance of the Subnet class.
   * @param {number[]} hostsEachSubnet - The array of the number of hosts for each subnet.
   * @param {string} majorNetwork - The major network in CIDR notation (e.g., '192.168.0.0/24').
   */
  constructor(hostsEachSubnet: number[], majorNetwork: string)

  /**
   * Returns the total number of subnets created.
   * @returns {number} The total number of subnets.
   */
  getSubnetCreated(): number

  /**
   * Checks if the subnet is valid.
   * @returns {boolean} Whether the subnet is valid.
   */
  isValid(): boolean

  /**
   * Returns an array of the networks created.
   * @returns {Network[]} An array of Network instances.
   */
  getNetworks(): Network[]

  /**
   * Checks if the major network format is valid.
   * @returns {boolean} Whether the major network format is valid.
   */
  isValidMajorNetwork(): boolean

  /**
   * Validates if an IP address is in the correct format.
   * @param {string} ipAddress - The IP address to validate.
   * @returns {boolean} Whether the IP address is valid.
   */
  isValidIPAddress(ipAddress: string): boolean

  /**
   * Calculates the network details based on the subnets.
   * @returns {void}
   */
  calculateNetworkDetails(): void
}
