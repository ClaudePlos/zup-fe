import {Application, Worker} from '../models';
import {Localization} from '../models/localization';
import {Phone} from "../models/phone";
import {ZupTask} from "../models/zupTask";
import {NewTaskInfo} from "../models/newTaskInfo";

export default class ZupState {
  constructor(public loading: boolean,
              public newApplicationWorker: Worker,
              public localizations: Localization[],
              public phone: Phone,
              public zupTask: ZupTask,
              public loggedUser: string,
              public newTaskInfo: NewTaskInfo) {
  }
}

export const initializeZupState = (): ZupState => {
  return {
    loading: false,
    newApplicationWorker: Worker.newFrom(),
    localizations: [],
    phone: Phone.newFrom(),
    zupTask: null,
    loggedUser: '',
    newTaskInfo: null
  };
};
