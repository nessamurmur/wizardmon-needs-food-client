import * as React from "react";
import HungerAction from "../actions/hunger_actions.ts";
import hungerStore from "../stores/hunger_store.ts";

interface WizardmonProps {}

export interface WizardmonState {
  last_fed: Date;
}

class Wizardmon extends React.Component<WizardmonProps, WizardmonState> {
  constructor(props, context) {
    super(props, context);
    this.state = hungerStore.getState();
    hungerStore.subscribe(() => {
      this.setState(hungerStore.getState());
    });
  }

  feed(): void {
    hungerStore.dispatch({ type: HungerAction.Feed });
  }

  renderHunger() {
    let timeElapsed = new Date().getTime() - this.state.last_fed.getTime();
    let hunger = timeElapsed > 20000 ? "Hungry!" : "Full!";
    return hunger;
  }

  render() {
    return(
      <div>
        <img src="assets/images/wizardmon.gif"></img>
        <p className="wizardmon-hunger">Last Fed: {this.renderHunger()}</p>
        <button onClick={this.feed}>Feed</button>
      </div>
    );
  }
}

export default Wizardmon;
