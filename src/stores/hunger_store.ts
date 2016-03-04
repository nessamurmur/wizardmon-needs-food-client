import * as _ from "lodash";
import { createStore } from "redux";
import HungerAction from "../actions/hunger_actions.ts";
import { getJSON, patchJSON } from "../utils/ajax.ts";
import { WizardmonState } from "../components/wizardmon.tsx";

export interface WizardmonStateWrapper {
  digimon: WizardmonState;
};

export interface Response {
  data: WizardmonState;
};

export interface HungerStoreAction {
  type: HungerAction;
  response: Response;
};

export function getLastFed(): void {
  getJSON("http://localhost:4000/digimon/niftyn8", (response) => {
    setLastFed(response);
  });
}

function feed(data: WizardmonState & any): void {
  patchJSON("http://localhost:4000/digimon/niftyn8", data, (response): void => {
    setLastFed(response);
  });
}

function setLastFed(response) {
  hungerStore.dispatch({ type: HungerAction.SetLastFed, response });
}

export const hunger = (state: WizardmonState, action: HungerStoreAction) => {
  switch (action.type) {
  case HungerAction.Feed:
    let newState = _.merge(state, {last_fed: new Date()});
    feed({ "digimon": newState });
    return state;
  case HungerAction.Update:
    getLastFed();
    return state;
  case HungerAction.SetLastFed:
    return action.response.data;
  default:
    return state;
  }
};

export const hungerStore = createStore(hunger, {last_fed: new Date()});

export default hungerStore;
