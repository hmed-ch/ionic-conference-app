import { Component, ElementRef, Inject, ViewChild, AfterViewInit,Input } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Chart } from 'chart.js';
import { MessagesService } from '../../providers/messages.service';
import { Router } from '@angular/router';

import { darkStyle } from './map-dark-style';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage  {
  /*@ViewChild("barCanvas",{static:true}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static:true}) doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas",{static:true}) lineCanvas: ElementRef;*/

  private barChart: Chart;
  private doughnutChart: Chart;
    private lineChart: Chart;



  constructor(
    public confData: ConferenceData,
    public router: Router,
    private Message: MessagesService,
    public platform: Platform) {}

   ngOnInit() {
    /*this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Spent amount", "Peers average amount"],
        datasets: [
          {
            label: "$ Amount spent on groceries",
            data: [1250, 1000],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
              
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)"
              
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: ["Remaining budget", "Spendings"],
        datasets: [
          {
            label: "Spending on shopping",
            data: [300, 1200],
            
            backgroundColor: ["rgba(255,99,132,0.6)","rgba(54, 162, 235, 0.6)"]
          }
        ]
      }
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["08-10-2019", "10-10-2019", "12-10-2019", "14-10-2019", "16-10-2019", "18-10-2019", "20-10-2019"],
        datasets: [
          {
            label: "Account Balance",
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
            data: [2300, 1500, 1000, 300, 100, -200, -400],
            spanGaps: false
          }
        ]
      }
    });*/

    
  }

  sendmessage(parent_id,node_id){
    this.Message.clearHistory();
        this.Message.sendnextmessage(parent_id, node_id);
        
        console.log(node_id);
        this.router.navigateByUrl('/support');

  }

  
}

