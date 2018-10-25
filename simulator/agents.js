export const AgentType = {
  MAINTAINER: 'maintainer',
  CONTRIBUTOR: 'contributor',
  USER: 'user',
};

function agentTypeExists(type) {
  return Object.values(AgentType).includes(type);
}

export class AgentGroup {
  constructor(type, behaviors, population) {
    if (!agentTypeExists(type)) {
      throw new TypeError(`Unrecognized agent type ${type}`);
    }

    this.type = type;
    this.behaviors = behaviors;
    this.population = population;
  }

  setAddresses(newAddresses) {
    if (newAddresses.length !== this.population) {
      throw new TypeError('Length of addresses array must be equal to population');
    }
    this.addresses = newAddresses;
  }
}
