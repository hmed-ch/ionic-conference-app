import { Component, OnInit,ViewChild, ElementRef,Input } from '@angular/core';
import { Chart ,ChartDataSets, ChartOptions} from 'chart.js';
import { ChartsModule ,Color, BaseChartDirective, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.scss'],
})
export class CharsComponent implements OnInit {
 @Input() datainsight;
public lineChartOptions: any = {
  plugins: {
      datalabels: {
         // hide datalabels for all datasets
         display: false
      }
    },
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{

          
          gridLines: {
            
            display: false,
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 0
        },
        margin: {
          left: 0,
          right: 0
        }
      }
    };
   public pieChartColors: Color[] = [
  
  { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(255,0,0,0.3)',
      pointBackgroundColor: 'rgba(255,0,0,0.3)',
      pointBorderColor: 'rgba(255,0,0,0.3)',
      pointHoverBackgroundColor: 'rgba(255,0,0,0.3)',
      pointHoverBorderColor: 'rgba(255,0,0,0.3)'
    }
  ];
  public lineChartColors: Color[] = [
  {
      backgroundColor: 'aliceblue',
      borderColor: 'aliceblue',
      pointBackgroundColor: '#3880ff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public SystemName: string = "MF1";
  firstCopy = false;
  public ChartData: Array<any>;
  public ChartLabels: Array<any> ;
  public indexdata:any=0;
  public ChartOptions: any = {
    responsive: true,
    legend: {
    display: false,
},

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 0
        }
      },

  plugins: {
      datalabels: {
        
        formatter: (value, ctx) => {

              if(ctx.chart.config.type=='bar'){if(this.indexdata>= ctx.chart.data.datasets.length)this.indexdata=0;

              const label = ctx.chart.data.datasets[this.indexdata].label;
              this.indexdata+=1;

              return label;}
              else {
                const label = ctx.chart.data.labels[ctx.dataIndex];
              

              return label;

              }
              

                    
        },
      },
    }
  };
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  ChartLegend:any=true;
   _lineChartColors:Array<any> = [{
       backgroundColor: 'red',
        borderColor: 'red',
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red' 
      },
      { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

  public ChartType:any;
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
  }
  constructor() { }
  ngOnInit() {

    this.ChartData=this.datainsight.data;
    this.ChartLabels=this.datainsight.labels;
    this.ChartType=this.datainsight.type;


    }

}
