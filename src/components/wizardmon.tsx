import * as _ from "lodash";
import * as React from "react";
import { createStore } from "redux";

enum HungerAction {
  Feed,
  NotFeed
}

class HungerStoreAction {
  type: HungerAction;
};

const hunger = (state: WizardmonState = {hunger: 0}, action: HungerStoreAction) => {
  switch (action.type) {
  case HungerAction.Feed:
    return _.merge(state, {hunger: state.hunger - 1});
  case HungerAction.NotFeed:
    return _.merge(state, {hunger: state.hunger + 1});
  default:
    return state;
  }
};

const hungerStore = createStore(hunger);

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
