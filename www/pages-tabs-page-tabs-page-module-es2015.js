(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-tabs-page-tabs-page-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/about/about.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/about/about.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>About</ion-title>\n    \n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"about-header\">\n    <img src=\"assets/img/logo.png\" alt=\"ATTILA logo\">\n  </div>\n  <div class=\"about-info\">\n    <h4 class=\"ion-padding-start\">ATTILA AI</h4>\n\n    <ion-list lines=\"none\">\n    \n\n      <ion-item>\n        <ion-icon name=\"pin\" slot=\"start\"></ion-icon>\n        <ion-label position=\"stacked\">Location</ion-label>\n        <ion-select>\n          <ion-select-option value=\"madison\" selected>San Francisco, Californie, États-Unis\n</ion-select-option>\n          <ion-select-option value=\"austin\">Tunis, TUNISIA</ion-select-option>\n          \n        </ion-select>\n      </ion-item>\n    </ion-list>\n\n    <p class=\"ion-padding-start ion-padding-end\">\n      Attila is built around the idea of stepping faster into the future of retail finance.\n      Future is extreme personalization and the use of technology to customize experiences and products. We’ve garnered talent, expertise and experience to help our customers get ahead\n    </p>\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/bankmodal/bankmodal.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/bankmodal/bankmodal.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header style='display: block;\n    position: relative;\n    -ms-flex-order: -1;\n    order: -1;\n    width: 100%;\n    z-index: 10;'>\n  <ion-toolbar>\n    <ion-buttons  slot=\"start\" (click)='closeModal()'>\n      <ion-button>\n        <ion-icon name=\"arrow-back\"></ion-icon>\n</ion-button>\n    </ion-buttons>\n    <!--ion-thumbnail slot=\"start\">\n          <ion-img [src]=\"'assets/img/bank.svg'\" style=\"margin-left:2%;\" alt=\"museum\">\n          </ion-img>\n        </ion-thumbnail-->\n\n    <ion-title >Ajouter un compte</ion-title>\n\n    <!--ion-buttons slot=\"end\">\n      <ion-button (click)=\"presentFilter()\">\n        <span *ngIf=\"ios\">Filter</span>\n        <span *ngIf=\"!ios\">\n          <ion-icon slot=\"icon-only\" name=\"options\"></ion-icon>\n        </span>\n      </ion-button>\n    </ion-buttons-->\n  </ion-toolbar>\n\n  <!--ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"queryText\" (ionChange)=\"updateSchedule()\" placeholder=\"Search\"></ion-searchbar>\n  </ion-toolbar-->\n</ion-header>\n         \n          <ion-content fullscreen>\n          <!--ion-item lines=\"none\" class=\"header\">\n                <ion-back-button [defaultHref]=\"defaultHref\" (click)=\"closeModal()\"></ion-back-button>\n\n\t\t    <ion-thumbnail slot=\"start\">\n\t\t      <ion-img [src]=\"'assets/img/bank.png'\" alt=\"museum\">\n\t\t      </ion-img>\n\t\t    </ion-thumbnail>\n\t\t    <ion-text >\n\t\t      <h3>Ajouter un compte</h3>\n\t\t    </ion-text>\n\t\t  </ion-item-->\n\n          <ion-grid >\n          <ion-row *ngFor=\"let allbanks of popularbanks\">\n       <ion-col *ngFor=\"let bank of allbanks\">\n          <ion-card *ngIf=\"bank.bank_id\" (click)=\"closeModal()\" routerLink=\"/login/{{bank.bank_id}}\"  >\n            <img src=\"assets/img/{{bank.bank_logo}}\"  />\n        </ion-card>\n       </ion-col>\n     </ion-row >\n\n        \n\n        \n      </ion-grid>\n            \n          </ion-content>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/schedule-filter/schedule-filter.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/schedule-filter/schedule-filter.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header translucent>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"ios\" (click)=\"dismiss()\">Cancel</ion-button>\n      <ion-button *ngIf=\"!ios\" (click)=\"selectAll(false)\">Reset</ion-button>\n    </ion-buttons>\n\n    <ion-title>\n      Filter Sessions\n    </ion-title>\n\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"applyFilters()\" strong>Done</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen>\n\n  <ion-list [lines]=\"ios ? 'inset' : 'full'\">\n    <ion-list-header>Tracks</ion-list-header>\n\n    <ion-item *ngFor=\"let track of tracks\" [attr.track]=\"track.name | lowercase\">\n      <ion-icon *ngIf=\"ios\" slot=\"start\" [name]=\"track.icon\" color=\"medium\"></ion-icon>\n      <ion-label>{{track.name}}</ion-label>\n      <ion-checkbox [(ngModel)]=\"track.isChecked\"></ion-checkbox>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer translucent *ngIf=\"ios\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"selectAll(false)\">Deselect All</ion-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"selectAll(true)\">Select All</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/schedule/schedule.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/schedule/schedule.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <ion-header>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]=\"segment\" (ionChange)=\"updateSchedule()\">\n      <ion-segment-button value=\"all\">\n        All\n      </ion-segment-button>\n      <ion-segment-button value=\"favorites\">\n        Favorites\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header> -->\n\n<ion-header>\n  <ion-toolbar >\n    <ion-buttons  slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>Accounts</ion-title>\n\n    <!--ion-buttons slot=\"end\">\n      <ion-button (click)=\"presentFilter()\">\n        <span *ngIf=\"ios\">Filter</span>\n        <span *ngIf=\"!ios\">\n          <ion-icon slot=\"icon-only\" name=\"options\"></ion-icon>\n        </span>\n      </ion-button>\n    </ion-buttons-->\n  \n  </ion-toolbar>\n\n  <!--ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"queryText\" (ionChange)=\"updateSchedule()\" placeholder=\"Search\"></ion-searchbar>\n  </ion-toolbar-->\n</ion-header>\n\n<ion-content >\n<span *ngIf=\"this.data.loading\">\n\n<ion-row  style=\"margin-bottom:62px;margin-top: 20px;text-align:center;\">\n<ion-col >\n</ion-col >\n  <ion-col >\n\n<ion-text >\n  <h2 style=\"color:#3880ff;\">Synchronisation </h2>\n  <h5 style=\"color:#3880ff;\" >en cours...</h5>\n  </ion-text>\n  </ion-col >\n  <ion-col >\n</ion-col >\n\n </ion-row >\n<ion-row  style=\"margin-bottom:90px;\">\n<ion-col >\n</ion-col >\n<ion-col >\n<div class=\"loader\">\n</div>\n</ion-col >\n\n<ion-col >\n</ion-col >\n </ion-row >\n <ion-row >\n    <ion-col>\n    </ion-col>\n    <ion-col>\n        <ion-img alt=\"Secure\" style=\"max-width: 40px;display:block;margin:auto;width: 25%;\" src=\"assets/img/secure.svg\"></ion-img>\n\n    </ion-col>\n    <ion-col>\n    </ion-col>\n\n    </ion-row>\n    <ion-row style=\"text-align:center;\">\n\n    \n      <ion-col    >\n      <ion-text >\n    <em style='display: table-cell;color: #738aaa;font-size: .8rem;'> ATTILA est securisé et sûr</em>\n    </ion-text>\n    </ion-col>\n    \n  </ion-row>\n  </span>\n\n\n<span [hidden]=\"this.data.loading\">\n\n\n<div style=\"max-heigth:100px;\" >\n \n    <chars  *ngIf='graphdata==0'\n    [(datainsight)]=\"chartsdata\">\n  </chars>\n  <chars  *ngIf='graphdata==1'\n    [(datainsight)]=\"chartsdata2\">\n  </chars>\n  <chars  *ngIf='graphdata==2'\n    [(datainsight)]=\"chartsdata3\">\n  </chars>\n\n\n</div>\n\n   <div>\n\n<ion-slides  #testSlider pager=\"true\" [options]=\"slideOpts\" (ionSlideDidChange)='getgraph(testSlider)' >\n      <ion-slide style=\"padding: 10px;padding-bottom: 35px;\">\n  <ion-label style=\"text-align:center;\"> \n  <!--img src=\"assets/img/economy.svg\" style=\"width: 21%;margin-left: 39%;\" /-->\n <h3 style=\"font-size: 18px;\">  Votre solde total est de : </h3>\n  <p> {{totalbalance}} DT</p>\n        </ion-label>\n\n      </ion-slide>\n      <ion-slide style=\"padding: 10px;padding-bottom: 35px;\">\n  <ion-label style=\"text-align:center;\"> \n  <!--img src=\"assets/img/economy.svg\" style=\"width: 21%;margin-left: 39%;\" /-->\n <h3 style=\"font-size: 18px;\">  Votre Épargne est de : </h3>\n  <p> 5600 DT</p>\n        </ion-label>\n\n      </ion-slide>\n      <ion-slide style=\"padding: 10px;padding-bottom: 35px;\">\n  <ion-label style=\"text-align:center;\"> \n  <!--img src=\"assets/img/economy.svg\" style=\"width: 21%;margin-left: 39%;\" /-->\n <h3 style=\"font-size: 18px;\">  Vos dépenses quotidiennes :  </h3>\n  <p> 620 DT</p>\n        </ion-label>\n\n      </ion-slide>\n\n       \n    </ion-slides>\n        \n\n  <a     style=\"left: 20px;position: absolute;top: 200px;z-index: 100;\" (click)=\"prev()\"><img style=\"width: 30px;\" src='assets/img/previous.svg'>\n</a>\n  <a      style=\"right: 20px;position: absolute;top: 200px;z-index: 100;\"  (click)=\"nex()\"><img style=\"width: 30px;\" src='assets/img/next.svg'>\n</a >\n</div>\n\n  <ion-list #scheduleList [hidden]=\"shownSessions === 0\" style='padding:0'>\n\n  <ion-item-group *ngFor=\"let key of dictkeys\" >\n  <ion-item-divider style=\"background-color: aliceblue;\">\n        <ion-label >\n          <h1  style=\"color: black;font-size: 18px;\"\n    >{{key}}</h1>\n        </ion-label>\n      </ion-item-divider>\n\n      <ion-item-sliding  >\n        <ion-item *ngFor=\"let account of data.comptes[key]\" routerLink=\"/app/tabs/schedule/session/{{account.Numerodecompte}}\">\n\n          <ion-label style='margin-right: -21%;border-left: 2px solid #3bc7c4;padding-left: 1%;'>\n            <h3>{{account.Numerodecompte}}</h3>\n\n            <p>\n              {{account.Intituleducompte}} \n            </p>\n\n          </ion-label>\n          <ion-label style=\"text-align:right;padding-right: 2%;\" >\n            <h3>{{account.Montant}} DT</h3>\n\n            \n          </ion-label>\n          <ion-icon name=\"arrow-dropright\"></ion-icon>\n\n        </ion-item>\n        \n      </ion-item-sliding>\n      \n\n    </ion-item-group>\n\n  <ion-item-divider style=\"background-color: aliceblue;\">\n  <ion-grid>\n\n           <ion-row >\n           <ion-col >\n         </ion-col >\n          <ion-col >\n          <ion-button style=\"flex-direction: row;display: flex;\" expand=\"block\" (click)=\"openModal()\">ADD AN ACCOUNT</ion-button>\n         </ion-col >\n         <ion-col >\n         </ion-col >\n        \n         </ion-row >\n       </ion-grid>\n\n\n      </ion-item-divider>\n\n\n  </ion-list>\n\n  \n\n  <!--ion-fab  slot=\"fixed\" vertical=\"bottom\" horizontal=\"end\" #fab>\n    <ion-fab-button routerLink=\"/support\">\n        <ion-icon name=\"logo-ionitron\"></ion-icon>    </ion-fab-button>\n    \n  </ion-fab-->\n</span>\n</ion-content>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/session-detail/session-detail.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/session-detail/session-detail.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n      <ion-buttons  slot=\"start\" (click)='myBackButton()'>\n      <ion-button>\n        <ion-icon name=\"arrow-back\"></ion-icon>\n</ion-button>\n    </ion-buttons>\n        <ion-title>Transactions</ion-title>\n\n    <!--ion-buttons slot=\"end\">\n      <ion-button (click)=\"toggleFavorite()\">\n        <ion-icon *ngIf=\"!isFavorite\"  name=\"star-outline\"></ion-icon>\n        <ion-icon *ngIf=\"isFavorite\"  name=\"star\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"shareSession()\">\n        <ion-icon slot=\"icon-only\" name=\"share\"></ion-icon>\n      </ion-button>\n    </ion-buttons-->\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!--div *ngIf=\"session\" class=\"ion-padding\">\n    <h1>{{session.name}}</h1>\n    <span *ngFor=\"let track of session?.tracks\" [class]=\"'session-track-'+track.toLowerCase()\">{{track}}</span>\n    <p>{{session.description}}</p>\n    <ion-text color=\"medium\">\n      {{session.timeStart}} &ndash; {{session.timeEnd}}\n      <br /> {{session.location}}\n    </ion-text>\n  </div-->\n\n  <ion-list style='padding:0;'>\n    <ion-item-group  *ngFor=\"let key of dictkeys\">\n      <ion-item-divider style=\"background-color: aliceblue;\">\n        <ion-label>\n          <h2 style=\"color: black;\">  {{key | date}}</h2>\n        </ion-label>\n      </ion-item-divider>\n\n      <ion-item-sliding  >\n        <ion-item *ngFor=\"let transaction of transactions[key]\" >\n\n        <ion-img style=\"width: 13%;padding-left: 2%;border-left: 2px solid #3bc7c4;\" src=\"assets/img/{{transaction.Type}}.svg\"></ion-img>\n        \n          <ion-label style='margin-right: -26%;padding-left: 3%;'>\n            <h3>{{transaction.Label}} </h3>\n\n            <p>\n              {{transaction.Type}}\n            </p>\n\n          </ion-label>\n          \n           <ion-label style=\"text-align:right;padding-right: 0%;\" >\n           \n            <h3>{{transaction.Montant}} DT</h3>\n\n            \n          </ion-label>\n\n        </ion-item>\n        \n       \n        \n      </ion-item-sliding>\n      \n    </ion-item-group>\n\n\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/tabs-page/tabs-page.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/tabs-page/tabs-page.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-tabs>\n\n  <ion-tab-bar slot=\"bottom\">\n    <ion-tab-button tab=\"schedule\">\n      <ion-icon name=\"wallet\"></ion-icon>\n      <ion-label>Accounts</ion-label>\n    </ion-tab-button>\n\n\n    <ion-tab-button tab=\"map\">\n      <ion-icon name=\"analytics\"></ion-icon>\n      <ion-label>Insights</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"Transfer\">\n      <ion-icon name=\"git-compare\"></ion-icon>\n      <ion-label>Transfer</ion-label>\n    </ion-tab-button>\n\n    \n\n    <ion-tab-button tab=\"about\">\n      <ion-icon name=\"information-circle\"></ion-icon>\n      <ion-label>About</ion-label>\n    </ion-tab-button>\n  </ion-tab-bar>\n\n</ion-tabs>\n"

/***/ }),

