import { sleep, randomInRange, randomIntInRange, isValidAddress } from './utils';
import { SubmitAction, VoteAction } from './actions';

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

  setAddresses(addresses) {
    if (addresses.length !== this.population) {
      throw new TypeError('Length of addresses array must be equal to population');
    }

    if (addresses.some(address => !isValidAddress(address))) {
      throw new TypeError('All addresses must start with 0x and be 42 chars long');
    }

    if ((new Set(addresses)).size !== addresses.length) {
      throw new TypeError('Addresses cannot contain duplicates');
    }

    this.addresses = addresses;
  }

  generateAction(tcrConnection, initiator) {
    switch (this.type) {
      case AgentType.MAINTAINER: {
        const submission = null; // TODO: pick a pending submission
        const accept = true; // TODO: change this based on agent behavior
        return VoteAction(tcrConnection, initiator, submission, accept);
      }

      case AgentType.CONTRIBUTOR: {
        const submissionQuality = 0.5; // TODO: change this based on agent behavior
        return SubmitAction(tcrConnection, initiator, submissionQuality);
      }

      default:
        return null;
    }
  }

  async startGeneratingActions(tcrConnection) {
    while (true) { // eslint-disable-line no-constant-condition
      const time = randomInRange(2000, 5000); // TODO: change this based on action frequency
      await sleep(time); // eslint-disable-line no-await-in-loop

      // Pick a random agent
      const agentIndex = randomIntInRange(0, this.population);
      const agentAddress = this.addresses[agentIndex];

      // Generate random action
      const action = this.generateAction(tcrConnection, agentAddress);
      if (action) {
        action.execute();
      }
    }
  }
}
