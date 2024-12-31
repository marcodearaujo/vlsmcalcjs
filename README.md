# vlsmcalc
[![npm version](https://badge.fury.io/js/vlsmcalc.svg)](https://npmjs.org/package/vlsmcalc)
[![npm downloads](https://img.shields.io/npm/dm/vlsmcalc.svg)](https://npmjs.org/package/vlsmcalc)
[![Coverage](https://marcodearaujo.github.io/vlsmcalcjs/badges/coverage.svg)](https://github.com/marcodearaujo/vlsmcalcjs/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/marcodearaujo/vlsmcalcjs.svg)](https://github.com/marcodearaujo/vlsmcalcjs/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/marcodearaujo/vlsmcalcjs/pulls)


**vlsmcalc** is a library designed for network administrators and developers to easily calculate Variable Length Subnet Masking (VLSM). It helps you generate optimized subnets for a given major network, considering specific host requirements for each subnet.

---
## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Examples](#examples)
    - [Subnetting Example](#subnetting-example)
    - [Calculating Next Network](#calculating-next-network)
6. [Contributing](#contributing)
7. [License](#license)

## Features
- Dynamically calculates subnets based on host requirements for each subnet.
- Computes subnet masks, network addresses, broadcast addresses, and the first and last usable IPs.
- Validates input major networks and ensures subnet creation is possible.
- **Efficient subnetting**: Optimizes network allocation by calculating the smallest subnet mask that fits the host requirements for each subnet, reducing IP wastage.
- **Scalability**: Supports creating subnets for networks with large IP space and varying host requirements, making it suitable for both small and large networks.
- **Validation**: Automatically checks for errors in input, such as insufficient IP space or invalid CIDR notation.

## Prerequisites

Before using **vlsmcalc**, ensure that you have:

- **Node.js** (version 12 or higher) installed. [Download Node.js](https://nodejs.org/)
- A package manager such as **npm** or **yarn**:
    - To install **npm**, download Node.js from [nodejs.org](https://nodejs.org/).
    - To install **yarn**, follow the instructions on [Yarn's website](https://yarnpkg.com/getting-started/install).


## Installation

To install the library, you can use Yarn or npm:

Using **Yarn**:
```bash
yarn add vlsmcalc
```
Using **npm**:
```bash
npm install vlsmcalc
```

### Local Development Setup

To get started with local development, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/project-name.git
```
2. Install the project dependencies:
```bash
yarn install
```
3. Run the tests:
```bash
yarn test
```

## Usage

Here's an example of how to use **vlsmcalc**:

```javascript
const Subnet = require('vlsmcalc');

// Define the major network and hosts per subnet
const majorNetwork = '192.168.1.0/24'; 
const hostsEachSubnet = [50, 20, 10]; 

// Instantiate the Subnet class with host requirements and major network
const subnetCalc = new Subnet(hostsEachSubnet, majorNetwork);

// Validate if subnetting is possible
if (subnetCalc.isValid()) {
    const networks = subnetCalc.getNetworks();
    networks.forEach((network, index) => {
        console.log(`Subnet ${index + 1}:`);
        console.log(`  Network Address: ${network.getNetwork()}`);
        console.log(`  Subnet Mask: ${network.getSubnetMask()}`);
        console.log(`  Broadcast Address: ${network.getBroadcast()}`);
        console.log(`  First Usable IP: ${network.getFirstIP()}`);
        console.log(`  Last Usable IP: ${network.getLastIP()}`);
        console.log(`  Prefix: /${network.getPrefix()}`);
        console.log(`  Allocated Size: ${network.getAllocatedSize()} hosts`);
    });
} else {
    console.log('Invalid major network or insufficient space for requested subnets.');
}

```

### Error Handling

For improved reliability, you can include error handling to catch invalid inputs or unexpected issues:

```javascript
try {
    if (subnetCalc.isValid()) {
        const networks = subnetCalc.getNetworks();
        // Continue as above...
    } else {
        console.log('Invalid major network or insufficient space for requested subnets.');
    }
} catch (error) {
    console.error('Error during subnet calculation:', error);
}
```


## Examples

### Subnetting Example

```javascript
const VLSMCalc = require('vlsmcalc');

let hostsEachSubnet = [500, 250, 100, 50];  // Hosts required for each subnet
let majorNetwork = '192.168.0.0/24';        // Major network in CIDR notation

// Create subnet calculation
let subnet = new VLSMCalc(hostsEachSubnet, majorNetwork);

// Get networks (subnets)
let networks = subnet.getNetworks();

// Output network details
networks.forEach(network => {
    console.log(`Network: ${network.getNetwork()}`);
    console.log(`Subnet Mask: ${network.getSubnetMask()}`);
    console.log(`First IP: ${network.getFirstIP()}`);
    console.log(`Last IP: ${network.getLastIP()}`);
    console.log(`Broadcast: ${network.getBroadcast()}`);
    console.log(`---------------------------------`);
});
```

### Expected Output:
```
Network: 192.168.0.0
Subnet Mask: 255.255.255.0
First IP: 192.168.0.1
Last IP: 192.168.0.254
Broadcast: 192.168.0.255
---------------------------------
Network: 192.168.1.0
Subnet Mask: 255.255.255.128
First IP: 192.168.1.1
Last IP: 192.168.1.126
Broadcast: 192.168.1.127
---------------------------------
Network: 192.168.1.128
Subnet Mask: 255.255.255.192
First IP: 192.168.1.129
Last IP: 192.168.1.190
Broadcast: 192.168.1.191
---------------------------------
Network: 192.168.1.192
Subnet Mask: 255.255.255.224
First IP: 192.168.1.193
Last IP: 192.168.1.222
Broadcast: 192.168.1.223
---------------------------------
```

### Calculating Next Network
```javascript
const { Network } = require('vlsmcalc');

let majorNetwork = '192.168.0.0/24';
let network = new Network(500, majorNetwork);

// Get the next available network after allocation
console.log('Next Network:', network.getNextNetwork());
```
```
Next Network: 192.168.1.0
```

## Contributing

We welcome contributions to this project! If you find any issues or have improvements to suggest, feel free to open an issue or submit a pull request.

Before you contribute, please ensure you check the existing [issues](https://github.com/marcodearaujo/vlsmcalcjs/issues) to avoid duplicates.

To contribute, follow these steps:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your changes.
4. Make your changes and add tests if applicable.
5. Run the tests to ensure everything works:
    ```bash
    yarn test
    ```
6. Create a pull request with a description of your changes.

Your contributions help improve this project, and we appreciate your effort!


### Repository

Find the source code and report issues at: [GitHub Repository](https://github.com/marcodearaujo/vlsmcalcjs).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Created by Marco De Araujo. For more details, visit [marcodearaujo.com](https://marcodearaujo.com/) or connect with me on [LinkedIn](https://www.linkedin.com/in/marcodearaujo).