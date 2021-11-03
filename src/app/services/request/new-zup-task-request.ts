import {Application} from "../../models";

export class NewZupTaskRequest {
  constructor(public createdBy: string,
              public properties: Application) {
  }

  static newFrom(createdBy: string, properties: Application) {
    return new NewZupTaskRequest(createdBy, properties);
  }

}
