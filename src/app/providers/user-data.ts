import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserData {
 public messages: any;
  public messages2: any;

  public simresult = {
    amount: 10000,
    months: 12,
    payment: 200,
  }
  public amount = 10000;
  public months = 12;
  public payment = 200;
  public scriptsInfos;
  public insights;
  public currentScript;
  public Conf = {
    scriptsInfos : [
      {
        "color": "blue",
        "name": "Retirement",
        "id": "0",
        "notif": "<div class=\"notif-text\">Your current monthly target is</div> <div class=\"notif-amount\">EUR 1455.00</div> <div class=\"notif-text\">You are on track to reach your target</div>",
        "scriptId": "15",
        "url": "https://demo.attila.tech/chatbot/110?env=test&preview=true",
        "questions": [
          {
            "id": -1,
            "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
            "type": "text",
            "selected": false,
            "display": true,
            "sender": "script",
            "redirection": true,
            "next_node": { '0': -4 },
            "delay":0,
          },
          {
            "id": -4,
            "title":"High risk of overdraft",
            "text": "Your account shows higher than usual spending patterns! We can help...",
            "img":"../../assets/money-bag.svg",
            "type": "insight",
            "graphId":2,
            "selected": false,
            "options": [
              {
                "id": 1,
                "text": "Show me",
                "active": false,
                "type": "button"
              },
              {
                "id": 2,
                "text": "Loan simulation",
                "active": false,
                "type": "simulation"
              }
            ],
            "display": true,
            "sender": "",
            "redirection": true,
            "delay":0,
            "next_node": { '0': -3 , '1': 0, '2': 3 }
          },
          {
            "id": -3,
            "title":"You spent 80% of your monthly shopping budget",
            "text": "Define and follow your budgets",
            "img":"../../assets/piggy-bank.svg",
            "type": "insight",
            "graphId":-1,
            "selected": false,
            "options": [
              {
                "id": 1,
                "text": "Transactions",
                "active": false,
                "type": "button"
              },
              {
                "id": 2,
                "text": "Update budgets",
                "active": false,
                "type": "simulation"
              }
            ],
            "delay":0,
            "display": true,
            "sender": "",
            "redirection": true,
            "next_node": { '0':-2,'1': 0, '2': 3 }
          },
          {
            "id": -2,
            "title":"My retirement plan",
            "text": "You've already saved 4000€ for your retirement plan. You can do better!",
            "img":"../../assets/museum.svg",
            "type": "insight",
            "graphId":-1,
            "selected": false,
            "options": [
              {
                "id": 1,
                "text": "Resume simulation",
                "active": false,
                "type": "button"
              },
              {
                "id": 1,
                "text": "Restart",
                "active": false,
                "type": "simulation"
              }
            ],
            "display": true,
            "sender": "",
            "redirection": false,
            "next_node": { '0': 0, '1': 3 }
          },

          {
            "id": 0,
            "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
            "type": "text",
            "selected": false,
            "display": true,
            "sender": "script",
            "redirection": true,
            "next_node": { '0': 1 }
          },
          {
            "id": 1,
            "text": "Overdrafts could result in unnecessary fees.",
            "type": "replies",
            "options": [
              {
                "id": 0,
                "text": "What should I do?",
                "active": false,
                "type": "button"
              }],
            "selected": false,
            "display": true,
            "sender": "script",
            "redirection": false,
            "next_node": { '0': 2 }
      //  "next_node": { '0': -4 }
          },
          {
            "id": 2,
            "text": "To prevent them, you have the possibility to contract a loan, do you want to do a simulation ?",
            "type": "buttons",
            "selected": false,
            "options": [
              {
                "id": 0,
                "text": "No",
                "active": false,
                "type": "button"
              },
              {
                "id": 1,
                "text": "Start simulation",
                "active": false,
                "type": "simulation"
              }
            ],
            "display": true,
            "sender": "script",
            "redirection": false,
            "next_node": { '0': 3, '1': 3 }
          },
          {
            "id": 3,
            "text": `Based on your simulation, you can borrow ${this.simresult.amount}€ now and pay them back on ${this.simresult.months} installments of ${this.simresult.payment}€`,
            "type": "replies",
            "selected": false,
            "options": [
              {
                "id": 0,
                "text": "Ok",
                "active": false,
                "type": "button"
              },
              {
                "id": 1,
                "text": "Apply now",
                "active": false,
                "type": "button"
              }
            ],
            "display": true,
            "sender": "script",
            "redirection": false,
            "next_node": { '0': 4, '1': 4 }
          },
          {
            "id": 4,
            "text": "Your application has been transmitted",
            "type": "buttons",
            "selected": false,
            "options": [
              {
                "id": 0,
                "text": "Check Status",
                "active": false,
                "type": "check"
              }
            ],
            "display": true,
            "sender": "script",
            "redirection": true,
            "next_node": { '0': 5 }
          },
          {
            "id": 5,
            "text": "Do you want me to use overdraft prediction on other accounts?",
            "type": "replies",
            "selected": false,
            "options": [
              {
                "id": 0,
                "text": "Yes",
                "active": false,
                "type": "button",
              },
              {
                "id": 0,
                "text": "No",
                "active": false,
                "type": "button",
              }
            ],
            "display": true,
            "sender": "script",
            "redirection": false,
            "next_node": { '0': 6 }
          },
          {
            "id": 6,
            "text": "You can connect your accounts in other financial institutions using your login/password",
            "type": "buttons",
            "selected": false,
            "options": [
              {
                "id": 0,
                "text": "Connect Account",
                "active": false,
                "type": "openapi",
              }
            ],
            "display": true,
            "sender": "script",
            "redirection": false,
            "next_node": { '0': 7 }
          },
          {
            "id": 7,
            "text": "1 new account has been connected",
            "selected": false,
            "display": true,
            "sender": "script",
            "redirection": true,
            "next_node": { '0': 8 }
          },
          {
            "id": 8,
            "text": "please entre value",
            "type": "input",
            "selected": false,
            "display": true,
            "sender": "script",
            "redirection": false
          }
        ],
      }
    ],
    insights : [{
      chart: {
        type: 'radialBar',
        height: 250
      },
      stroke: {
        lineCap: "round",
        show: true,
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          track: {
            /*  dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }*/
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          }
        }
      },
      legend: {
        show: true,
        floating: true,
        fontSize: '14px',
        position: 'left',
        // offsetX: 0,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return `${seriesName} ${opts.w.globals.series[opts.seriesIndex]}%`
        },
        itemMargin: {
          horizontal: 1,
        }
      },
      colors: ["#d20073", "#003883", "#009de0"],
      series: [80, 52, 34],
      labels: ['Shopping', 'Groceries', 'Groceries'],

    },
    {
      chart: {
        type: 'bar',
        height: 250,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded'
        },
      },
      yaxis3: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: ['02/01/2019 GMT', '03/01/2019 GMT', '04/01/2019 GMT', '05/01/2019 GMT'
        ],
      },
      legend: {
        show: false,
        position: 'bottom',
        offsetY: 0
      },
      series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      }],
      colors: ['#d20073', '#003883', '#009de0'],
      stroke: {
        lineCap: "round",
        show: true,
      },


    },
    {
      chart: {
        type: 'radialBar',
        height: 250,
      },
      colors: ["#d20073", "#003883", "#009de0"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: '#003883'
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "22px"
            },
            value: {
              color: "#fff",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#009de0"],
          stops: [0, 100]
        }
      },
      series: [79],
      labels: ['High risk'],
    }]


  }

  constructor(
  ) {
    this.messages = [];
    this.messages2 = [];
    this.insights=this.Conf.insights;
    this.scriptsInfos=this.Conf.scriptsInfos;
    this.currentScript = this.scriptsInfos[0];

  }


  public sendnextmessage(parentId, nodeId, container=2) {
    var array = [];
    array = this.currentScript.questions;
    let currentquestion = array.find(script => script['id'] == parentId);
    let nextquestion = JSON.parse(JSON.stringify(array.find(script => script['id'] == currentquestion.next_node[nodeId])));
    nextquestion.display = true;
    if (nextquestion['id'] == 3) nextquestion['text'] = `Based on your simulation, you can borrow ${this.simresult.amount}€ now and pay them back on ${this.simresult.months} installments of ${this.simresult.payment}€`;
    if (container==2)
      this.messages2.push(nextquestion);
    else
      this.messages.push(nextquestion);
    if (nextquestion.redirection) {
      let delay=1500;
      if (nextquestion.delay!=undefined)
        delay=nextquestion.delay;
      setTimeout(() => {
        this.sendnextmessage(nextquestion['id'], 0,container);
      }, delay);

    }
  }

  public sendinputnext() {
    var lastmessagesend = this.messages2[this.messages2.length - 2];
    var array = [];
    array = this.currentScript.questions;

    let nextquestion = array.find(script => (script['id'] == lastmessagesend.next_node['0']));
    nextquestion.display = true;
    this.messages2.push(nextquestion);
  }
  public setsimulationresult(result) {

    this.simresult = result;
  }

  public getMessages(containerid=2) {
    if(containerid==2)
      return this.messages2;
    return this.messages;
  }
  public addMessage(msg) {
    this.messages2.push(msg);
  }
  public quickReplyshown() {
    this.messages2[this.messages2.length - 1].selected = true;
  }
  public clearHistory() {
    this.messages = [];
  }
  public getlength() {
    return this.messages2.length;
  }
}
