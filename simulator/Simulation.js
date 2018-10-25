import { AgentType, Maintainer, Contributor, User } from './agents';
import TcrConnection from './TcrConnection';

const Ganache = require('ganache-core');

const basePort = 7000;
const highestPort = 8000;
let currentPort = basePort;

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
}
