import * as _ from "lodash";
import { createStore } from "redux";
import HungerAction from "../actions/hunger_actions.ts";

export interface HungerStoreAction {
  type: HungerAction;
};

export const hunger = (state, action: HungerStoreAction) => {
  switch (action.type) {
  case HungerAction.Feed:
    return _.merge(state, {hunger: state.hunger - 1});
  case HungerAction.Update:
    return _.merge(state, {hunger: state.hunger + 1});
  default:
    return state;
  }
};

export const hungerStore = createStore(hunger, {hunger: 0});

export default hungerStore;
