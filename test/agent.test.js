import { expect } from 'chai';

import Agent from '../simulator/agents';

describe('Agent', () => {
  let agent = null;

  beforeEach(() => {
    agent = new Agent();
  });

  it('can have traits', () => {
  });

  it('has an ETH wallet address', () => {
    const { address } = agent;
    expect(address).to.be.a('string');
    expect(address).to.have.lengthOf(42);
    expect(address.substring(0, 2)).to.equal('0x');
  });
});
