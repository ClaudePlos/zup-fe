import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import ZupState from '../../store/state';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ZupTask} from '../../models/zupTask';
import {map} from 'rxjs/operators';
import * as TaskAction from '../../store/action';
import {ActivatedRoute} from "@angular/router";
import * as _rollupMoment from "moment";
import * as _moment from "moment";

@Component({
  selector: 'app-show-application',
  templateUrl: './show-application.component.html',
  styleUrls: ['./show-application.component.scss']
})
export class ShowApplicationComponent implements OnInit {

  state: Observable<ZupState>;
  dataSubscription: Subscription;
  task: ZupTask;

  loading: boolean;
  applicationForm: FormGroup;

  initializeForm(): void {
    this.applicationForm = this.formBuilder.group({
      manager: this.formBuilder.group({
        manager: [{value: '', disabled: true}],
        fillWorker: [{value: '', disabled: true}],
        contactPhone: [{value: '', disabled: true}]
      }),
      startWorkDate: [{value: '', disabled: true}],
      endWorkDate: [{value: '', disabled: true}],

      worker: this.formBuilder.group({
        personalNumber: [{value: '', disabled: true}],
        name: [{value: '', disabled: true}],
        surname: [{value: '', disabled: true}],
      }),

      localization: this.formBuilder.group({
        costPosition: [{value: '', disabled: true}],
        officeLocalization: [{value: '', disabled: true}],
        otherOfficeLocalization: [{value: '', disabled: true}]
      }),

      services: this.formBuilder.group({
        servicesItems: [{value: [], disabled: true}],
        platnikServiceItems: [{value: [], disabled: true}]
      }),

      egeriaCompany: this.formBuilder.group({
        company: [{value: false, disabled: false}],
        modules: [{value: [], disabled: true}],
        hrGroups: [{value: '', disabled: true}],
        modelFunctionalityOn: [{value: '', disabled: true}],
      }),

      additionalEquipments: [{value: [], disabled: false}],
    });
  }

  constructor(private store: Store<{ zupStore: ZupState }>, private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.state = store.pipe(select('zupStore'));
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getApplication();
    this.dataSubscription = this.state.pipe(
      map(data => {
          this.task = data.zupTask;
          this.loading = data.loading;
          if (this.task) {
            this.applicationForm.get('worker').setValue(this.task.properties.worker);
            this.applicationForm.get('startWorkDate').setValue(this.task.properties.startWorkDate);
            this.applicationForm.get('endWorkDate').setValue(this.task.properties.endWorkDate);
            this.applicationForm.get('localization').setValue({
              costPosition: this.task.properties.localization.costPosition.costPosition,
              officeLocalization: this.task.properties.localization.costPosition.officeLocalization,
              otherOfficeLocalization: this.task.properties.localization.otherOfficeLocalization
            });
            this.applicationForm.get('manager').setValue(this.task.properties.manager);
            this.applicationForm.get('services').setValue(this.task.properties.services);
          }
        }
      )
    ).subscribe();
  }

  show(uuid: string): void {
    this.store.dispatch(TaskAction.GetZupTask2({payload: {isLoading: true, uuid}}));
  }

  getApplication(): void {
    this.route.paramMap
      .subscribe(params => {
          console.log(params.get('uuid'));
          this.store.dispatch(TaskAction.GetZupTask2({payload: {isLoading: true, uuid: params.get('uuid')}}));
        }
      );
  }

}