/***/ "./src/app/pages/about-popover/about-popover.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/about-popover/about-popover.ts ***!
  \******************************************************/
/*! exports provided: PopoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverPage", function() { return PopoverPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



let PopoverPage = class PopoverPage {
    constructor(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    support() {
        // this.app.getRootNavs()[0].push('/support');
        this.popoverCtrl.dismiss();
    }
    close(url) {
        window.open(url, '_blank');
        this.popoverCtrl.dismiss();
    }
};
PopoverPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] }
];
PopoverPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: `
    <ion-list>
      <ion-item button (click)="close('https://ionicframework.com/getting-started')">
        <ion-label>Learn Ionic</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://ionicframework.com/docs/')">
        <ion-label>Documentation</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://showcase.ionicframework.com')">
        <ion-label>Showcase</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://github.com/ionic-team/ionic')">
        <ion-label>GitHub Repo</ion-label>
      </ion-item>
      <ion-item button (click)="support()">
        <ion-label>Support</ion-label>
      </ion-item>
    </ion-list>
  `
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"]])
], PopoverPage);



/***/ }),

/***/ "./src/app/pages/about/about-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/about/about-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AboutPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageRoutingModule", function() { return AboutPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about */ "./src/app/pages/about/about.ts");




const routes = [
    {
        path: '',
        component: _about__WEBPACK_IMPORTED_MODULE_3__["AboutPage"]
    }
];
let AboutPageRoutingModule = class AboutPageRoutingModule {
};
AboutPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AboutPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/about/about.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/about/about.module.ts ***!
  \*********************************************/
