import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { SimulatorPage } from './../simulator/simulator.page';

import { MessageCenterPage } from './message-center.page';
import { ChartsModule } from 'ng2-charts';
import { CharsComponent } from '../chars/chars.component';

const routes: Routes = [
  {
    path: '',
    component: MessageCenterPage
  }
];

@NgModule({
  imports: [
  ChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes),

  ],
  exports:[CharsComponent],
  declarations: [MessageCenterPage,SimulatorPage,CharsComponent],
  entryComponents: [
    SimulatorPage
  ]


})
export class MessageCenterPageModule { }
