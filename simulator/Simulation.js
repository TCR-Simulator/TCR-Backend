import { AgentType, Maintainer, Contributor, User } from './agents';
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
    this.agents = [];
  }

  static run() {
    const port = Simulation.getPort();
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

  addAgentGroup(agentType, behaviors, count) { // eslint-disable-line
    for (let i = 0; i < count; i++) {
      let agent;
      switch (agentType) {
        case AgentType.MAINTAINER:
          agent = new Maintainer();
          break;
        case AgentType.CONTRIBUTOR:
          agent = new Contributor();
          break;
        case AgentType.USER:
          agent = new User();
          break;
        default:
          throw TypeError(`Unrecognized agent type "${agentType}"`);
      }
      this.agents.push(agent);
    }
  }

  createAccounts(agentsLength) {
    const accounts = [];
    for (let i = 0; i < agentsLength; i++) {
      const accountAddr = randomValueHex(12);
      this.agents[i].accountAddr = accountAddr;
      let balance = 0;
      if (this.agents[i] instanceof Maintainer) {
        balance = defaultBalance.Maintainer;
      } else if (this.agents[i] instanceof Contributor) {
        balance = defaultBalance.Contributor;
      } else {
        balance = defaultBalance.Consumer;
      }
      const account = {
        balance,
        secretKey: accountAddr,
      };
      accounts.push(account);
    }
    return accounts;
  }
}
