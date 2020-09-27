import { createReducer, on, Action } from "@ngrx/store";
import { State, initialState } from "./store";
import { loadDataActions } from "./actions";

export const featureKey = 'home';

const _reducer = createReducer(
  initialState,
  on(loadDataActions.loadHomeStart, state => ({
    ...state,
    loading: true
  })),
  on(loadDataActions.loadHomeSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false
  })),
  on(loadDataActions.loadHomeFail, state => ({
    ...state,
    loading: false
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}
