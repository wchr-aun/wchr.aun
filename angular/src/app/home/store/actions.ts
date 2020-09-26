import { createAction, props } from '@ngrx/store';
import { State } from './store';

export const loadDataActions = {
  loadHomeStart: createAction('[Home Module] Start querying data'),
  loadHomeSuccess: createAction('[Home Module] Query data successfully', props<{ data: State }>()),
  loadHomeFail: createAction('[Home Module] Query data fail')
}
