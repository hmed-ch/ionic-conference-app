import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'bankmodal',
  templateUrl: './bankmodal.component.html',
  styleUrls: ['./bankmodal.component.scss'],
})
export class BankmodalComponent   {
  banks:any;
  popularbanks:any=[];

  constructor(private modalController: ModalController,
        public confData: ConferenceData,

) { 
    }

      defaultHref = '';
ngOnInit() {
   this.banks=this.confData.banks;
   var popbanks = this.banks.filter(function (el) {
                        return el['popular'] 
                      })
    var i=0;
    var j=popbanks.length%2

    while (i < popbanks.length-j) {
      this.popularbanks.push([popbanks[i],popbanks[i+1]]);
      i+=2;
    }
    let restbank=popbanks.slice(i);
    if (restbank.lenght%2!=0) restbank.push({bank_id:null});
    this.popularbanks.push(restbank);
  }
   addFavorite(bank) {
  	console.log(bank);
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