/*! exports provided: AboutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutModule", function() { return AboutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./about */ "./src/app/pages/about/about.ts");
/* harmony import */ var _about_popover_about_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../about-popover/about-popover */ "./src/app/pages/about-popover/about-popover.ts");
/* harmony import */ var _about_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./about-routing.module */ "./src/app/pages/about/about-routing.module.ts");








let AboutModule = class AboutModule {
};
AboutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _about_routing_module__WEBPACK_IMPORTED_MODULE_7__["AboutPageRoutingModule"]
        ],
        declarations: [_about__WEBPACK_IMPORTED_MODULE_5__["AboutPage"], _about_popover_about_popover__WEBPACK_IMPORTED_MODULE_6__["PopoverPage"]],
        entryComponents: [_about_popover_about_popover__WEBPACK_IMPORTED_MODULE_6__["PopoverPage"]],
        bootstrap: [_about__WEBPACK_IMPORTED_MODULE_5__["AboutPage"]],
    })
], AboutModule);



/***/ }),

/***/ "./src/app/pages/about/about.scss":
/*!****************************************!*\
  !*** ./src/app/pages/about/about.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".about-header {\n  background-color: white;\n  padding: 31px;\n  width: 100%;\n  height: 30%;\n  text-align: center;\n}\n\n.about-header img {\n  max-height: 100%;\n}\n\n.about-info p {\n  color: var(--ion-color-dark);\n  text-align: left;\n}\n\n.about-info ion-icon {\n  -webkit-margin-end: 32px;\n          margin-inline-end: 32px;\n}\n\n.ios .about-info {\n  text-align: center;\n  color: #0091ea;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvYWJvdXQvYWJvdXQuc2NzcyIsInNyYy9hcHAvcGFnZXMvYWJvdXQvYWJvdXQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0FDQ0Y7O0FER0E7RUFDRSw0QkFBQTtFQUNBLGdCQUFBO0FDQUY7O0FER0E7RUFDRSx3QkFBQTtVQUFBLHVCQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtFQUNBLGNBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Fib3V0L2Fib3V0LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWJvdXQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDMxcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDMwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYWJvdXQtaGVhZGVyIGltZyB7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG5cbn1cblxuLmFib3V0LWluZm8gcCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5hYm91dC1pbmZvIGlvbi1pY29uIHtcbiAgbWFyZ2luLWlubGluZS1lbmQ6IDMycHg7XG59XG5cbi5pb3MgLmFib3V0LWluZm8ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiMwMDkxZWE7XG59XG4iLCIuYWJvdXQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDMxcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDMwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYWJvdXQtaGVhZGVyIGltZyB7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG59XG5cbi5hYm91dC1pbmZvIHAge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWJvdXQtaW5mbyBpb24taWNvbiB7XG4gIG1hcmdpbi1pbmxpbmUtZW5kOiAzMnB4O1xufVxuXG4uaW9zIC5hYm91dC1pbmZvIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzAwOTFlYTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/about/about.ts":
/*!**************************************!*\
  !*** ./src/app/pages/about/about.ts ***!
  \**************************************/
/*! exports provided: AboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPage", function() { return AboutPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _about_popover_about_popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../about-popover/about-popover */ "./src/app/pages/about-popover/about-popover.ts");




let AboutPage = class AboutPage {
    constructor(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.conferenceDate = '2047-05-17';
    }
    presentPopover(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const popover = yield this.popoverCtrl.create({
                component: _about_popover_about_popover__WEBPACK_IMPORTED_MODULE_3__["PopoverPage"],
                event
            });
            yield popover.present();
        });
    }
};
AboutPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] }
];
AboutPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'page-about',
        template: __webpack_require__(/*! raw-loader!./about.html */ "./node_modules/raw-loader/index.js!./src/app/pages/about/about.html"),
        styles: [__webpack_require__(/*! ./about.scss */ "./src/app/pages/about/about.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"]])
], AboutPage);



/***/ }),

/***/ "./src/app/pages/bankmodal/bankmodal.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/bankmodal/bankmodal.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Jhbmttb2RhbC9iYW5rbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/bankmodal/bankmodal.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/bankmodal/bankmodal.component.ts ***!
  \********************************************************/
/*! exports provided: BankmodalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankmodalComponent", function() { return BankmodalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");




let BankmodalComponent = class BankmodalComponent {
    constructor(modalController, confData) {
        this.modalController = modalController;
        this.confData = confData;
        this.popularbanks = [];
        this.defaultHref = '';
    }
    ngOnInit() {
        this.banks = this.confData.banks;
        var popbanks = this.banks.filter(function (el) {
            return el['popular'];
        });
        var i = 0;
        var j = popbanks.length % 2;
        while (i < popbanks.length - j) {
            this.popularbanks.push([popbanks[i], popbanks[i + 1]]);
            i += 2;
        }
        let restbank = popbanks.slice(i);
        if (restbank.lenght % 2 != 0)
            restbank.push({ bank_id: null });
        this.popularbanks.push(restbank);
    }
    addFavorite(bank) {
        console.log(bank);
    }
    closeModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const onClosedData = "Wrapped Up!";
            yield this.modalController.dismiss(onClosedData);
        });
    }
};
BankmodalComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"] }
];
BankmodalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'bankmodal',
        template: __webpack_require__(/*! raw-loader!./bankmodal.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/bankmodal/bankmodal.component.html"),
        styles: [__webpack_require__(/*! ./bankmodal.component.scss */ "./src/app/pages/bankmodal/bankmodal.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"]])
], BankmodalComponent);



