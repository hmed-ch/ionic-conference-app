import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-simultaor-page',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
    encapsulation: ViewEncapsulation.None

})
export class SimulatorPage implements OnInit, OnDestroy {
  ngForm: NgForm;
  formChangesSubscription;
  // "value" passed in componentProps
  //@Input() value: number;
  @Input() title = `Webview`;
  @Input() weburl ;
  @Input() successpayload = `success`;

    url: SafeResourceUrl;

  params = {
    amount: 1000,
    loanTerm: 12,
  };
  result: number;

  constructor(
    private modalController: ModalController,
    navParams: NavParams,
        private sanitizer: DomSanitizer,

  ) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.weburl);

    const acmodal = this.modalController;
    const payload = this.successpayload;

    const onClosedData: string = "Wrapped Up!";
    window.addEventListener('message', receiveMessage, false);
    function receiveMessage(event) {
      const origin = event.origin || event.originalEvent.origin;
      console.log(event.data);
      acmodal.dismiss(event.data);     
      window.removeEventListener('message', receiveMessage, false);
   }
    
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async validate() {
    await this.modalController.dismiss({
      amount: this.params.amount,
      months: this.params.loanTerm,
      payment: this.result,
    });
  }

  operation({ amount, loanTerm }) {
    const principal = parseFloat(amount);
    const interest = (2 / 100) / 12;
    const payments = parseFloat(loanTerm);

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    return Math.round(monthly * 100) / 100;
  }

  ngOnDestroy() {
   // this.formChangesSubscription.unsubscribe();
  }

}
