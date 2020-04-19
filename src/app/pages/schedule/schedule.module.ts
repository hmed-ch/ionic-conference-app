import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { BankmodalComponent } from '../bankmodal/bankmodal.component';
import { ChartsModule } from 'ng2-charts';
import { MessageCenterPageModule } from '../message-center/message-center.module';


@NgModule({
  imports: [
   MessageCenterPageModule,
  ChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,

    SchedulePageRoutingModule
  ],
  declarations: [

    SchedulePage,
    BankmodalComponent,
    ScheduleFilterPage
  ],
  entryComponents: [
    ScheduleFilterPage,
    BankmodalComponent
  ]
})
export class ScheduleModule { }