/***/ }),

/***/ "./src/app/pages/schedule-filter/schedule-filter.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/schedule-filter/schedule-filter.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".md ion-toolbar ion-button {\n  text-transform: capitalize;\n  letter-spacing: 0;\n}\n.md ion-checkbox {\n  --background-checked: transparent;\n  --border-color: transparent;\n  --border-color-checked: transparent;\n  --checkmark-color: var(--ion-color-primary);\n}\n.md ion-list {\n  background: inherit;\n}\n.ios ion-list-header {\n  height: 50px;\n  font-size: 22px;\n  letter-spacing: 0;\n  text-transform: capitalize;\n}\n.ios ion-label {\n  color: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvc2NoZWR1bGUtZmlsdGVyL3NjaGVkdWxlLWZpbHRlci5zY3NzIiwic3JjL2FwcC9wYWdlcy9zY2hlZHVsZS1maWx0ZXIvc2NoZWR1bGUtZmlsdGVyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0FDQUo7QURHRTtFQUNFLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQ0FBQTtFQUNBLDJDQUFBO0FDREo7QURJRTtFQUNFLG1CQUFBO0FDRko7QURTRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ05KO0FEU0U7RUFDRSwrQkFBQTtBQ1BKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvc2NoZWR1bGUtZmlsdGVyL3NjaGVkdWxlLWZpbHRlci5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1kIHtcbiAgaW9uLXRvb2xiYXIgaW9uLWJ1dHRvbiB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIH1cblxuICBpb24tY2hlY2tib3gge1xuICAgIC0tYmFja2dyb3VuZC1jaGVja2VkOiB0cmFuc3BhcmVudDtcbiAgICAtLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgLS1ib3JkZXItY29sb3ItY2hlY2tlZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1jaGVja21hcmstY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIGlvbi1saXN0IHtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICB9XG59XG5cbi5pb3Mge1xuICAvLyBUT0RPIHRoaXMgbmVlZHMgdG8gYmUgYWRkZWQgdG8gSW9uaWM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljL3B1bGwvMTY1NzRcbiAgaW9uLWxpc3QtaGVhZGVyIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICB9XG5cbiAgaW9uLWxhYmVsIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG59IiwiLm1kIGlvbi10b29sYmFyIGlvbi1idXR0b24ge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG59XG4ubWQgaW9uLWNoZWNrYm94IHtcbiAgLS1iYWNrZ3JvdW5kLWNoZWNrZWQ6IHRyYW5zcGFyZW50O1xuICAtLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIC0tYm9yZGVyLWNvbG9yLWNoZWNrZWQ6IHRyYW5zcGFyZW50O1xuICAtLWNoZWNrbWFyay1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuLm1kIGlvbi1saXN0IHtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbn1cblxuLmlvcyBpb24tbGlzdC1oZWFkZXIge1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuLmlvcyBpb24tbGFiZWwge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/schedule-filter/schedule-filter.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/schedule-filter/schedule-filter.ts ***!
  \**********************************************************/
/*! exports provided: ScheduleFilterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleFilterPage", function() { return ScheduleFilterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");




let ScheduleFilterPage = class ScheduleFilterPage {
    constructor(confData, config, modalCtrl, navParams) {
        this.confData = confData;
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.tracks = [];
    }
    ionViewWillEnter() {
        this.ios = this.config.get('mode') === `ios`;
    }
    // TODO use the ionViewDidEnter event
    ngAfterViewInit() {
    }
    selectAll(check) {
    }
    applyFilters() {
    }
    dismiss(data) {
    }
};
ScheduleFilterPage.ctorParameters = () => [
    { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Config"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavParams"] }
];
ScheduleFilterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'page-schedule-filter',
        template: __webpack_require__(/*! raw-loader!./schedule-filter.html */ "./node_modules/raw-loader/index.js!./src/app/pages/schedule-filter/schedule-filter.html"),
        styles: [__webpack_require__(/*! ./schedule-filter.scss */ "./src/app/pages/schedule-filter/schedule-filter.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Config"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavParams"]])
], ScheduleFilterPage);



/***/ }),

/***/ "./src/app/pages/schedule/schedule-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/schedule/schedule-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: SchedulePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePageRoutingModule", function() { return SchedulePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schedule */ "./src/app/pages/schedule/schedule.ts");




const routes = [
    {
        path: '',
        component: _schedule__WEBPACK_IMPORTED_MODULE_3__["SchedulePage"]
    }
];
let SchedulePageRoutingModule = class SchedulePageRoutingModule {
};
SchedulePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SchedulePageRoutingModule);



/***/ }),

/***/ "./src/app/pages/schedule/schedule.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/schedule/schedule.module.ts ***!
  \***************************************************/
/*! exports provided: ScheduleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleModule", function() { return ScheduleModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedule */ "./src/app/pages/schedule/schedule.ts");
/* harmony import */ var _schedule_filter_schedule_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schedule-filter/schedule-filter */ "./src/app/pages/schedule-filter/schedule-filter.ts");
/* harmony import */ var _schedule_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./schedule-routing.module */ "./src/app/pages/schedule/schedule-routing.module.ts");
/* harmony import */ var _bankmodal_bankmodal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../bankmodal/bankmodal.component */ "./src/app/pages/bankmodal/bankmodal.component.ts");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var _message_center_message_center_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../message-center/message-center.module */ "./src/app/pages/message-center/message-center.module.ts");











let ScheduleModule = class ScheduleModule {
};
ScheduleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _message_center_message_center_module__WEBPACK_IMPORTED_MODULE_10__["MessageCenterPageModule"],
            ng2_charts__WEBPACK_IMPORTED_MODULE_9__["ChartsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _schedule_routing_module__WEBPACK_IMPORTED_MODULE_7__["SchedulePageRoutingModule"]
        ],
        declarations: [
            _schedule__WEBPACK_IMPORTED_MODULE_5__["SchedulePage"],
            _bankmodal_bankmodal_component__WEBPACK_IMPORTED_MODULE_8__["BankmodalComponent"],
            _schedule_filter_schedule_filter__WEBPACK_IMPORTED_MODULE_6__["ScheduleFilterPage"]
        ],
        entryComponents: [
            _schedule_filter_schedule_filter__WEBPACK_IMPORTED_MODULE_6__["ScheduleFilterPage"],
            _bankmodal_bankmodal_component__WEBPACK_IMPORTED_MODULE_8__["BankmodalComponent"]
        ]
    })
], ScheduleModule);



/***/ }),

