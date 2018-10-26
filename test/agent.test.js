import { expect } from 'chai';

import { AgentType, AgentGroup } from '../simulator/agents';

describe('AgentGroup', () => {
  it('initializes with a specified population of agents', () => {
    const agentGroup = new AgentGroup(AgentType.MAINTAINER, {}, 5);
    const { agents } = agentGroup;

    expect(agentGroup.population).to.equal(5);
    expect(agents.length).to.equal(5);
  });

  it('does not allow unrecognized agent types', () => {
    const attempt = agentType => () => {
      const agentGroup = new AgentGroup(agentType, {}, 5); // eslint-disable-line no-unused-vars
    };
    expect(attempt('Agent007')).to.throw(TypeError);
  });
});
