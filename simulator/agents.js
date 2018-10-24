export const AgentType = {
  MAINTAINER: 'maintainer',
  CONTRIBUTOR: 'contributor',
  USER: 'user',
};

class Agent {
  get [Symbol.toStringTag]() { // eslint-disable-line class-methods-use-this
    return 'Agent';
  }
}

export class Maintainer extends Agent {
  get [Symbol.toStringTag]() { // eslint-disable-line class-methods-use-this
    return 'Maintainer';
  }
}

export class Contributor extends Agent {
  get [Symbol.toStringTag]() { // eslint-disable-line class-methods-use-this
    return 'Contributor';
  }
}

export class User extends Agent {
  get [Symbol.toStringTag]() { // eslint-disable-line class-methods-use-this
    return 'User';
  }
}
