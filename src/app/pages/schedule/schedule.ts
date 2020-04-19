import { Component, ViewChild, OnInit ,ElementRef,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config,IonSlides } from '@ionic/angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { BankmodalComponent } from '../bankmodal/bankmodal.component';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { CharsComponent } from './../chars/chars.component';

import * as pluginAnnotations from 'chartjs-plugin-annotation';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element

  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  @ViewChild('testSlider', { static: true }) slides: IonSlides;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  data:any;
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  dictkeys: any = [];
  confDate: string;
  totalbalance:any =0;
  listaccounts: any = {};
  graphdata:any=0;
  chartsdata:any={data: [
    { data: [65, 800, 760, 400, 1300, 400, 340.84], label: 'Solde' }
  ],labels:['January', '', '', 'April', '', '', 'July'],type:'line'};
chartsdata2:any={data: [
    { data: [100, 500, 760, 800, 1000, 2000, 5600], label: 'Epargne' }
  ],labels:['January', '', '', 'April', '', '', 'July'],type:'line'};

  chartsdata3:any={data: [
              [120, 90, 110,300]
            ],labels:['Courses', 'Restaurants', 'Cash et divers','Loyer'],type:'doughnut'};
  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public modalController: ModalController

  ) { 

    confData.getchangement().subscribe(

      (data) => { 
        console.log('hi')
        this.ionViewDidEnter()
      },
    );
  }
ionViewDidEnter(){
  this.data=this.confData.getdata();
  //this.listaccounts=this.data['comptes'];

    this.dictkeys=Object.keys(this.data['comptes']);
    this.totalbalance=0;
    for (let i = 0; i < this.dictkeys.length; i++){
       for (let j = 0; j < this.data['comptes'][this.dictkeys[i]].length; j++){
    
      this.totalbalance+=Number(this.data['comptes'][this.dictkeys[i]][j]['Montant'].replace(' ',''));
      
    }


    }
    this.totalbalance=this.totalbalance.toFixed(2);
    this.ios = this.config.get('mode') === 'ios';
    

}
ngAfterViewInit() {
  //Chart.defaults.global.legend.display = false;

  console.log('ok');
if (! this.data.loading){
  /*
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mardi"],
        datasets: [
          { label:"Solde",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [2300, 1500, 1000, -300, 2500, 1000, 230],
            spanGaps: false
          }
        ]
      }
    });*/


    console.log('ok');}
  }
  ngOnInit() {
    //this.updateSchedule();
    this.data=this.confData.getdata()
    console.log(this.data);
    this.totalbalance=0;
    //this.listaccounts=this.data['comptes'];
        this.dictkeys=Object.keys(this.data['comptes']);

    for (let i = 0; i < this.dictkeys.length; i++){
       for (let j = 0; j < this.data['comptes'][this.dictkeys[i]].length; j++){
    
      this.totalbalance+=Number(this.data['comptes'][this.dictkeys[i]][j]['Montant'].replace(' ',''));
    }

    }
    this.totalbalance=this.totalbalance.toFixed(2);

    this.ios = this.config.get('mode') === 'ios';
    
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: BankmodalComponent,
      componentProps: { }
    });
    return await modal.present();
  }
  getgraph(testSlider) {
      testSlider.getActiveIndex().then(index => {
      this.graphdata=index;
      console.log(this.graphdata);
      });;
      
    
  }
  public nex(){
   this.slides.slideNext();
}

public prev(){
   this.slides.slidePrev();
}
 
}
