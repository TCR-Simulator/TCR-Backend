const Web3 = require('web3');

const results = [];

const callback = function callback(error, result) {
  if (error) {
    throw new Error(error.toString());
  } else {
    results.push(result);
  }
};

function portToAddr(port) {
  return `http://localhost:${port}`;
}

export default class TcrConnection {
  contructor(portNum, contractAddr, contractAbi) {
    this.web3 = new Web3(new Web3(new Web3.providers.HttpProvider(portToAddr(portNum))));
    if (this.web3.isConnected()) {
      if (!this.web3.isAddress(contractAddr)) {
        throw new Error('Invalid contract address');
      }
      this.contract = this.web3.eth.contract(contractAbi).at(contractAddr);
    } else {
      throw new Error('Web3 connection has failed.');
    }
  }

  submit(initiator, submissionQuality, submissionFrequency) {
    this.contract.submit.call(initiator, submissionQuality, submissionFrequency, callback);
  }

  vote(initiator, submission, accept) {
    this.contract.vote.call(initiator, submission, accept, callback);
  }

  getPendingList() {
    return this.contract.getPendingList.call();
  }

  getBalance(address) {
    if (this.web3.isAddress(address)) {
      return this.web3.eth.getBalance(address);
    }
    return null;
  }
}
