import * as React from "react";
import { createStore } from "redux";

interface WizardmonProps {
  status: String;
}

interface WizardmonState {}

class Wizardmon extends React.Component<WizardmonProps, WizardmonState> {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return(
      <div>
        <img src="assets/images/wizardmon.gif"></img>
        <p className="wizardmon-status">{this.props.status}</p>
      </div>
    );
  }
}

export default Wizardmon;
