class TcrAction {
  constructor(tcrConnection, initiator) {
    this.tcrConnection = tcrConnection;
    this.initiator = initiator;
  }

  execute() { // eslint-disable-line class-methods-use-this
    throw new Error('Not implemented.');
  }
}

export class SubmitAction extends TcrAction {
  constructor(tcrConnection, initiator, submissionQuality) {
    super(tcrConnection, initiator);
    this.initiator = initiator;
    this.submissionQuality = submissionQuality;
  }

  execute() {
    this.tcrConnection.submit(this.initiator, this.submissionQuality);
  }
}

export class VoteAction extends TcrAction {
  constructor(tcrConnection, initiator, submission, accept) {
    super(tcrConnection, initiator);
    this.submission = submission;
    this.accept = accept;
  }

  execute() {
    this.tcrConnection.vote(this.initiator, this.submission, this.accept);
  }
}
