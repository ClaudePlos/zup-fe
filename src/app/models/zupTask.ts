import {Application} from "./application";
import {buildCodeFrameError} from "@angular/localize/src/tools/src/source_file_utils";

export class ZupTask {
  constructor(public id: string,
              public properties: Application,
              public createdBy: string,
              public createdAt: string,
              public taskId: number) {
  }
}
