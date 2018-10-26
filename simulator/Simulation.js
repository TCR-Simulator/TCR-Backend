import { AgentType, AgentGroup } from './agents';
import TcrConnection from './TcrConnection';
import { privateToAddressHex } from './utils';

const Ganache = require('ganache-core');
const crypto = require('crypto');

const basePort = 7000;
const highestPort = 8000;
let currentPort = basePort;

const defaultBalance = {
  [AgentType.MAINTAINER]: 500,
  [AgentType.CONTRIBUTOR]: 300,
  [AgentType.USER]: 200,
};

function getPort() {
  if (currentPort < highestPort) {
    currentPort++;
    return currentPort;
  }
  return null;
}

function restoreCurrentPort() {
  currentPort = basePort;
}

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

  init() {
    const port = getPort();
    const serverObj = {
      accounts: this.createAccounts(),
      port,
    };
    this.server = Ganache.server(serverObj);
    this.server.listen(port, (err) => {
      if (err) {
        throw new Error(err.toString());
      }
    });
    const smartContracrAddr = deploySmartContract(port, getMechanismsParam());
    this.tcrConnection = new TcrConnection(port, smartContracrAddr, getContractAbi());
  }

  run() {
    if (!this.server || !this.tcrConnection) {
      throw new Error('.init() must be called before .run() can be called');
    }

    // Do stuff here
  }

  stop() {
    if (this.server) {
      this.server.close();
      restoreCurrentPort();
    }
  }

  addAgentGroup(agentType, behaviors, population) {
    const newGroup = new AgentGroup(agentType, behaviors, population);
    this.agentGroups.push(newGroup);
  }

  createAccounts() {
    const accounts = [];
    for (let i = 0; i < this.agentGroups.length; i++) {
      const addresses = [];
      const balance = defaultBalance[this.agentGroups[i].type];
      for (let j = 0; j < this.agentGroups[i].population; j++) {
        const secretKey = `0x${randomValueHex(64)}`;
        addresses.push(privateToAddressHex(secretKey));
        const account = {
          balance,
          secretKey,
        };
        accounts.push(account);
      }
      this.agentGroups[i].setAddresses(addresses);
    }
    return accounts;
  }
}
