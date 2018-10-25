import { expect } from 'chai';

import Simulation from '../simulator/Simulation';
import { AgentType, Maintainer, Contributor, User } from '../simulator/agents';

describe('Simulation', () => {
  let simulation = null;

  beforeEach(() => {
    simulation = new Simulation();
  });

  it('can run and return a result asynchronously', async () => {
    await simulation.run();
  });

  it('has no agents on creation', () => {
    const { agents } = simulation;
    expect(agents).to.be.an('array').that.is.empty; // eslint-disable-line no-unused-expressions
  });

  it('can add agent groups with a specified count', () => {
    simulation.addAgentGroup(AgentType.MAINTAINER, { acceptanceLikelihood: 0.5 }, 10);
    let { agents } = simulation;
    expect(agents).to.have.lengthOf(10);

    simulation.addAgentGroup(AgentType.CONTRIBUTOR, { submissionQuality: 0.5 }, 20);
    ({ agents } = simulation);
    expect(agents).to.have.lengthOf(30);

    simulation.addAgentGroup(AgentType.USER, {}, 30);
    ({ agents } = simulation);
    expect(agents).to.have.lengthOf(60);

    simulation.addAgentGroup(AgentType.CONTRIBUTOR, { submissionQuality: 0.1 }, 5);
    ({ agents } = simulation);
    expect(agents).to.have.lengthOf(65);

    const maintainers = agents.filter(agent => agent instanceof Maintainer);
    const contributors = agents.filter(agent => agent instanceof Contributor);
    const users = agents.filter(agent => agent instanceof User);
    expect(maintainers).to.have.lengthOf(10);
    expect(contributors).to.have.lengthOf(25);
    expect(users).to.have.lengthOf(30);
  });

  it('does not allow adding of unrecognized agent types', () => {
    const attempt = () => simulation.addAgentGroup('SecretAgent', {}, 10);
    expect(attempt).to.throw(TypeError);

    const { agents } = simulation;
    expect(agents).to.be.empty; // eslint-disable-line no-unused-expressions
  });

  describe('Agents in submission', () => {
    before(() => {
      simulation.addAgentGroup(AgentType.MAINTAINER, { acceptanceLikelihood: 0.5 }, 10);
      simulation.addAgentGroup(AgentType.CONTRIBUTOR, { submissionQuality: 0.5 }, 20);
    });

    it('can get the balance in an agent\'s account', () => {
      const address = '0x0000000000000000000000000000000000000000';
      const balance = simulation.getAgentBalance(address);
      expect(balance).to.be.a('number');
      expect(balance).to.be.at.least(0);
    });
  });
});
