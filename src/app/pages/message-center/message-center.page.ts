import { Component,ChangeDetectorRef, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';

import { IonSlides, IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MessagesService } from '../../providers/messages.service';
import { SimulatorPage } from '../simulator/simulator.page';
import { Router } from '@angular/router';
import { Location} from "@angular/common";
import { CharsComponent } from './../chars/chars.component';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.page.html',
  styleUrls: ['./message-center.page.scss'],
})

export class MessageCenterPage implements OnInit {
    @ViewChild('scrollMe',{static:true}) private myScrollContainer: ElementRef;
@ViewChild('content',{static:false}) private content: any;

  public contentArea: any;
  public showFooter: Boolean;
  public selectedOptionIndex;
  public iframeSrc;
  public selectedSlide = 0;
  public messages = [];
  public msg: string;
  private mutationObserver: MutationObserver;
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  public errorInfos = [
    {
      "id": -1,
      "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
      "type": "text",
      "selected": false,
      "display": true,
      "sender": "script",
      "redirection": true,
      "next_node": { '0': 0 },
      "data":true
    },
    {
      "id": 0,
      "text": "Your transactions this month show that you spent 2450€ compared to 1260€ on average. Based on this trend, you might be overdrawn in the next days",
      "type": "text",
      "selected": false,
      "display": true,
      "sender": "script",
      "redirection": true,
      "next_node": { '0': 1 },
      "data":true
    }]

  constructor(public modalController: ModalController,
    private Message: MessagesService,
    public router: Router,
    public location: Location

  ) { }
  

  ngOnInit() {
    this.messages = this.Message.getMessages();
    if (!this.messages.length) {
    this.Message.sendnextmessage(-1, 0);
    }
        this.scrollToBottom();




  }






  ionViewDidEnter() {
    

  }
  async onButtonClick(parentId, optionId, buttype,buttext) {


        this.Message.addMessage({ text: buttext, sender: 'user' });



    if (buttype == 'simulation') {
      const modal = await this.modalController.create({
        component: SimulatorPage,
        componentProps: { title: 123 ,successpayload:{'parentId':24},weburl:'https://simulator.attila.tech'}
      });
      modal.onDidDismiss().then((result) => {
        if (result !== null) {
          this.Message.setsimulationresult(result.data);
          console.log(parentId,optionId,result.data);
          this.Message.sendnextmessage(parentId, optionId);
           this.scrollToBottom();
        }
      });

      return await modal.present();
    }

    else {
      this.Message.sendnextmessage(parentId, optionId);
    }
    this.scrollToBottom();
  }


  onReplyClick(parentId, optionId, optText) {
    this.Message.quickReplyshown()

    this.Message.addMessage({ text: optText, sender: 'user' });
    this.Message.sendnextmessage(parentId, optionId);
    this.scrollToBottom();

  }


  senduserinput(parentId,optText){
       this.Message.quickReplyshown()

    this.Message.addMessage({ text:optText , sender: 'user' });
    this.Message.sendnextmessage(parentId,0);
    this.scrollToBottom();


  }

  sendMessage(event) {
    this.msg = '';
    this.Message.addMessage({ text: event, sender: 'user' });
    this.Message.sendinputnext();
    this.scrollToBottom();

  }
private scrollToBottom() {
    try {
      setTimeout(()=> {
        this.content.scrollToBottom(300);
    },800);

    } catch (err) { console.log(err)}
  }
myBackButton(){
  this.location.back();
}

minus(msgindex,dataindex){
this.Message.editobjective(msgindex,dataindex,'munis')  
}
plus(msgindex,dataindex){
  this.Message.editobjective(msgindex,dataindex,'plus')  


}

}
