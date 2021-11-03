import {Component, OnDestroy, OnInit} from '@angular/core';
import ZupState from '../../store/state';
import {Observable, Subscription} from 'rxjs';
import {Application, Worker} from '../../models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as TaskAction from '../../store/action';
import {ActivatedRoute, Router} from '@angular/router';
import {Localization} from '../../models/localization';
import {NewZupTaskRequest} from '../../services/request/new-zup-task-request';
import {isNumeric} from 'rxjs/internal-compatibility';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import * as  _rollupMoment from 'moment';
import {NewTaskRequest} from "../../services/request/new-task-request";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DialogInfoComponent} from "../../components/dialog-info/dialog-info.component";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD HH:mm Z',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class NewApplicationComponent implements OnInit, OnDestroy {

  state: Observable<ZupState>;
  dataSubscription: Subscription;
  applicationForm: FormGroup;
  worker: Worker;
  localizations: Localization[];

  services: string[] = ['POCZTA', 'MAPI', 'QLIK', 'task.naprzod.pl', 'EZD', 'i.naprzod.pl', 'PŁATNIK'];
  additionalEquipments: string[] = ['Telefon stacjonarny', 'Telefon komórkowy (SMARTFON)', 'Telefon komórkowy (PRZYCISKOWY)', 'Komputer stacjonarny + Monitor', 'Laptop', 'Monitor', 'Internet przenośny'];
  egeriaModuleItems: string[] = ['KG', 'GM', 'NZ', 'ST', 'CKK', 'CSS', 'GR', 'SP', 'ZK', 'EK'];
  platnikItems: string[] = [
    'ASPEN RES SP. Z O.O.',
    'CATERMEND SA',
    'NAPRZÓD CATERING SP. Z O.O.',
    'IZAN + SP. Z O.O.',
    'JOL-MARK SP. Z O.O.',
    'KTS TRIOMED SP. Z O.O.',
    'NAPRZOD CLEANING',
    'NAPRZOD HOSPITAL SP. Z O.O.',
    'NAPRZOD IP SP. Z O.O.',
    'NAPRZÓD LOGISTYKA SP. Z O.O.',
    'NAPRZOD MARKETING SP. Z O.O.',
    'REKEEP POLSKA SA',
    'NAPRZÓD SERVICE SP. Z O.O.',
    'PPHU POSTĘP SP. Z O.O.',
    'NAPRZÓD SP. Z O.O.',
    'SYNAP DEVELOPMENT SP. Z O.O.',
    'VENDI SERVIS SP. Z O.O.',
    'VENDI CLEANING SP. Z O.O.',
    'VENDI SERVIS IP SP. Z O.O.',
    'VENDI MARKETING SP. Z O.O.'
  ];

  loading: boolean;
  userLogin: string;

  loggedUser: string;

  showEK: boolean;
  showLOCALIZATION: boolean;
  showPlatnikItems: boolean;

  filteredLocalizations: Localization[];

  isStartWorkDateRequiredValid = true;
  isStartEndWorkDateComparisonValid = true;
  isManagerRequiredValid = true;
  platnikItemsRequiredValid = true;
  isFormValid = true;

  disabledElearningWhenA = false;

  initializeForm(): void {
    this.applicationForm = this.formBuilder.group({
      manager: this.formBuilder.group({
        manager: [''],
        fillWorker: [{value: '', disabled: true}],
        contactPhone: ['']
      }),
      startWorkDate: [''],
      endWorkDate: [{value: '', disabled: true}],

      worker: this.formBuilder.group({
        personalNumber: [{value: '', disabled: true}],
        name: [{value: '', disabled: true}],
        surname: [{value: '', disabled: true}],
      }),

      localization: this.formBuilder.group({
        costPosition: [''],
        officeLocalization: [{value: '', disabled: true}],
        otherOfficeLocalization: [{value: '', disabled: true}]
      }),

      services: this.formBuilder.group({
        servicesItems: [{value: [], disabled: false}],
        platnikServiceItems: [{value: [], disabled: true}]
      }),

      egeriaCompany: this.formBuilder.group({
        company: [{value: false, disabled: false}],
        modules: [{value: [], disabled: true}],
        hrGroups: [{value: '', disabled: true}],
        modelFunctionalityOn: [{value: '', disabled: true}],
      }),

      additionalEquipments: [{value: [], disabled: false}],
      additionalEquipmentsAddress: [{value: '', disabled: true}]
    });
  }


  constructor(private store: Store<{ zupStore: ZupState }>,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private dateAdapter: DateAdapter<any>,
              private snackBar: MatSnackBar) {
    this.state = store.pipe(select('zupStore'));
    this.initializeForm();

  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('pl');
    this.resetWorker();
    this.getCostPositions();

    this.dataSubscription = this.state.pipe(
      map(data => {
          this.loggedUser = data.loggedUser;
          this.loading = data.loading;
          this.worker = data.newApplicationWorker;
          this.localizations = data.localizations;
          this.filteredLocalizations = this.localizations.slice();
          if (data.newApplicationWorker) {
            this.applicationForm.get('worker').patchValue({
              personalNumber: data.newApplicationWorker.personalNumber,
              name: data.newApplicationWorker.name,
              surname: data.newApplicationWorker.surname,
            });
            this.applicationForm.get('manager').patchValue({
              fillWorker: data.loggedUser,
              manager: data.loggedUser
            });
            this.applicationForm.get('startWorkDate').patchValue(
              moment(data.newApplicationWorker.startWorkDate)
            );
          }
          if (data.phone) {
            this.applicationForm.get('manager').patchValue({
              contactPhone: data.phone.phone,
            });
          }
        }
      )
    ).subscribe();

    this.onChanges();
  }


  onChanges(): void {

    this.applicationForm.get('manager').get('manager').valueChanges.subscribe(
      value => {
        this.isApplicationFormValid()
      }
    );

    this.applicationForm.get('localization').get('costPosition').valueChanges.subscribe(
      value => {

        console.log(value);

        if (value === 'Bez stanowiska kosztów') {
          this.showLOCALIZATION = false;
          this.applicationForm.get('localization').get('officeLocalization').reset();
          this.applicationForm.get('localization').get('otherOfficeLocalization').reset();
          this.applicationForm.get('localization').get('otherOfficeLocalization').disable();
        } else if (value['costPosition'].substring(0, 1).toUpperCase() !== 'A') {
          this.disabledElearningWhenA = false;
          this.showLOCALIZATION = false;
          this.applicationForm.get('localization').get('officeLocalization').reset();
          this.applicationForm.get('localization').get('otherOfficeLocalization').reset();
          this.applicationForm.get('localization').get('otherOfficeLocalization').disable();
        } else {
          console.log('localization->cost position: ' + value);
          this.disabledElearningWhenA = true;
          this.showLOCALIZATION = true;
          this.applicationForm.get('localization').get('officeLocalization').patchValue(value.officeLocalization);
          this.applicationForm.get('localization').get('otherOfficeLocalization').enable();
          this.applicationForm.get('services').get('servicesItems').patchValue([...this.applicationForm.get('services').get('servicesItems').value, 'e-learning (wym. dla administracji)']);
        }
      }
    );

    this.applicationForm.get('services').get('servicesItems').valueChanges.subscribe(
      value => {
        this.isApplicationFormValid();
        if (value.includes('PŁATNIK')) {
          this.applicationForm.get('services').get('platnikServiceItems').enable();
          this.showPlatnikItems = true;
        } else {
          this.applicationForm.get('services').get('platnikServiceItems').disable();
          this.applicationForm.get('services').get('platnikServiceItems').reset();
          this.showPlatnikItems = false;
        }
      }
    );

    this.applicationForm.get('services').get('platnikServiceItems').valueChanges.subscribe(
      value => {
        this.isApplicationFormValid();
      }
    );

    this.applicationForm.get('egeriaCompany').get('company').valueChanges.subscribe(
      value => {
        if (value !== true) {
          this.applicationForm.get('egeriaCompany').get('modules').patchValue([]);
          this.applicationForm.get('egeriaCompany').get('modules').disable();
          this.applicationForm.get('egeriaCompany').get('hrGroups').reset();
          this.applicationForm.get('egeriaCompany').get('hrGroups').disable();
          this.applicationForm.get('egeriaCompany').get('modelFunctionalityOn').reset();
          this.applicationForm.get('egeriaCompany').get('modelFunctionalityOn').disable();
        } else {
          this.applicationForm.get('egeriaCompany').get('modules').enable();
        }
      }
    );

    this.applicationForm.get('egeriaCompany').get('modules').valueChanges.subscribe(
      value => {
        if (value.includes('EK')) {
          this.showEK = true;
          this.applicationForm.get('egeriaCompany').get('hrGroups').enable();
          this.applicationForm.get('egeriaCompany').get('modelFunctionalityOn').enable();
        } else {
          this.showEK = false;
          this.applicationForm.get('egeriaCompany').get('hrGroups').reset();
          this.applicationForm.get('egeriaCompany').get('modelFunctionalityOn').reset();
          this.applicationForm.get('egeriaCompany').get('hrGroups').disable();
          this.applicationForm.get('egeriaCompany').get('modelFunctionalityOn').disable();
        }
      }
    );

    this.applicationForm.get('additionalEquipments').valueChanges.subscribe(
      value => {
        if (value.length === 0) {
          this.applicationForm.get('additionalEquipmentsAddress').reset();
          this.applicationForm.get('additionalEquipmentsAddress').disable();
        } else {
          this.applicationForm.get('additionalEquipmentsAddress').enable();
        }
      }
    );

    this.applicationForm.get('startWorkDate').valueChanges.subscribe(
      value => {
        this.isApplicationFormValid();
        if (value === '') {
          this.applicationForm.get('endWorkDate').reset()
          this.applicationForm.get('endWorkDate').disable();
        } else {
          this.applicationForm.get('endWorkDate').enable();
          console.log(value);
        }
      }
    );

    this.applicationForm.get('endWorkDate').valueChanges.subscribe(
      value => {
        this.isApplicationFormValid();
      }
    );
  }

  getWorker(personalNumber: string): void {
    const managerName = this.loggedUser;
    this.store.dispatch(TaskAction.GetWorkerAction({payload: {isLoading: true, personalNumber, managerName}}));
  }


  getCostPositions(): void {
    this.store.dispatch(TaskAction.GetCostPositions({payload: {isLoading: true}}));
  }

  resetWorker(): void {
    this.store.dispatch(TaskAction.ResetWorkerAction({payload: {}}));
  }

  resetNewTaskInfo(): void {
    this.store.dispatch(TaskAction.ResetNewTaskInfo({payload: {}}));
  }


  enabledFindBy(personalNumber: string): boolean {
    return personalNumber.length === 11 && isNumeric(personalNumber);
  }

  get f() {
    return this.applicationForm.controls;
  }


  saveNewTask(application: Application): void {

    if (this.isApplicationFormValid()) {
      console.log('Application: ' + JSON.stringify(application));
      const zupTaskRequest: NewZupTaskRequest = NewZupTaskRequest.newFrom(application.manager.fillWorker, application);
      const taskRequest: NewTaskRequest = NewTaskRequest.newFrom(
        application.manager.fillWorker,
        application.manager.fillWorker,
        application.worker.surname + ' ' + application.worker.name,
        zupTaskRequest);

      console.log(taskRequest);

      this.store.dispatch(TaskAction.SaveNewTask({payload: {isLoading: true, newTask: taskRequest}}));

      const conf = new MatDialogConfig();
      conf.disableClose = true;

      const dialogRef = this.dialog.open(DialogInfoComponent, conf);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.resetWorker();
          this.resetNewTaskInfo();
          this.applicationForm.get('find').reset();
        }
      })
    } else {
      this.showErrorSnackBar();
    }
  }


  showErrorSnackBar() {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    this.snackBar.open("Formularz zawiera błędy", "OK", {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    })
  }


  isOptionDisabled(option: string): boolean {
    const value = this.applicationForm.get('localization').get('costPosition').value;
    console.log(value);
    if (value.substring(0, 1).toUpperCase() !== 'A') {
      return false;
    } else {
      if (option === 'e-learning (wym. dla administracji)') {
        return true;
      }
    }
    return false;
  }

  clearEndWorkDate(): void {
    this.applicationForm.get('endWorkDate').reset();
    this.startEndWorkDateComparisonValidation();
  }

  isApplicationFormValid(): boolean {

    if (!this.startWorkDateRequiredValidation()) {
      return (this.isFormValid = false);
    }

    if (!this.startEndWorkDateComparisonValidation()) {
      return (this.isFormValid = false);
    }

    if (!this.managerRequiredValidation()) {
      return (this.isFormValid = false);
    }

    if (!this.platnikItemsRequiredValidation()) {
      return (this.isFormValid = false);
    }

    return (this.isFormValid = true);
  }

  platnikItemsRequiredValidation(): boolean {
    const is = this.applicationForm.get('services').get('servicesItems').value.includes('PŁATNIK');
    const size = this.applicationForm.get('services').get('platnikServiceItems').value ? this.applicationForm.get('services').get('platnikServiceItems').value.length : 0;
    if (is && !size) {
      return (this.platnikItemsRequiredValid = false);
    }
    return (this.platnikItemsRequiredValid = true);
  }

  managerRequiredValidation(): boolean {
    if (this.applicationForm.get('manager').get('manager').value === '') {
      return (this.isManagerRequiredValid = false);
    }
    return (this.isManagerRequiredValid = true);
  }

  startWorkDateRequiredValidation(): boolean {
    if (this.applicationForm.get('startWorkDate').value === '') {
      return (this.isStartWorkDateRequiredValid = false);
    }
    return (this.isStartWorkDateRequiredValid = true);
  }

  startEndWorkDateComparisonValidation(): boolean {
    let startWorkDate = this.applicationForm.get('startWorkDate').value;
    let endWorkDate = this.applicationForm.get('endWorkDate').value;

    if (startWorkDate !== '' && endWorkDate !== '' && endWorkDate !== null) {
      this.isStartEndWorkDateComparisonValid = moment(startWorkDate).isBefore(moment(endWorkDate));
      return this.isStartEndWorkDateComparisonValid
    }

    if (startWorkDate !== '' && (endWorkDate === '' || endWorkDate === null)) {
      return (this.isStartEndWorkDateComparisonValid = true);

    }

    return false
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
