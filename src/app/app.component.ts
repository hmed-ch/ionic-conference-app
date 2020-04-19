import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { Events, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { ConferenceData } from './providers/conference-data';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Accounts',
      url: '/app/tabs/schedule',
      icon: 'wallet'
    },
    {
      title: 'Insights',
      url: '/app/tabs/map',
      icon: 'analytics'
    },
    {
      title: 'Transfert',
      url: '/app/tabs/speakers',
      icon: 'git-compare'
    },
    
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private Confdata:ConferenceData,
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
  }

  async ngOnInit() {
    

  
    
  }

  

  


  logout() {
    this.Confdata.resetdata();

    this.router.navigateByUrl('/app/tabs/schedule');
  }

  
}
