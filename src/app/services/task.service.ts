import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {GetWorkerResponse} from './response';
import {GetCostPositionResponse} from './response/get-costPosition-response';
import {Localization} from '../models/localization';
import {GetPhoneResponse} from './response/get-phone-response';
import {Phone} from '../models/phone';
import {Application, Worker} from '../models';
import {GetSaveNewtaskResponse} from './response/get-save-newtask-response';
import {NewZupTaskRequest} from './request/new-zup-task-request';
import {GetZuptask2Response} from './response/get-zuptask2-response';
import {NewTaskRequest} from "./request/new-task-request";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskBaseUrl = environment.taskBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getWorker(personalNumber: string): Observable<GetWorkerResponse> {
    const url = `${this.taskBaseUrl}/api/task/egeriaclient/worker/${personalNumber}`;
    return this.httpClient.get<GetWorkerResponse>(url);

/*    const worker: Worker = new Worker(null, 'Jankowski', 'Lukasz', '88092012291', '');
    const response: GetWorkerResponse = new GetWorkerResponse(worker);
    return of(response);*/
  }

  getPhoneByUserName(userName: string): Observable<GetPhoneResponse> {
    const url = `${this.taskBaseUrl}/api/task/egeriaclient/phone/${userName}`;
    return this.httpClient.get<GetPhoneResponse>(url);

/*    const phone: Phone = new Phone('23423432423');
    const response: GetPhoneResponse = new GetPhoneResponse(phone);
    return of(response);*/
  }

  getCostPositions(): Observable<GetCostPositionResponse> {
    const url = `${this.taskBaseUrl}/api/task/egeriaclient/costposition`;
    return this.httpClient.get<GetCostPositionResponse>(url);

/*    const localizations: Localization[] = [
      new Localization('aode1', 'address1', 'desc1', ''),
      new Localization('aode2', 'address2', 'desc2', ''),
      new Localization('Aode3', 'address3', 'desc3', ''),
      new Localization('Aode4', 'address4', 'desc4', ''),
      new Localization('Aode5', 'address5', 'desc5', ''),
      new Localization('code3', 'address3', 'desc3', ''),
      new Localization('code4', 'address4', 'desc4', ''),
      new Localization('code5', 'address5', 'desc5', '')
    ];
    const response: GetCostPositionResponse = new GetCostPositionResponse(localizations);
    return of(response);*/

  }

  saveNewTask(body: NewTaskRequest): Observable<GetSaveNewtaskResponse> {
    const url = `${this.taskBaseUrl}/api/task`;
    console.log('save new task invoked');
    return this.httpClient.post<GetSaveNewtaskResponse>(url, body);
  }

  getZupTask2(id: string): Observable<GetZuptask2Response> {
    const url = `${this.taskBaseUrl}/api/task/zup/task/${id}`;
    return this.httpClient.get<GetZuptask2Response>(url);
  }
}