/***/ "./src/app/pages/schedule/schedule.scss":
/*!**********************************************!*\
  !*** ./src/app/pages/schedule/schedule.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-item-sliding[track=ionic] ion-label {\n  border-left: 2px solid var(--ion-color-primary);\n  padding-left: 10px;\n}\n\nion-item-sliding[track=angular] ion-label {\n  border-left: 2px solid #ac282b;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=communication] ion-label {\n  border-left: 2px solid #8e8d93;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=tooling] ion-label {\n  border-left: 2px solid #fe4c52;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=services] ion-label {\n  border-left: 2px solid #fd8b2d;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=design] ion-label {\n  border-left: 2px solid #fed035;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=workshop] ion-label {\n  border-left: 2px solid #69bb7b;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=food] ion-label {\n  border-left: 2px solid #3bc7c4;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=documentation] ion-label {\n  border-left: 2px solid #b16be3;\n  padding-left: 10px;\n}\n\nion-item-sliding[track=navigation] ion-label {\n  border-left: 2px solid #6600cc;\n  padding-left: 10px;\n}\n\ndiv.swiper-pagination {\n  top: 60px !important;\n  bottom: inherit;\n}\n\n.login-logo {\n  padding: 30px 0 0 0;\n  /*min-height: 150px;*/\n  text-align: center;\n}\n\n.login-logo img {\n  max-width: 150px;\n}\n\n.list {\n  margin-bottom: 0;\n}\n\nion-spinner {\n  -webkit-transform: scale(10);\n          transform: scale(10);\n}\n\n.loader {\n  margin: auto;\n  border: 16px solid #f3f3f3;\n  /* Light grey */\n  border-top: 16px solid #3498E9;\n  /* Blue */\n  border-radius: 50%;\n  width: 150px;\n  height: 150px;\n  -webkit-animation: spin 2s linear infinite;\n          animation: spin 2s linear infinite;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n.card-title {\n  color: black;\n  font-size: 20px;\n  font-weight: 700;\n  margin-bottom: 5px;\n  line-height: 17px;\n}\n\n.card-category {\n  font-size: 10px;\n  color: cadetblue;\n  font-size: 17px;\n  line-height: 17px;\n}\n\n.card-body {\n  -webkit-box-flex: 1;\n  flex: 1 1 auto;\n  padding: 1.5rem;\n}\n\n.bg-gradient-default {\n  background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important;\n  /* padding-top: 12px; */\n}\n\n.shadow, .card-profile-image img {\n  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;\n}\n\n.card-header {\n  padding: 1.25rem 1.5rem;\n  margin-bottom: 0;\n}\n\n.bg-transparent {\n  background-color: transparent !important;\n}\n\n.card-link {\n  text-decoration: underline;\n  margin: auto;\n  color: #0cd1e8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvc2NoZWR1bGUvc2NoZWR1bGUuc2NzcyIsInNyYy9hcHAvcGFnZXMvc2NoZWR1bGUvc2NoZWR1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjRTtFQUNFLCtDQUFBO0VBQ0Esa0JBQUE7QUNiSjs7QURXRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNSSjs7QURNRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNISjs7QURDRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNFSjs7QURKRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNPSjs7QURURTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNZSjs7QURkRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNpQko7O0FEbkJFO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtBQ3NCSjs7QUR4QkU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0FDMkJKOztBRDdCRTtFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7QUNnQ0o7O0FENUJBO0VBQ0csb0JBQUE7RUFDQSxlQUFBO0FDK0JIOztBRDVCQTtFQUNFLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQytCRjs7QUQ1QkE7RUFDRSxnQkFBQTtBQytCRjs7QUQ1QkE7RUFDRSxnQkFBQTtBQytCRjs7QUQ3QkE7RUFDUSw0QkFBQTtVQUFBLG9CQUFBO0FDZ0NSOztBRDlCQTtFQUNFLFlBQUE7RUFDQSwwQkFBQTtFQUE0QixlQUFBO0VBQzVCLDhCQUFBO0VBQWdDLFNBQUE7RUFDaEMsa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBDQUFBO1VBQUEsa0NBQUE7QUNtQ0Y7O0FEaENBO0VBQ0U7SUFBSywrQkFBQTtZQUFBLHVCQUFBO0VDb0NMO0VEbkNBO0lBQU8saUNBQUE7WUFBQSx5QkFBQTtFQ3NDUDtBQUNGOztBRHpDQTtFQUNFO0lBQUssK0JBQUE7WUFBQSx1QkFBQTtFQ29DTDtFRG5DQTtJQUFPLGlDQUFBO1lBQUEseUJBQUE7RUNzQ1A7QUFDRjs7QURwQ0E7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ3NDSjs7QURuQ0E7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNzQ0o7O0FEbkNBO0VBQ0UsbUJBQUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQ3NDSjs7QURsQ0E7RUFDSSxzRUFBQTtFQUNBLHVCQUFBO0FDcUNKOztBRG5DQTtFQUNJLDJEQUFBO0FDc0NKOztBRHBDQTtFQUNJLHVCQUFBO0VBQ0EsZ0JBQUE7QUN1Q0o7O0FEckNBO0VBQ0ksd0NBQUE7QUN3Q0o7O0FEdENBO0VBRUUsMEJBQUE7RUFDRSxZQUFBO0VBQ0EsY0FBQTtBQ3dDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NjaGVkdWxlL3NjaGVkdWxlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkY2F0ZWdvcmllczogKFxuICBpb25pYzogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpLFxuICBhbmd1bGFyOiAjYWMyODJiLFxuICBjb21tdW5pY2F0aW9uOiAjOGU4ZDkzLFxuICB0b29saW5nOiAjZmU0YzUyLFxuICBzZXJ2aWNlczogI2ZkOGIyZCxcbiAgZGVzaWduOiAjZmVkMDM1LFxuICB3b3Jrc2hvcDogIzY5YmI3YixcbiAgZm9vZDogIzNiYzdjNCxcbiAgZG9jdW1lbnRhdGlvbjogI2IxNmJlMyxcbiAgbmF2aWdhdGlvbjogIzY2MDBjY1xuKTtcblxuQGVhY2ggJHRyYWNrLCAkdmFsdWUgaW4gbWFwLXJlbW92ZSgkY2F0ZWdvcmllcykge1xuICBpb24taXRlbS1zbGlkaW5nW3RyYWNrPScjeyR0cmFja30nXSBpb24tbGFiZWwge1xuICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgJHZhbHVlO1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgfVxufVxuXG5kaXYuc3dpcGVyLXBhZ2luYXRpb24ge1xuICAgdG9wOjYwcHggIWltcG9ydGFudDtcbiAgIGJvdHRvbTppbmhlcml0O1xufVxuXG4ubG9naW4tbG9nbyB7XG4gIHBhZGRpbmc6IDMwcHggMCAwIDA7XG4gIC8qbWluLWhlaWdodDogMTUwcHg7Ki9cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubG9naW4tbG9nbyBpbWcge1xuICBtYXgtd2lkdGg6IDE1MHB4O1xufVxuXG4ubGlzdCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5pb24tc3Bpbm5lciAge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEwKTtcbn1cbi5sb2FkZXIge1xuICBtYXJnaW46YXV0bztcbiAgYm9yZGVyOiAxNnB4IHNvbGlkICNmM2YzZjM7IC8qIExpZ2h0IGdyZXkgKi9cbiAgYm9yZGVyLXRvcDogMTZweCBzb2xpZCAjMzQ5OEU5OyAvKiBCbHVlICovXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6MTUwcHg7XG4gIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbn1cblxuLmNhcmQtdGl0bGV7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIG1hcmdpbi1ib3R0b206NXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xuXG59XG4uY2FyZC1jYXRlZ29yeXtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgY29sb3I6IGNhZGV0Ymx1ZTtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE3cHg7XG5cbn1cbi5jYXJkLWJvZHl7XG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgcGFkZGluZzogMS41cmVtO1xufVxuXG5cbi5iZy1ncmFkaWVudC1kZWZhdWx0IHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoODdkZWcsICMxNzJiNGQgMCwgIzFhMTc0ZCAxMDAlKSAhaW1wb3J0YW50O1xuICAgIC8qIHBhZGRpbmctdG9wOiAxMnB4OyAqL1xufVxuLnNoYWRvdywgLmNhcmQtcHJvZmlsZS1pbWFnZSBpbWcge1xuICAgIGJveC1zaGFkb3c6IDAgMCAycmVtIDAgcmdiYSgxMzYsIDE1MiwgMTcwLCAwLjE1KSAhaW1wb3J0YW50O1xufVxuLmNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nOiAxLjI1cmVtIDEuNXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLmJnLXRyYW5zcGFyZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuLmNhcmQtbGluayB7XG5cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGNvbG9yOiAjMGNkMWU4O1xufVxuXG5cblxuXG4iLCJpb24taXRlbS1zbGlkaW5nW3RyYWNrPWlvbmljXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG5pb24taXRlbS1zbGlkaW5nW3RyYWNrPWFuZ3VsYXJdIGlvbi1sYWJlbCB7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgI2FjMjgyYjtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG5pb24taXRlbS1zbGlkaW5nW3RyYWNrPWNvbW11bmljYXRpb25dIGlvbi1sYWJlbCB7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzhlOGQ5MztcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG5pb24taXRlbS1zbGlkaW5nW3RyYWNrPXRvb2xpbmddIGlvbi1sYWJlbCB7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgI2ZlNGM1MjtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG5pb24taXRlbS1zbGlkaW5nW3RyYWNrPXNlcnZpY2VzXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNmZDhiMmQ7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1kZXNpZ25dIGlvbi1sYWJlbCB7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgI2ZlZDAzNTtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG5pb24taXRlbS1zbGlkaW5nW3RyYWNrPXdvcmtzaG9wXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICM2OWJiN2I7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1mb29kXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICMzYmM3YzQ7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1kb2N1bWVudGF0aW9uXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNiMTZiZTM7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuaW9uLWl0ZW0tc2xpZGluZ1t0cmFjaz1uYXZpZ2F0aW9uXSBpb24tbGFiZWwge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICM2NjAwY2M7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuZGl2LnN3aXBlci1wYWdpbmF0aW9uIHtcbiAgdG9wOiA2MHB4ICFpbXBvcnRhbnQ7XG4gIGJvdHRvbTogaW5oZXJpdDtcbn1cblxuLmxvZ2luLWxvZ28ge1xuICBwYWRkaW5nOiAzMHB4IDAgMCAwO1xuICAvKm1pbi1oZWlnaHQ6IDE1MHB4OyovXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxvZ2luLWxvZ28gaW1nIHtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbn1cblxuLmxpc3Qge1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG5pb24tc3Bpbm5lciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMTApO1xufVxuXG4ubG9hZGVyIHtcbiAgbWFyZ2luOiBhdXRvO1xuICBib3JkZXI6IDE2cHggc29saWQgI2YzZjNmMztcbiAgLyogTGlnaHQgZ3JleSAqL1xuICBib3JkZXItdG9wOiAxNnB4IHNvbGlkICMzNDk4RTk7XG4gIC8qIEJsdWUgKi9cbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogMTUwcHg7XG4gIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG4uY2FyZC10aXRsZSB7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxN3B4O1xufVxuXG4uY2FyZC1jYXRlZ29yeSB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgY29sb3I6IGNhZGV0Ymx1ZTtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBsaW5lLWhlaWdodDogMTdweDtcbn1cblxuLmNhcmQtYm9keSB7XG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBwYWRkaW5nOiAxLjVyZW07XG59XG5cbi5iZy1ncmFkaWVudC1kZWZhdWx0IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDg3ZGVnLCAjMTcyYjRkIDAsICMxYTE3NGQgMTAwJSkgIWltcG9ydGFudDtcbiAgLyogcGFkZGluZy10b3A6IDEycHg7ICovXG59XG5cbi5zaGFkb3csIC5jYXJkLXByb2ZpbGUtaW1hZ2UgaW1nIHtcbiAgYm94LXNoYWRvdzogMCAwIDJyZW0gMCByZ2JhKDEzNiwgMTUyLCAxNzAsIDAuMTUpICFpbXBvcnRhbnQ7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIHBhZGRpbmc6IDEuMjVyZW0gMS41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4uYmctdHJhbnNwYXJlbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuXG4uY2FyZC1saW5rIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIG1hcmdpbjogYXV0bztcbiAgY29sb3I6ICMwY2QxZTg7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/schedule/schedule.ts":
/*!********************************************!*\
  !*** ./src/app/pages/schedule/schedule.ts ***!
  \********************************************/
/*! exports provided: SchedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePage", function() { return SchedulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");
/* harmony import */ var _providers_user_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../providers/user-data */ "./src/app/providers/user-data.ts");
/* harmony import */ var _bankmodal_bankmodal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../bankmodal/bankmodal.component */ "./src/app/pages/bankmodal/bankmodal.component.ts");







