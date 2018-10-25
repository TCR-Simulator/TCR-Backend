import { AgentGroup } from './agents';

export default class Simulation {
  constructor() {
    this.agentGroups = [];
  }

  run() { // eslint-disable-line class-methods-use-this
    // init ganache here

    // deploy smart contract to ganache

    // create TCR connection

    // set AgentGroups addresses

    return new Promise(resolve => setTimeout(resolve, 100));
  }

  addAgentGroup(agentType, behaviors, population) {
    const newGroup = new AgentGroup(agentType, behaviors, population);
    this.agentGroups.push(newGroup);
  }
}
