import * as React from "react";
import HungerAction from "../actions/hunger_actions.ts";
import hungerStore from "../stores/hunger_store.ts";

interface WizardmonProps {}

interface WizardmonState {
  hunger: number;
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

  unfeed(): void {
    hungerStore.dispatch({ type: HungerAction.NotFeed });
  }

  render() {
    return(
      <div>
        <img src="assets/images/wizardmon.gif"></img>
        <p className="wizardmon-hunger">Hunger: {this.state.hunger}</p>
        <button onClick={this.feed}>Feed</button>
        <button onClick={this.unfeed}>Unfeed</button>
      </div>
    );
  }
}

export default Wizardmon;
