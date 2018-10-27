import {
  sleep,
  randomInRange,
  randomIntInRange,
  privateToAddressHex,
  generateSecretKey,
} from './utils';
import { SubmitAction, VoteAction } from './actions';

export const AgentType = {
  MAINTAINER: 'maintainer',
  CONTRIBUTOR: 'contributor',
  USER: 'user',
};

function agentTypeExists(type) {
  return Object.values(AgentType).includes(type);
}

class Agent {
  constructor(secretKey) {
    this.secretKey = secretKey || generateSecretKey();
    this.address = privateToAddressHex(this.secretKey);
  }
}

export class AgentGroup {
  constructor(type, behaviors, population) {
    if (!agentTypeExists(type)) {
      throw new TypeError(`Unrecognized agent type ${type}`);
    }

    this.type = type;
    this.behaviors = behaviors;
    this.agents = Array(population).fill().map(() => new Agent());
  }

  get population() {
    return this.agents.length;
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
      const { address: agentAddress } = this.agents[agentIndex];

      // Generate random action
      const action = this.generateAction(tcrConnection, agentAddress);
      if (action) {
        action.execute();
      }
    }
  }
}