let SchedulePage = class SchedulePage {
    constructor(alertCtrl, confData, loadingCtrl, router, toastCtrl, user, config, modalController) {
        this.alertCtrl = alertCtrl;
        this.confData = confData;
        this.loadingCtrl = loadingCtrl;
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.user = user;
        this.config = config;
        this.modalController = modalController;
        this.dayIndex = 0;
        this.queryText = '';
        this.segment = 'all';
        this.excludeTracks = [];
        this.shownSessions = [];
        this.groups = [];
        this.dictkeys = [];
        this.totalbalance = 0;
        this.listaccounts = {};
        this.graphdata = 0;
        this.chartsdata = { data: [
                { data: [65, 800, 760, 400, 1300, 400, 340.84], label: 'Solde' }
            ], labels: ['January', '', '', 'April', '', '', 'July'], type: 'line' };
        this.chartsdata2 = { data: [
                { data: [100, 500, 760, 800, 1000, 2000, 5600], label: 'Epargne' }
            ], labels: ['January', '', '', 'April', '', '', 'July'], type: 'line' };
        this.chartsdata3 = { data: [
                [120, 90, 110, 300]
            ], labels: ['Courses', 'Restaurants', 'Cash et divers', 'Loyer'], type: 'doughnut' };
        confData.getchangement().subscribe((data) => {
            console.log('hi');
            this.ionViewDidEnter();
        });
    }
    ionViewDidEnter() {
        this.data = this.confData.getdata();
        //this.listaccounts=this.data['comptes'];
        this.dictkeys = Object.keys(this.data['comptes']);
        this.totalbalance = 0;
        for (let i = 0; i < this.dictkeys.length; i++) {
            for (let j = 0; j < this.data['comptes'][this.dictkeys[i]].length; j++) {
                this.totalbalance += Number(this.data['comptes'][this.dictkeys[i]][j]['Montant'].replace(' ', ''));
            }
        }
        this.totalbalance = this.totalbalance.toFixed(2);
        this.ios = this.config.get('mode') === 'ios';
    }
    ngAfterViewInit() {
        //Chart.defaults.global.legend.display = false;
        console.log('ok');
        if (!this.data.loading) {
            /*
            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                type: "line",
                data: {
                  labels: ["Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mardi"],
                  datasets: [
                    { label:"Solde",
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
                      data: [2300, 1500, 1000, -300, 2500, 1000, 230],
                      spanGaps: false
                    }
                  ]
                }
              });*/
            console.log('ok');
        }
    }
    ngOnInit() {
        //this.updateSchedule();
        this.data = this.confData.getdata();
        console.log(this.data);
        this.totalbalance = 0;
        //this.listaccounts=this.data['comptes'];
        this.dictkeys = Object.keys(this.data['comptes']);
        for (let i = 0; i < this.dictkeys.length; i++) {
            for (let j = 0; j < this.data['comptes'][this.dictkeys[i]].length; j++) {
                this.totalbalance += Number(this.data['comptes'][this.dictkeys[i]][j]['Montant'].replace(' ', ''));
            }
        }
        this.totalbalance = this.totalbalance.toFixed(2);
        this.ios = this.config.get('mode') === 'ios';
    }
    openModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _bankmodal_bankmodal_component__WEBPACK_IMPORTED_MODULE_6__["BankmodalComponent"],
                componentProps: {}
            });
            return yield modal.present();
        });
    }
    getgraph(testSlider) {
        testSlider.getActiveIndex().then(index => {
            this.graphdata = index;
            console.log(this.graphdata);
        });
        ;
    }
    nex() {
        this.slides.slideNext();
    }
    prev() {
        this.slides.slidePrev();
    }
};
SchedulePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_4__["ConferenceData"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
    { type: _providers_user_data__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Config"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('scheduleList', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonList"])
], SchedulePage.prototype, "scheduleList", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('testSlider', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonSlides"])
], SchedulePage.prototype, "slides", void 0);
SchedulePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'page-schedule',
        template: __webpack_require__(/*! raw-loader!./schedule.html */ "./node_modules/raw-loader/index.js!./src/app/pages/schedule/schedule.html"),
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
        styles: [__webpack_require__(/*! ./schedule.scss */ "./src/app/pages/schedule/schedule.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _providers_conference_data__WEBPACK_IMPORTED_MODULE_4__["ConferenceData"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
        _providers_user_data__WEBPACK_IMPORTED_MODULE_5__["UserData"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Config"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
], SchedulePage);



/***/ }),

