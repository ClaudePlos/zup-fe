import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {TaskService} from '../services/task.service';
import * as TaskAction from './action';
import {GetWorkerResponse} from '../services/response';
import {GetCostPositionResponse} from '../services/response/get-costPosition-response';
import {GetPhoneResponse} from "../services/response/get-phone-response";
import {GetSaveNewtaskResponse} from "../services/response/get-save-newtask-response";
import {GetZuptask2Response} from "../services/response/get-zuptask2-response";

@Injectable()
export class ZupEffects {

  constructor(private service: TaskService, private action$: Actions) {
  }

  GetWorkerAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TaskAction.GetWorkerAction),
      mergeMap(action =>
        this.service.getWorker(action.payload.personalNumber).pipe(
          map((data: GetWorkerResponse) => {
            console.log('GetWorkerActionSuccess: ' + JSON.stringify(data.payload));
            return TaskAction.GetWorkerActionSuccess({payload: {isLoading: false, worker: data.payload}});
          }),
          catchError((data: Error) => {
            return of(TaskAction.GetWorkerActionFailure);
          })
        )
      )
    )
  );

  GetCostPositionsAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TaskAction.GetCostPositions),
      mergeMap(action =>
        this.service.getCostPositions().pipe(
          map((data: GetCostPositionResponse) => {
            return TaskAction.GetCostPositionsSuccess({payload: {isLoading: false, localizations: data.payload}});
          }),
          catchError((data: Error) => {
            return of(TaskAction.GetCostPositionsFailure);
          })
        )
      )
    )
  );


  GetUserPhoneAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TaskAction.GetUserPhone),
      mergeMap(action =>
        this.service.getPhoneByUserName(action.payload.userName).pipe(
          map((data: GetPhoneResponse) => {
            console.log('GetUserPhoneAction$: ' + data.payload);
            return TaskAction.GetUserPhoneSuccess({payload: {isLoading: false, phone: data.payload}});
          }),
          catchError((data: Error) => {
            return of(TaskAction.GetUserPhoneFailure);
          })
        )
      )
    )
  );

  SaveNewTaskAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TaskAction.SaveNewTask),
      mergeMap(action =>
        this.service.saveNewTask(action.payload.newTask).pipe(
          map((data: GetSaveNewtaskResponse) => {
            return TaskAction.SaveNewTaskSuccess({payload: {isLoading: false, newTaskInfo: data.payload}});
          }),
          catchError((data: Error) => {
            return of(TaskAction.SaveNewTaskFailure);
          })
        )
      )
    )
  );

  GetTaskAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TaskAction.GetZupTask2),
      mergeMap(action =>
        this.service.getZupTask2(action.payload.uuid).pipe(
          map((data: GetZuptask2Response) => {
            console.log('----- GetTaskAction$-------');
            return TaskAction.GetZupTask2Success({payload: {isLoading: false, task: data.payload}});
          }),
          catchError((data: Error) => {
            return of(TaskAction.GetZupTask2Failure);
          })
        )
      )
    )
  );


}
