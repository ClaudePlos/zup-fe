import {NewZupTaskRequest} from "./new-zup-task-request";

export class NewTaskRequest {
  constructor(public description: string,
              public header: string,
              public expectedDate: string,
              public userSurname: string,
              public userLogin: string,
              public status: number,
              public priority: number,
              public matter: number,
              public department: number,
              public forUser: string,
              public newZupTaskRequest: NewZupTaskRequest) {
  }

  static newFrom(userLogin: string, userSurname: string, forUser: string, newZupTaskRequest: NewZupTaskRequest): NewTaskRequest {
    return new NewTaskRequest('',
      '',
      '',
      userSurname,
      userLogin,
      1,
      4,
      66,
      1,
      forUser,
      newZupTaskRequest);
  }
}
