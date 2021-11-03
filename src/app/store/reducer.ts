import ZupState, {initializeZupState} from './state';
import {Action, createReducer, on} from '@ngrx/store';
import * as ZupActions from './action';
import {Application} from '../models/application';
import {Worker} from '../models';

const initialZupState = initializeZupState();

const reducer = createReducer(
  initialZupState,
  on(ZupActions.PrepareNewApplication, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading};
  }),
  on(ZupActions.PrepareNewApplicationSuccess, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, newApplication: Application.newFrom()};
  }),

  on(ZupActions.GetWorkerAction, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, newApplicationWorker: Worker.newFrom()};
  }),
  on(ZupActions.GetWorkerActionSuccess, (state: ZupState, {payload}) => {
    console.log(payload.worker);
    return {...state, loading: payload.isLoading, newApplicationWorker: payload.worker};
  }),

  on(ZupActions.GetCostPositions, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading};
  }),
  on(ZupActions.GetCostPositionsSuccess, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, localizations: payload.localizations};
  }),

  on(ZupActions.GetUserPhone, (state: ZupState, {payload}) => {
    console.log('GetUserPhone');
    return {...state, loading: payload.isLoading};
  }),
  on(ZupActions.GetUserPhoneSuccess, (state: ZupState, {payload}) => {
    console.log('GetUserPhoneSuccess');
    return {...state, loading: payload.isLoading, phone: payload.phone};
  }),
  on(ZupActions.GetUserPhoneFailure, (state: ZupState, {payload}) => {
    console.log('GetUserPhoneFailure');
    return {...state};
  }),

  on(ZupActions.GetLocalizations, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading}
  }),
  on(ZupActions.GetLocalizationsSuccess, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, localizations: payload.localizations}
  }),

  on(ZupActions.ResetNewTaskInfo, (state: ZupState, {payload}) => {
    return {...state, newTaskInfo: null}
  }),

  on(ZupActions.ResetWorkerAction, (state: ZupState, {payload}) => {
    return {...state, newApplicationWorker: Worker.newFrom()}
  }),

  on(ZupActions.SaveNewTask, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading}
  }),
  on(ZupActions.SaveNewTaskSuccess, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, newTaskInfo: payload.newTaskInfo}
  }),

  on(ZupActions.GetZupTask2, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading}
  }),
  on(ZupActions.GetZupTask2Success, (state: ZupState, {payload}) => {
    return {...state, loading: payload.isLoading, zupTask: payload.task}
  }),

  on(ZupActions.SetLoggedUser, (state: ZupState, {payload}) => {
    console.log('SetLoggedUser');
    return {...state, loggedUser: payload.userLogin}
  })
  )
;


export function ZupReducer(state: ZupState | undefined, action: Action): ZupState {
  return reducer(state, action);
}
