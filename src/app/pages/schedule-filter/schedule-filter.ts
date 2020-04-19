import { AfterViewInit, Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage implements AfterViewInit {
  ios: boolean;

  tracks: {name: string, icon: string, isChecked: boolean}[] = [];

  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;
  }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
  
  }

  selectAll(check: boolean) {
  
  }

  applyFilters() {
   
  }

  dismiss(data?: any) {
    
  }
}
