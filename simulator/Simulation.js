import { AgentGroup } from './agents';
import TcrConnection from './TcrConnection';

const Ganache = require('ganache-core');
const crypto = require('crypto');

const basePort = 7000;
const highestPort = 8000;
let currentPort = basePort;

const defaultBalance = {
  Maintainer: 500,
  Contributor: 300,
  Consumer: 200,
};

function getPort() {
  if (currentPort < highestPort) {
    currentPort++;
    return currentPort;
  }
  return null;
}

// function restoreCurrentPort() {
//   currentPort = basePort;
// }

function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len); // return required number of characters
}

function getContractAbi() {}

function getMechanismsParam() {}

function deploySmartContract() {}

export default class Simulation {
  constructor() {
    this.agentGroups = [];
  }

  run() { // eslint-disable-line class-methods-use-this
    const port = getPort();
    // Remember to restore the current port number when all simulations are done.
    const serverObj = {
      accounts: this.createAccounts(this.agents.length),
      port,
    };
    this.server = Ganache.server(serverObj);
    this.server.listen(port, (err) => {
      if (err) {
        throw new Error(err.toString());
      }
    });
    const smartContracrAddr = deploySmartContract(port, getMechanismsParam());
    this.tcrConnection = new TcrConnection(getPort(), smartContracrAddr, getContractAbi());

    return new Promise(resolve => setTimeout(resolve, 100));
  }

  addAgentGroup(agentType, behaviors, population) {
    const newGroup = new AgentGroup(agentType, behaviors, population);
    this.agentGroups.push(newGroup);
  }

  createAccounts(agentsLength) {
    const accounts = [];
    for (let i = 0; i < agentsLength; i++) {
      const addresses = [];
      let balance = 0;
      if (this.agents[i].type === 'maintainer') {
        balance = defaultBalance.Maintainer;
      } else if (this.agents[i].type === 'contributor') {
        balance = defaultBalance.Contributor;
      } else {
        balance = defaultBalance.Consumer;
      }
      for (let j = 0; j < this.agents[i].population; j++) {
        const accountAddr = randomValueHex(12);
        addresses.push(accountAddr);
        const account = {
          balance,
          secretKey: accountAddr,
        };
        accounts.push(account);
      }
      this.agents[i].setAddresses(addresses);
    }
    return accounts;
  }
}
