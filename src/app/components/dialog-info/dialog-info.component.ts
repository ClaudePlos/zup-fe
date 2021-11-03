import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import ZupState from "../../store/state";
import {select, Store} from "@ngrx/store";
import {Application} from "../../models";
import {NewZupTaskRequest} from "../../services/request/new-zup-task-request";
import {NewTaskRequest} from "../../services/request/new-task-request";
import * as TaskAction from "../../store/action";
import {map} from "rxjs/operators";
import {NewTaskInfo} from "../../models/newTaskInfo";

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent implements OnInit, OnDestroy {

  state: Observable<ZupState>;
  dataSubscription: Subscription;

  loading: boolean;
  newTaskInfo: NewTaskInfo;

  constructor(private store: Store<{ zupStore: ZupState }>) {
    this.state = store.pipe(select('zupStore'));
  }

  ngOnInit(): void {

    this.dataSubscription = this.state.pipe(
      map(data => {
        this.loading = data.loading;
        this.newTaskInfo = data.newTaskInfo
        }
      )
    ).subscribe();
  }



  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
