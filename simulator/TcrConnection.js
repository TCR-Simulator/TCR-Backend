const Web3 = require('web3');

const contractAbi = [];

export default class TcrConnection {
  contructor(provider, contractAddr) {
    this.web3 = new Web3(provider);
    this.contract = this.web3.eth.contract(contractAbi).at(contractAddr);
  }

  submit(initiator, submissionQuality) {
    this.contract.submit.call(initiator, submissionQuality);
  }

  vote(initiator, submission, accept) {
    this.contract.vote.call(initiator, submission, accept);
  }

  getPendingList() {
    return this.contract.getPendingList.call();
  }
}