/***/ "./src/app/pages/session-detail/session-detail-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/session-detail/session-detail-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: SessionDetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionDetailPageRoutingModule", function() { return SessionDetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _session_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./session-detail */ "./src/app/pages/session-detail/session-detail.ts");




const routes = [
    {
        path: '',
        component: _session_detail__WEBPACK_IMPORTED_MODULE_3__["SessionDetailPage"]
    }
];
let SessionDetailPageRoutingModule = class SessionDetailPageRoutingModule {
};
SessionDetailPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SessionDetailPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/session-detail/session-detail.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/session-detail/session-detail.module.ts ***!
  \***************************************************************/
/*! exports provided: SessionDetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionDetailModule", function() { return SessionDetailModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _session_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./session-detail */ "./src/app/pages/session-detail/session-detail.ts");
/* harmony import */ var _session_detail_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./session-detail-routing.module */ "./src/app/pages/session-detail/session-detail-routing.module.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");






let SessionDetailModule = class SessionDetailModule {
};
SessionDetailModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _session_detail_routing_module__WEBPACK_IMPORTED_MODULE_4__["SessionDetailPageRoutingModule"]
        ],
        declarations: [
            _session_detail__WEBPACK_IMPORTED_MODULE_3__["SessionDetailPage"],
        ]
    })
], SessionDetailModule);



/***/ }),

