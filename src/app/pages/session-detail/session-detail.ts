import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { Location} from "@angular/common";

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';
  transactions:any;
  dictkeys:any;

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
        private location: Location

  ) { }

  ionViewWillEnter() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');


    this.transactions=this.dataProvider.gettransactions(sessionId);
    this.dictkeys=Object.keys(this.transactions);

    
  }

  ionViewDidEnter() {
  }
myBackButton(){
  this.location.back();
}

  

}
