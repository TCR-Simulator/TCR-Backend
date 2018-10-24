const Web3 = require('web3');

export default class TcrConnection {
  contructor(provider, contractAddr, contractAbi) {
    this.web3 = new Web3(provider);
    this.contract = this.web3.eth.contract(contractAbi).at(contractAddr);
  }

  submit(initiator, submissionQuality) {
    this.contract.submit(initiator, submissionQuality).call();
  }

  vote(initiator, submission, accept) {
    this.contract.vote(initiator, submission, accept).call();
  }

  getPendingList() {
    this.contract.getPendingList().call();
  }
}
