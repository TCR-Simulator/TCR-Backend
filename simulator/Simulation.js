import { AgentType, Maintainer, Contributor, User } from './Agent';

export default class Simulation {
  constructor() {
    this.agents = [];
  }

  static run() {
    // init ganache here

    // deploy smart contract to ganache

    // create TCR connection

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
