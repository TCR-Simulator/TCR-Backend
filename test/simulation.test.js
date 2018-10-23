import { expect } from 'chai';

import Simulation from '../simulator/Simulation';

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

  it('can add agent groups', () => {
    simulation.addAgentGroup('maintainer', { acceptanceLikelihood: 0.5 }, 10);
    let { agents } = simulation;
    expect(agents).to.have.lengthOf(10);

    simulation.addAgentGroup('contributor', { submissionQuality: 0.5 }, 20);
    ({ agents } = simulation);
    expect(agents).to.have.lengthOf(30);
  });

  describe('Agents in submission', () => {
    before(() => {
      simulation.addAgentGroup('maintainer', { acceptanceLikelihood: 0.5 }, 10);
      simulation.addAgentGroup('contributor', { submissionQuality: 0.5 }, 20);
    });

    it('can get the balance in an agent\'s account', () => {
      const address = '0x0000000000000000000000000000000000000000';
      const balance = simulation.getAgentBalance(address);
      expect(balance).to.be.a('number');
      expect(balance).to.be.at.least(0);
    });
  });
});
