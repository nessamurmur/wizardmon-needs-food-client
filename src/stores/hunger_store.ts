import * as _ from "lodash";
import { createStore } from "redux";
import HungerAction from "../actions/hunger_actions.ts";
import { getJSON, patchJSON } from "../utils/ajax.ts";
import { WizardmonState } from "../components/wizardmon.tsx";

export interface WizardmonStateWrapper {
  digimon: WizardmonState;
};

export interface HungerStoreAction {
  type: HungerAction;
  response: WizardmonState;
};

let hungerWorker = new Worker("assets/workers/hunger_worker.js");
hungerWorker.onmessage = (e: MessageEvent): void => {
  hungerStore.dispatch({type: HungerAction.Update});
  hungerWorker.postMessage(hungerStore.getState());
};

function setLastFed(response) {
  _.merge(response.data, {last_fed: Date.parse(response.data.last_fed)});
  hungerStore.dispatch({ type: HungerAction.SetLastFed, response });
}

export const hunger = (state: WizardmonState, action: HungerStoreAction) => {
  switch (action.type) {
  case HungerAction.Feed:
    let newState = _.merge(state, {last_fed: new Date()});
    hungerWorker.postMessage(newState);
    return newState;
  case HungerAction.Update:
    hungerWorker.postMessage(state);
    return state;
  case HungerAction.SetLastFed:
    hungerWorker.postMessage(action.response);
    return action.response;
  default:
    return state;
  }
};

export const hungerStore = createStore(hunger, {last_fed: new Date()});

export default hungerStore;
