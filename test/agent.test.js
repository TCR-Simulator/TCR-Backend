import { expect } from 'chai';

import { AgentType, AgentGroup } from '../simulator/agents';

describe('AgentGroup', () => {
  it('can allow setting of wallet addresses', () => {
    const agentGroup = new AgentGroup(AgentType.MAINTAINER, {}, 5);
    agentGroup.setAddresses([
      '0x6ragqoahkxk07vls942xqzmnapjyjnrgmg6d4ujo',
      '0xu5idofzm5sskl5w8r5g8ritxbo1b7vp21wlsg90g',
      '0xfsnsapwmgb91pekd5mpl2f3vqrpq9kp20xrjotmb',
      '0xu6i0nm5zukb2mekjlp7ttfjbwt6gha0u8wnbp7da',
      '0xf27j31b1k3j7kfiu551fsbp74wug7wh4ybza0wy6',
    ]);
  });

  it('does not allow adding invalid or duplicate wallet addresses', () => {
    const attempt = addresses => () => {
      const agentGroup = new AgentGroup(AgentType.MAINTAINER, {}, addresses.length);
      agentGroup.setAddresses(addresses);
    };

    expect(attempt(['BAD ADDRESS'])).to.throw(TypeError);
    expect(attempt(['6ragqoahkxk07vls942xqzmnapjyjnrgmg6d4ujo'])).to.throw(TypeError);

    const duplicate = [
      '0x6ragqoahkxk07vls942xqzmnapjyjnrgmg6d4ujo',
      '0x6ragqoahkxk07vls942xqzmnapjyjnrgmg6d4ujo',
    ];
    expect(attempt(duplicate)).to.throw(TypeError);
  });
});
