import { expect } from 'chai';

import { AgentType, createAgentGroup } from '../simulator/agents';

describe('Agent group creation', () => {
  it('creates the correct type of agents', () => {
    const maintainers = createAgentGroup(AgentType.MAINTAINER, {}, 1);
    const contributors = createAgentGroup(AgentType.CONTRIBUTOR, {}, 1);
    const users = createAgentGroup(AgentType.USER, {}, 1);

    expect(maintainers).to.be.a('MaintainerGroup');
    expect(contributors).to.be.a('ContributorGroup');
    expect(users).to.be.a('UserGroup');
  });

  it('does not allow unrecognized agent types', () => {
    const attempt = agentType => () => {
      const agentGroup = createAgentGroup(agentType, {}, 5); // eslint-disable-line no-unused-vars
    };
    expect(attempt('Agent007')).to.throw(TypeError);
  });

  it('initializes with a specified population of agents', () => {
    const agentGroup = createAgentGroup(AgentType.MAINTAINER, {}, 5);
    const { agents } = agentGroup;

    expect(agentGroup.population).to.equal(5);
    expect(agents.length).to.equal(5);
  });
});
