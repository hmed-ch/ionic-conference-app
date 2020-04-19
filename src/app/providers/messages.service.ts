import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public messages:any;

  public simresult={
      amount: 10000,
      months: 12,
      payment: 200,
      savings:1000,
      yearsToSave:23
    }
  public amount=10000;
  public months=12;
  public payment=200;
  public scriptsInfos = [
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
      "text": "Redirection",
      "type": "text",
      "selected": false,
      "display": true,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':0,'1':5,'2':10,'3':12,'4':27,'5':3,'6':19},

    },
    
    {
      "id": 0,
      "text": "Vous avez atteint votre objectif! \nvoici comment vous avez atteint cet objectif",
      "type": "text",
      "selected": false,
      "data":{data: [
              [120, 90, 110]
            ],labels:['Courses', 'Restaurants', 'Cash et divers'],type:'doughnut'},
      "display": true,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':1}
    },
    {
      "id": 1,
      "text": "Vous avez économisé 320 dinars sur le total des dépense par rapport au mois dernier",
      "type": "replies",
      
      "selected": false,
      "display": true,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':2}
    },
    {
      "id": 2,
      "text": "Que voulez vous faire ?",
      "type": "replies",
      "selected": false,
      "options": [
        {
          "id": 0,
          "text": "Fixer un nouveau objectif par catégorie",
          "active": false,
          "type": "button"
        },
        {
          "id": 1,
          "text": "Analyser vos dépenses ",
          "active": false,
          "type": "simulation"
        }
      ],
      "display": true,
      "sender": "script",
      "redirection":false,
      "next_node":{'0':3,'1':3}
    },
    {
      "id": 3,
      "text": "Mettez à jours vos objectifs de dépenses pour chaque catégorie : "  /*Vos anciens objectifs sont les suivants:*/,
      "type": "replies",
      "data":{data: [
            { data: [65], label: 'Logement' },
            { data: [280], label: 'Courses' },
            { data: [106], label: 'Restaurant et loisir' },
            { data: [300], label: 'Education & enfants' },

          ],labels:['Objective'],type:'objective'},
      "display": true,
      "selected": false,
      "options": [
        {
          "id": 0,
          "text": "Continuer",
          "active": false,
          "type": "button"
        }],
      "sender": "script",
      "redirection":false,
      "next_node":{'0':4}
    },{
      "id": 4,
      "text": "Félicitation,vos objectifs sont mis à jous !",
      "type": "replies",
      "userinput":"",
      "selected": false,
      "display": true,
      "sender": "script",
      "options": [
        {
          "id": 0,
          "text": "Mettre à jours",
          "active": false,
          "type": "button"
        }],
      "redirection":false,
      "next_node":{'0':3}
    }
    /*{
      "id": 4,
      "text": "Quels objectifs voulez vous fixer?",
      "type": "userinput",
      "userinput":"",
      "selected": false,
      "display": true,
      "sender": "script",
      "redirection":false,
      "next_node":null
    }*/,
    {
      "id": 5,
      "text": "Votre solde est plus bas que d'habitude à cette période là du mois. ",
      "type": "text",
      "data":{data: [
              [120, 90, 110]
            ],labels:['Courses', 'Restaurants', 'Cash et divers'],type:'doughnut'},
      "selected": false,
      "options": [
        
      ],
      "display": true,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':6}
    },
    {
      "id": 6,
      "text": "Je prévois 1890 dinars de dépenses avant la fin du mois.",
      "type": "replies",
      "selected": false,
     "options": [
        {
          "id": 0,
          "text": "solutions",
          "active": false,
          "type": "button"
        },
        {
          "id": 1,
          "text": "analyser vos dépenses  ",
          "active": false,
          "type": "button"
        }
      ],
      "display": true,
      "sender": "script",
      "redirection":false,
      "next_node":{'0':7,"1":8}
    },
    {
      "id": 7,
      "text": "il vous faut réduire vos dépenses de 400 dinars pour éviter un découvert. Je peux vous aider à gérer cette situation",
        "type":"text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':8}
    },
    {
      "id": 8,
      "text": "Combien pensez vous pouvoir économiser avant la fin du mois? ",
      "type": "replies",
      "selected": false,
     "options": [
        {
          "id": 0,
          "text": "<= 500 dinars",
          "active": false,
          "type": "button"
        },
        {
          "id": 1,
          "text": "> 500 dinars",
          "active": false,
          "type": "button"
        }
      ],
      "display": false,
      "sender": "script",
      "redirection":false,
      "next_node":{'0':9}
    },
    {
      "id": 9,
      "text": "Je vous propose de fixer un objectif par catégorie",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':2}
    }
    ,
    {
      "id": 10,
      "text": "Vous avez payé Ooredoo 3 fois. Voici les détails des transactions :\n  * Type : payment par carte\n  * Montant : 57 dt \n  * Date : 01/11/2019",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':11}
    }
    ,
    {
      "id": 11,
      "text": "Je peux faire une recherche pour vous pour vous aider à comprendre ses transactions. Que voudriez vous savoir?",
      "type": "buttons",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Transactions du même montant",
          "active": false,
          "type": "redirection",
          "url": "/app/tabs/schedule/session/000110123457"
        },
        {
          "id": 1,
          "text": "Transactins du même fournisseur",
          "active": false,
          "type": "redirection",
          "url": "/app/tabs/schedule/session/000110123458"
        }
      ],
          
    },
    {
      "id": 12,
      "text": "Ne vous inquiétez pas, je suis là pour vous aider. D'abord vérifions un certain nombre de chose",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':13}
    }
    ,
    {
      "id": 13,
      "text": "Etes vous la personne qui a effectué ces transactions?",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Oui",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Quelqu'un d'autre",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':14,'1':15}
    },{
      "id": 14,
      "text": "Dans quelles circonstances ces transactions ont eu lieu ?",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "un problème de paiement électronique",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "un autre problème",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':16,'1':17}
    },{
      "id": 15,
      "text": "OK. Pensez vous que vous avez été victime d'une fraude ?",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Oui",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Non",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':17,'1':16}
    },{
      "id": 16,
      "text": " OK. Ce genre de problème est courant. Ne vous inquiétez pas, cette opération sera automatiquement corrigé sous quelques heures. Voulez vous que je vérifie pour vous dans 24 heure et vous notifie?",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Oui",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Non",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':18,'1':18}
    },{
      "id": 17,
      "text": "OK. Je vous propose donc de lancer dés maintenant une requête auprès du service client. Mes collègues humains travaillent entre 9h et 17h.Voulez vous que je lance une requête avec les informations dont je dispose ?",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Oui",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Non",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':18,'1':18}
    },{
      "id": 18,
      "text": "OK. bien noté, vous receverez une notification dans 24h.",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      
    }
    ,{
      "id": 19,
      "text": "Vous avez épargné en moyenne 300 dinars.\nVotre épargne a bien évoluée depuis l'année dernière.",
      "type": "text",
       "data":{data: [
    { data: [900, 1500, 1760,2300, 3000, 4000, 8600], label: 'Epargne' }
  ],labels:['January', '', '', 'April', '', '', 'July'],type:'line'},
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':20}
    },{
      "id": 20,
      "text": "Il est important de planifier votre retraite des maintenant.",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Continuer",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':21}
    },{
      "id": 21,
      "text": "Quelle proportion de votre épargne est consacrée à la retraite ?",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':22}
    },{
      "id": 22,
      "text": "Saisir un montant par exemple  '200 dinars par mois ou 3400 dinars par an'",
      "type": "userinput",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "next_node":{'0':23}
    },{
      "id": 23,
      "text": "Si vous continuez à épargner de la même manière, vous aurez 35 962 dinars après 23 ans.\nPensez vous disposer à la retraite de :",
      "type": "replies",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Plus",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Moins",
          "active": false,
          "type": "button",
        }
        ,
        {
          "id": 2,
          "text": "À peu près la même chose",
          "active": false,
          "type": "button",
        }
      ],
      "next_node":{'0':24,'1':24,'2':24}
    },{
      "id": 24,
      "text": "Vous pouvez grâce à 'Plan Retraite Tranquile' une épargne adaptée à la retraite optimiser votre retraite",
      "type": "buttons",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "options": [
        {
          "id": 0,
          "text": "Simuler",
          "active": false,
          "type": "simulation",
        }
      ],
      "next_node":{'0':25}
    },{
      "id": 25,
      "text": "La simulation indique que vous gagnez "+this.simresult.savings+ " dinars après 23 ans.",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':26}
    },
    {
      "id": 26,
      "text": "Voudriez vous plus d'information par rapport aux avantages fiscaux ?",
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "next_node":null
    }

    ,
    {
      "id": 27,
      "text": "D'après mes calcul vous aurez  à la fin du mois un decouvert de :",
      "data":{data: [
              [320]
            ],labels:['320 dinars de découvert '],type:'circle'},
      "type": "text",
      "selected": false,
      "display": false,
      "sender": "script",
      "redirection":true,
      "next_node":{'0':28}
    },
    {
      "id": 28,
      "text": "Un découvert vous expose à des frais évitables. Vous avez plusieurs manières pour l'éviter :",
      "type":"buttons",
    "options": [
        {
          "id": 0,
          "text": "Protection de découvert",
          "active": false,
          "type": "button",
        },
        {
          "id": 1,
          "text": "Réchelonner votre crédit",
          "active": false,
          "type": "button",
        },
        {
          "id": 2,
          "text": "Gérer votre budget",
          "active": false,
          "type": "button",
        }
        ,
        {
          "id": 3,
          "text": "Transférer des fonds",
          "active": false,
          "type": "button",
        }
      ],
       "selected": false,
      "display": false,
      "sender": "script",
      "redirection":false,
      "next_node":null
       }
  ],
}
    ];
  public currentScript=  this.scriptsInfos[0];

  constructor(
  ) {
    this.messages = [];
  }


  public sendnextmessage(parentId,nodeId){
   var array=[];
   array=this.currentScript.questions;
   let currentquestion =array.find(script => script['id'] == parentId );

   if(currentquestion.next_node){
    let nextquestion= JSON.parse(JSON.stringify(array.find(script => script['id'] == currentquestion.next_node[nodeId.toString()] )));
    nextquestion.display = true;
    if (nextquestion.id ==25){
      nextquestion.text="La simulation indique que vous gagnez "+this.simresult.savings+ " Tnd après "+ this.simresult.yearsToSave +" ans."
    }

    if (nextquestion.id ==23){
      const amount= parseInt(this.messages[this.messages.length-1].text) * 93.84 + 101430;
      nextquestion.text="Si vous continuez à épargner de la même manière, vous aurez "+ amount + " Tnd après 23 ans.\nPensez vous disposer à la retraite de :"
    }
    this.messages.push(nextquestion);
    if (nextquestion.redirection){
      setTimeout(()=> {
        this.sendnextmessage(nextquestion['id'],0);
    },1000);



    }
  }
}

