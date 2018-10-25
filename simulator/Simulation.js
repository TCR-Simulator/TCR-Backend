import { AgentGroup } from './agents';
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
    this.agentGroups = [];
  }

  run() { // eslint-disable-line class-methods-use-this
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

    // set AgentGroups addresses

    return new Promise(resolve => setTimeout(resolve, 100));
  }

  addAgentGroup(agentType, behaviors, population) {
    const newGroup = new AgentGroup(agentType, behaviors, population);
    this.agentGroups.push(newGroup);
  }
}
