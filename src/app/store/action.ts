import {createAction, props} from '@ngrx/store';
import {Application, Worker} from '../models';
import {Localization} from '../models/localization';
import {ZupTask} from "../models/zupTask";
import {Phone} from "../models/phone";
import {NewTaskRequest} from "../services/request/new-task-request";
import {NewTaskInfo} from "../models/newTaskInfo";

export const PrepareNewApplication = createAction(
  'PrepareNewApplication',
  props<{ payload: { isLoading: boolean } }>()
);
export const PrepareNewApplicationSuccess = createAction(
  'PrepareNewApplicationSuccess',
  props<{ payload: { newApplication: Application, isLoading: boolean } }>()
);
export const PrepareNewApplicationFailure = createAction(
  'PrepareNewApplicationFailure',
  props<{ payload: {} }>()
);

export const GetWorkerAction = createAction(
  'GetWorkerAction',
  props<{ payload: { personalNumber: string, isLoading: boolean } }>()
);
export const GetWorkerActionSuccess = createAction(
  'GetWorkerActionSuccess',
  props<{ payload: { worker: Worker, isLoading: boolean } }>()
);
export const GetWorkerActionFailure = createAction(
  'GetWorkerActionFailure',
  props<{ payload: {} }>()
);

export const GetCostPositions = createAction(
  'GetCostPositions',
  props<{ payload: { isLoading: boolean } }>()
);
export const GetCostPositionsSuccess = createAction(
  'GetCostPositionsSuccess',
  props<{ payload: { isLoading: boolean, localizations: Localization[] } }>()
);
export const GetCostPositionsFailure = createAction(
  'GetCostPositionsFailure',
  props<{ payload: {} }>()
);

export const GetUserPhone = createAction(
  'GetUserPhone',
  props<{ payload: { isLoading: boolean, userName: string } }>()
);
export const GetUserPhoneSuccess = createAction(
  'GetUserPhoneSuccess',
  props<{ payload: { isLoading: boolean, phone: Phone } }>()
);
export const GetUserPhoneFailure = createAction(
  'GetUserPhoneFailure',
  props<{ payload: {} }>()
);

export const GetLocalizations = createAction(
  'GetLocalizations',
  props<{ payload: { isLoading: boolean } }>()
);
export const GetLocalizationsSuccess = createAction(
  'GetLocalizationsSuccess',
  props<{ payload: { isLoading: boolean, localizations: Localization[] } }>()
);
export const GetLocalizationsFailure = createAction(
  'GetLocalizationsFailure',
  props<{ payload: {} }>()
);

export const SaveNewTask = createAction(
  'SaveNewTask',
  props<{ payload: { isLoading: boolean, newTask: NewTaskRequest } }>()
);
export const SaveNewTaskSuccess = createAction(
  'SaveNewTaskSuccess',
  props<{ payload: { isLoading: boolean, newTaskInfo: NewTaskInfo } }>()
);
export const SaveNewTaskFailure = createAction(
  'SaveNewTaskFailure',
  props<{ payload: {} }>()
);

export const GetZupTask2 = createAction(
  'GetZupTask2',
  props<{ payload: { isLoading: boolean, uuid: string } }>()
);
export const GetZupTask2Success = createAction(
  'GetZupTask2Success',
  props<{ payload: { isLoading: boolean, task: ZupTask } }>()
);
export const GetZupTask2Failure = createAction(
  'GetZupTask2Failure',
  props<{ payload: {} }>()
);

export const SetLoggedUser = createAction(
  'SetLoggedUser',
  props<{ payload: { userLogin: string } }>()
);


export const ResetWorkerAction = createAction(
  'ResetWorkerAction',
  props<{ payload: {} }>()
);

export const ResetNewTaskInfo = createAction(
  'ResetNewTaskInfo',
  props<{ payload: {} }>()
);
