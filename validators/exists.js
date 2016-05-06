class ExistsValidator extends require('./validator') {
  validate() {
    return super() && !!this.value;
  }
}