public sendinputnext(){
  var lastmessagesend=this.messages[this.messages.length-2];
  var array=[];
  array=this.currentScript.questions;
  
  if(lastmessagesend.next_node){
  let nextquestion= array.find(script => (script['id'] == lastmessagesend.next_node['0']  ) );
  if (nextquestion.id ==25){
      nextquestion.text="La simulation indique que vous gagnez "+this.simresult.savings+ " Tnd après "+ this.simresult.yearsToSave +" ans."
    }
  if (nextquestion.id ==23){
      const amount= parseInt(this.messages[this.messages.length-1].text) * 23;

      nextquestion.text="Si vous continuez à épargner de la même manière, vous aurez "+ amount + " Tnd après 23 ans\nPensez vous disposer à la retraite de :"
    }
  nextquestion.display = true;
  this.messages.push(nextquestion);

}

}
public setsimulationresult(result){
  this.simresult=result;


}

  public getMessages(contactId?) {
    return this.messages;
  }
  public addMessage(msg) {
     this.messages.push(msg);
  }
  public quickReplyshown () {
  this.messages[this.messages.length - 1].selected = true;
  }
  public clearHistory() {
    this.messages = [];
  }
  public getlength() {
    return this.messages.length;
  }

  public editobjective(messageindex,dataindex,type) {
    if(type=='minus'){
      this.messages[messageindex].data.data[dataindex].data[0]-=1;
    }
      else{
        this.messages[messageindex].data.data[dataindex].data[0]+=1;
      }

      for (var i = this.scriptsInfos[0].questions.length - 1; i >= 0; i--) {
         
        if (this.scriptsInfos[0].questions[i].id == this.messages[messageindex].id)
        {this.scriptsInfos[0].questions[i].data=this.messages[messageindex].data;}
      };
  }
}