/***/ "./src/app/pages/session-detail/session-detail.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/session-detail/session-detail.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".session-track-ionic {\n  color: var(--ion-color-primary);\n}\n\n.session-track-angular {\n  color: var(--ion-color-angular);\n}\n\n.session-track-communication {\n  color: var(--ion-color-communication);\n}\n\n.session-track-tooling {\n  color: var(--ion-color-tooling);\n}\n\n.session-track-services {\n  color: var(--ion-color-services);\n}\n\n.session-track-design {\n  color: var(--ion-color-design);\n}\n\n.session-track-workshop {\n  color: var(--ion-color-workshop);\n}\n\n.session-track-food {\n  color: var(--ion-color-food);\n}\n\n.session-track-documentation {\n  color: var(--ion-color-documentation);\n}\n\n.session-track-navigation {\n  color: var(--ion-color-navigation);\n}\n\n.show-favorite {\n  position: relative;\n}\n\n.icon-heart-empty {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition: -webkit-transform 0.3s ease;\n  transition: -webkit-transform 0.3s ease;\n  transition: transform 0.3s ease;\n  transition: transform 0.3s ease, -webkit-transform 0.3s ease;\n}\n\n.icon-heart {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform 0.3s ease;\n  transition: -webkit-transform 0.3s ease;\n  transition: transform 0.3s ease;\n  transition: transform 0.3s ease, -webkit-transform 0.3s ease;\n}\n\n.show-favorite .icon-heart {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n\n.show-favorite .icon-heart-empty {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\nh1 {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvc2Vzc2lvbi1kZXRhaWwvc2Vzc2lvbi1kZXRhaWwuc2NzcyIsInNyYy9hcHAvcGFnZXMvc2Vzc2lvbi1kZXRhaWwvc2Vzc2lvbi1kZXRhaWwuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLCtCQUFBO0FDQ0Y7O0FERUE7RUFDRSwrQkFBQTtBQ0NGOztBREVBO0VBQ0UscUNBQUE7QUNDRjs7QURFQTtFQUNFLCtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQ0FBQTtBQ0NGOztBREVBO0VBQ0UsOEJBQUE7QUNDRjs7QURFQTtFQUNFLGdDQUFBO0FDQ0Y7O0FERUE7RUFDRSw0QkFBQTtBQ0NGOztBREVBO0VBQ0UscUNBQUE7QUNDRjs7QURFQTtFQUNFLGtDQUFBO0FDQ0Y7O0FERUE7RUFDRSxrQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFDQSwrQ0FBQTtFQUFBLHVDQUFBO0VBQUEsK0JBQUE7RUFBQSw0REFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFDQSwrQ0FBQTtFQUFBLHVDQUFBO0VBQUEsK0JBQUE7RUFBQSw0REFBQTtBQ0NGOztBREVBO0VBQ0UsMkJBQUE7VUFBQSxtQkFBQTtBQ0NGOztBREVBO0VBQ0UsMkJBQUE7VUFBQSxtQkFBQTtBQ0NGOztBREVBO0VBQ0UsU0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvc2Vzc2lvbi1kZXRhaWwvc2Vzc2lvbi1kZXRhaWwuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZXNzaW9uLXRyYWNrLWlvbmljIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLnNlc3Npb24tdHJhY2stYW5ndWxhciB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItYW5ndWxhcik7XG59XG5cbi5zZXNzaW9uLXRyYWNrLWNvbW11bmljYXRpb24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWNvbW11bmljYXRpb24pO1xufVxuXG4uc2Vzc2lvbi10cmFjay10b29saW5nIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci10b29saW5nKTtcbn1cblxuLnNlc3Npb24tdHJhY2stc2VydmljZXMge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlcnZpY2VzKTtcbn1cblxuLnNlc3Npb24tdHJhY2stZGVzaWduIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kZXNpZ24pO1xufVxuXG4uc2Vzc2lvbi10cmFjay13b3Jrc2hvcCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd29ya3Nob3ApO1xufVxuXG4uc2Vzc2lvbi10cmFjay1mb29kIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1mb29kKTtcbn1cblxuLnNlc3Npb24tdHJhY2stZG9jdW1lbnRhdGlvbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZG9jdW1lbnRhdGlvbik7XG59XG5cbi5zZXNzaW9uLXRyYWNrLW5hdmlnYXRpb24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW5hdmlnYXRpb24pO1xufVxuXG4uc2hvdy1mYXZvcml0ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmljb24taGVhcnQtZW1wdHkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICByaWdodDogNXB4O1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4uaWNvbi1oZWFydCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1cHg7XG4gIHJpZ2h0OiA1cHg7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG5cbi5zaG93LWZhdm9yaXRlIC5pY29uLWhlYXJ0IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cblxuLnNob3ctZmF2b3JpdGUgLmljb24taGVhcnQtZW1wdHkge1xuICB0cmFuc2Zvcm06IHNjYWxlKDApO1xufVxuXG5oMSB7XG4gIG1hcmdpbjogMDtcbn0iLCIuc2Vzc2lvbi10cmFjay1pb25pYyB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5zZXNzaW9uLXRyYWNrLWFuZ3VsYXIge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWFuZ3VsYXIpO1xufVxuXG4uc2Vzc2lvbi10cmFjay1jb21tdW5pY2F0aW9uIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1jb21tdW5pY2F0aW9uKTtcbn1cblxuLnNlc3Npb24tdHJhY2stdG9vbGluZyB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdG9vbGluZyk7XG59XG5cbi5zZXNzaW9uLXRyYWNrLXNlcnZpY2VzIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZXJ2aWNlcyk7XG59XG5cbi5zZXNzaW9uLXRyYWNrLWRlc2lnbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGVzaWduKTtcbn1cblxuLnNlc3Npb24tdHJhY2std29ya3Nob3Age1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXdvcmtzaG9wKTtcbn1cblxuLnNlc3Npb24tdHJhY2stZm9vZCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZm9vZCk7XG59XG5cbi5zZXNzaW9uLXRyYWNrLWRvY3VtZW50YXRpb24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRvY3VtZW50YXRpb24pO1xufVxuXG4uc2Vzc2lvbi10cmFjay1uYXZpZ2F0aW9uIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1uYXZpZ2F0aW9uKTtcbn1cblxuLnNob3ctZmF2b3JpdGUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5pY29uLWhlYXJ0LWVtcHR5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDVweDtcbiAgcmlnaHQ6IDVweDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cblxuLmljb24taGVhcnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICByaWdodDogNXB4O1xuICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4uc2hvdy1mYXZvcml0ZSAuaWNvbi1oZWFydCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbi5zaG93LWZhdm9yaXRlIC5pY29uLWhlYXJ0LWVtcHR5IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbn1cblxuaDEge1xuICBtYXJnaW46IDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/session-detail/session-detail.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/session-detail/session-detail.ts ***!
  \********************************************************/
/*! exports provided: SessionDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionDetailPage", function() { return SessionDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _providers_user_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/user-data */ "./src/app/providers/user-data.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");






let SessionDetailPage = class SessionDetailPage {
    constructor(dataProvider, userProvider, route, location) {
        this.dataProvider = dataProvider;
        this.userProvider = userProvider;
        this.route = route;
        this.location = location;
        this.isFavorite = false;
        this.defaultHref = '';
    }
    ionViewWillEnter() {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        this.transactions = this.dataProvider.gettransactions(sessionId);
        this.dictkeys = Object.keys(this.transactions);
    }
    ionViewDidEnter() {
    }
    myBackButton() {
        this.location.back();
    }
};
SessionDetailPage.ctorParameters = () => [
    { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_2__["ConferenceData"] },
    { type: _providers_user_data__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"] }
];
SessionDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'page-session-detail',
        template: __webpack_require__(/*! raw-loader!./session-detail.html */ "./node_modules/raw-loader/index.js!./src/app/pages/session-detail/session-detail.html"),
        styles: [__webpack_require__(/*! ./session-detail.scss */ "./src/app/pages/session-detail/session-detail.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_providers_conference_data__WEBPACK_IMPORTED_MODULE_2__["ConferenceData"],
        _providers_user_data__WEBPACK_IMPORTED_MODULE_4__["UserData"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]])
], SessionDetailPage);



/***/ }),

/***/ "./src/app/pages/tabs-page/tabs-page-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/tabs-page/tabs-page-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: TabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageRoutingModule", function() { return TabsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs-page */ "./src/app/pages/tabs-page/tabs-page.ts");
/* harmony import */ var _schedule_schedule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../schedule/schedule */ "./src/app/pages/schedule/schedule.ts");





const routes = [
    {
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_3__["TabsPage"],
        children: [
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        component: _schedule_schedule__WEBPACK_IMPORTED_MODULE_4__["SchedulePage"],
                    },
                    {
                        path: 'session/:sessionId',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../session-detail/session-detail.module */ "./src/app/pages/session-detail/session-detail.module.ts")).then(m => m.SessionDetailModule)
                    }
                ]
            },
            {
                path: 'map',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../map/map.module */ "./src/app/pages/map/map.module.ts")).then(m => m.MapModule)
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../about/about.module */ "./src/app/pages/about/about.module.ts")).then(m => m.AboutModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/tabs/schedule',
                pathMatch: 'full'
            }
        ]
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], TabsPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/tabs-page/tabs-page.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/tabs-page/tabs-page.module.ts ***!
  \*****************************************************/
/*! exports provided: TabsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsModule", function() { return TabsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabs-page */ "./src/app/pages/tabs-page/tabs-page.ts");
/* harmony import */ var _tabs_page_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs-page-routing.module */ "./src/app/pages/tabs-page/tabs-page-routing.module.ts");
/* harmony import */ var _about_about_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../about/about.module */ "./src/app/pages/about/about.module.ts");
/* harmony import */ var _map_map_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../map/map.module */ "./src/app/pages/map/map.module.ts");
/* harmony import */ var _schedule_schedule_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../schedule/schedule.module */ "./src/app/pages/schedule/schedule.module.ts");
/* harmony import */ var _session_detail_session_detail_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../session-detail/session-detail.module */ "./src/app/pages/session-detail/session-detail.module.ts");










let TabsModule = class TabsModule {
};
TabsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _about_about_module__WEBPACK_IMPORTED_MODULE_6__["AboutModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _map_map_module__WEBPACK_IMPORTED_MODULE_7__["MapModule"],
            _schedule_schedule_module__WEBPACK_IMPORTED_MODULE_8__["ScheduleModule"],
            _session_detail_session_detail_module__WEBPACK_IMPORTED_MODULE_9__["SessionDetailModule"],
            _tabs_page_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabsPageRoutingModule"]
        ],
        declarations: [
            _tabs_page__WEBPACK_IMPORTED_MODULE_4__["TabsPage"]
        ]
    })
], TabsModule);



/***/ }),

/***/ "./src/app/pages/tabs-page/tabs-page.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/tabs-page/tabs-page.ts ***!
  \**********************************************/
/*! exports provided: TabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPage", function() { return TabsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let TabsPage = class TabsPage {
};
TabsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'tabs-page',
        template: __webpack_require__(/*! raw-loader!./tabs-page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/tabs-page/tabs-page.html")
    })
], TabsPage);



/***/ })

}]);
//# sourceMappingURL=pages-tabs-page-tabs-page-module-es2015.js.map