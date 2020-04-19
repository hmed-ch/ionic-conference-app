import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { NavController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { SchedulePage } from '../schedule/schedule';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  bankid:any;
  bankname:any;
  banklogo:any;

  constructor(
    public navCtrl: NavController,
    public userData: ConferenceData,
    public router: Router,
    private route: ActivatedRoute

  ) { }
ionViewWillEnter() {
    this.bankid = this.route.snapshot.paramMap.get('bankId');
    var idbank = this.bankid;
    var currentbank=this.userData.banks.filter(function (el) {

                        return el['bank_id']== idbank;
                      })[0];
    if (currentbank){

    this.bankname=currentbank.bank_name;
    this.banklogo=currentbank.bank_logo;
  }

}
  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) 
      { 
        this.login['bankid']=this.bankid;
      this.userData.adddata(this.login);
      this.navCtrl.navigateRoot('/app/tabs/schedule');
      //this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
