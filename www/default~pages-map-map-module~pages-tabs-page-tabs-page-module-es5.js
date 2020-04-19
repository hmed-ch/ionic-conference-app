(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-map-map-module~pages-tabs-page-tabs-page-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/map/map.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/map/map.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>Insights</ion-title>\n\n    \n  </ion-toolbar>\n\n  <!--ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"queryText\" (ionChange)=\"updateSchedule()\" placeholder=\"Search\"></ion-searchbar>\n  </ion-toolbar-->\n</ion-header>\n<ion-content>\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/graph.svg\"><div >\n    <div class=\"card-title\">Bravo! vous économisez 300 dinars par mois en moyenne</div>\n    <div class=\"card-text\">Savez-vous combien vous aurez à la retraite?</div>\n  </div>\n  </div>\n  <div  justify-content-end class=\"card-buttons\"><a  class=\"card-link\"  (click)=\"sendmessage(-1,6)\">En savoir plus</a><ion-button color=\"primary\" mode=\"ios\"(click)=\"sendmessage(-1,6)\" > Simuler</ion-button>\n  </div></ion-card-content>\n</ion-card>\n  \n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/warning.svg\"><div >\n    <div class=\"card-title\">Vous risquez d'avoir un découvert</div>\n    <div class=\"card-text\">Votre solde n'est pas suffisante pour les dépenses de ce mois-ci</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><a  class=\"card-link\" (click)=\"sendmessage(-1,1)\">En savoir plus</a><ion-button color=\"primary\" mode=\"ios\" (click)=\"sendmessage(-1,4)\">Solutions</ion-button>\n  </div></ion-card-content>\n</ion-card>\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/medal.svg\"><div >\n    <div class=\"card-title\">Bravo ! Vous avez atteint votre objective </div>\n    <div class=\"card-text\">Vous avez economisé 300 dinars!</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><ion-button color=\"primary\" mode=\"ios\"(click)=\"sendmessage(-1,5)\" >Nouvel objectif</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/cancel.svg\"><div >\n    <div class=\"card-title\">Vous avez payé Ooredoo 3 fois!</div>\n    <div class=\"card-text\">Y-a-t'il une erreur ?</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><a  class=\"card-link\" (click)=\"sendmessage(-1,2)\">En savoir plus</a><ion-button color=\"primary\" mode=\"ios\" (click)=\"sendmessage(-1,3)\">Solutions</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/warning.svg\"><div >\n    <div class=\"card-title\">Votre assurance vous coûte trop cher!</div>\n    <div class=\"card-text\">Vous pouvez économiser sur votre assurance auto</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><ion-button  color=\"primary\" mode=\"ios\">En savoir plus</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/best.svg\"><div >\n    <div class=\"card-title\">C'est le meilleur jour du mois!</div>\n    <div class=\"card-text\">Votre salaire vient d'être déposé</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><ion-button  color=\"primary\" mode=\"ios\" >voir transaction</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/loan.svg\"><div >\n    <div class=\"card-title\">Vous êtes pré-qualifié pour un crédit</div>\n    <div class=\"card-text\">Vous pouvez emprunter jusqu'à 45 000 dinars</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><ion-button  color=\"primary\" mode=\"ios\" >En savoir plus</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/saving.svg\"><div >\n    <div class=\"card-title\">Profiter des intérêt sur votre argent</div>\n    <div class=\"card-text\">Placer votre excédent dans un compte d'épargne</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><a  class=\"card-link\" >En savoir plus</a><ion-button  color=\"primary\" mode=\"ios\" >Transfert d'argent</ion-button>\n  </div></ion-card-content>\n</ion-card>\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/saving.svg\"><div >\n    <div class=\"card-title\">Il est temps de alimenter votre compte d'épargne</div>\n    <div class=\"card-text\">Il reste 400 dinars pour garantir des vacances réussies</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><a  class=\"card-link\" >En savoir plus</a><ion-button  color=\"primary\" mode=\"ios\" >Faire des économies</ion-button>\n  </div></ion-card-content>\n</ion-card>\n<ion-card  mode=\"ios\">\n  <ion-card-content  style=\"background: aliceblue;\">\n  <div  class=\"card-content\"><img class=\"card-img\" src=\"assets/img/travel.svg\"><div >\n    <div class=\"card-title\">Planifier pour votre prochain voyage</div>\n    <div class=\"card-text\">Tout est une question de planification</div>\n  </div>\n  </div>\n  <div  class=\"card-buttons\" justify-content-end><a  class=\"card-link\" >En savoir plus</a><ion-button  color=\"primary\" mode=\"ios\" >Faire des économies</ion-button>\n  </div></ion-card-content>\n</ion-card>\n\n   <!-->\n\n   <ion-slides  pager=true style=\"height: 95%;\">\n   <ion-slide>\n\n   <ion-grid>\n   \n\n  <ion-row >\n      <canvas #doughnutCanvas></canvas>\n      </ion-row>\n   \n            <ion-row style=\"margin-top:4%\">\n          <div class=\"card-content\">\n                   <img class=\"card-img\" src=\"assets/img/budget.svg\">\n                <div class=\"card-title\">You spent 80% of your monthly shopping budget</div>\n                  <div class=\"card-text\">Define and follow your budgets!</div>\n                </div>\n          \n          \n          </ion-row>\n          <ion-row style=\"margin-top:1%\">\n          <div class=\"card-buttons\">\n\n                <ion-button mode=\"ios\" color=\"primary\" routerLink=\"/support\" >Edit budget</ion-button>\n\n              </div>\n              </ion-row>\n        </ion-grid>\n\n        </ion-slide>\n\n        <ion-slide>\n   <ion-grid>\n   \n\n  <ion-row >\n      <canvas #barCanvas></canvas>\n      </ion-row>\n   \n            <ion-row style=\"margin-top:4%\">\n          <div class=\"card-content\">\n                   <img class=\"card-img\" src=\"assets/img/Shopping.svg\">\n                <div class=\"card-title\">You are spending 25% more on groceries than your peers</div>\n                  <div class=\"card-text\">Set an objective and save money!</div>\n                </div>\n          \n          \n          </ion-row>\n          <ion-row style=\"margin-top:1%\">\n          <div class=\"card-buttons\">\n\n                <ion-button mode=\"ios\" color=\"primary\" routerLink=\"/support\" >Set Objective</ion-button>\n\n              </div>\n              </ion-row>\n        </ion-grid>\n\n        </ion-slide>\n\n        <ion-slide>\n   <ion-grid>\n   \n\n  <ion-row >\n      <canvas #lineCanvas></canvas>\n      </ion-row>\n   \n            <ion-row style=\"margin-top:4%\">\n          <div class=\"card-content\">\n                   <img class=\"card-img\" src=\"assets/img/warning.svg\">\n                <div class=\"card-title\">Upcoming payments, it’s likely you’ll go overdrawn next week!</div>\n                  <div class=\"card-text\">Make a transfer</div>\n                </div>\n          \n          \n          </ion-row>\n          <ion-row style=\"margin-top:1%\">\n          <div class=\"card-buttons\">\n\n                <ion-button mode=\"ios\" color=\"primary\" routerLink=\"/support\" >Transfer</ion-button>\n\n              </div>\n              </ion-row>\n        </ion-grid>\n\n        </ion-slide>\n        \n        \n        \n   </ion-slides>\n   <-->\n   \n   \n      \n      <!--ion-list>\n\n      \n        \t<ion-card mode=\"ios\" style=\"background-color: aliceblue;\">\n          \n\n            <ion-card-content mode=\"ios\" >\n            <div class=\"card-content\">\n              \t<img class=\"card-img\" src=\"assets/img/piggy-bank.svg\">\n                <div class=\"card-title\">You spent 80% of your monthly shopping budget</div>\n                  <div class=\"card-text\">Define and follow your budgets!</div>\n                </div>\n\n                 \n              <div class=\"card-buttons\">\n\n                <ion-button mode=\"ios\" color=\"primary\" routerLink=\"/support\" >Start Objective</ion-button>\n\n              </div>\n\n            </ion-card-content>\n          </ion-card>\n          <ion-card mode=\"ios\" style=\"background-color: aliceblue;\">\n          \n\n            <ion-card-content mode=\"ios\" >\n              <div class=\"card-content\">\n              \t                <img class=\"card-img\" src=\"assets/img/museum.svg\">\n\n                <div>\n                  <div class=\"card-title\">My retirement plan</div>\n                  <div class=\"card-text\">You've already saved 4000€ for your retirement plan. You can do better!</div>\n                </div>\n              </div>\n              <div class=\"card-buttons\">\n\n                <ion-button mode=\"ios\" color=\"primary\" routerLink=\"/support\" >Show Advices</ion-button>\n\n              </div>\n\n            </ion-card-content>\n          </ion-card>\n          \n      </ion-list-->\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/map/map-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/map/map-routing.module.ts ***!
  \*************************************************/
/*! exports provided: MapPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageRoutingModule", function() { return MapPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "./src/app/pages/map/map.ts");




var routes = [
    {
        path: '',
        component: _map__WEBPACK_IMPORTED_MODULE_3__["MapPage"]
    }
];
var MapPageRoutingModule = /** @class */ (function () {
    function MapPageRoutingModule() {
    }
    MapPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MapPageRoutingModule);
    return MapPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/map/map.module.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/map/map.module.ts ***!
  \*****************************************/
/*! exports provided: MapModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapModule", function() { return MapModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map */ "./src/app/pages/map/map.ts");
/* harmony import */ var _map_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map-routing.module */ "./src/app/pages/map/map-routing.module.ts");






var MapModule = /** @class */ (function () {
    function MapModule() {
    }
    MapModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _map_routing_module__WEBPACK_IMPORTED_MODULE_5__["MapPageRoutingModule"]
            ],
            declarations: [
                _map__WEBPACK_IMPORTED_MODULE_4__["MapPage"],
            ]
        })
    ], MapModule);
    return MapModule;
}());



/***/ }),

/***/ "./src/app/pages/map/map.scss":
/*!************************************!*\
  !*** ./src/app/pages/map/map.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".backBtn {\n  position: absolute;\n  left: 1vw;\n  top: 33vh;\n  width: 15vw;\n  height: 15vw;\n  border-radius: 50%;\n  border: none;\n  background: white;\n}\n\n.nextBtn {\n  position: absolute;\n  right: 20vw;\n  top: 40vh;\n  width: 15vw;\n  height: 15vw;\n  border-radius: 50%;\n  border: none;\n  background: white;\n}\n\n.card-buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.slide-content {\n  margin-top: 24%;\n  padding-left: 16px;\n  padding-right: 16px;\n  max-width: 100%;\n}\n\n.card-img {\n  width: 50px;\n  height: 50px;\n  margin-bottom: 10px;\n  margin-right: 16px;\n}\n\nion-label {\n  font-size: 14px;\n}\n\nion-button {\n  font-size: 15px;\n  height: 30px;\n  min-width: 127px;\n}\n\n.card-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n\n.card-title {\n  font-size: 14px;\n  font-weight: 700;\n  color: #242424;\n  margin-bottom: 5px;\n  line-height: 17px;\n}\n\n.card-text {\n  font-size: 13px;\n}\n\n.card-link {\n  text-decoration: underline;\n  margin: auto;\n  color: #0cd1e8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvbWFwL21hcC5zY3NzIiwic3JjL2FwcC9wYWdlcy9tYXAvbWFwLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxrQkFBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0NIOztBREVBO0VBQ0csa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUNDSDs7QURDQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNFRjs7QURDQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ0VGOztBREFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDR0o7O0FEREE7RUFDRSxlQUFBO0FDSUY7O0FEQ0E7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDRUY7O0FEQUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7QUNHSjs7QUREQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FDSUo7O0FEREE7RUFDRSxlQUFBO0FDSUY7O0FERkE7RUFFRSwwQkFBQTtFQUNFLFlBQUE7RUFDQSxjQUFBO0FDSUoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9tYXAvbWFwLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFja0J0bntcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgIGxlZnQ6IDF2dztcbiAgIHRvcDogMzN2aDtcbiAgIHdpZHRoOiAxNXZ3O1xuICAgaGVpZ2h0OiAxNXZ3O1xuICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgYm9yZGVyOiBub25lO1xuICAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5uZXh0QnRue1xuICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgcmlnaHQ6IDIwdnc7XG4gICB0b3A6IDQwdmg7XG4gICB3aWR0aDogMTV2dztcbiAgIGhlaWdodDogMTV2dztcbiAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgIGJvcmRlcjogbm9uZTtcbiAgIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuLmNhcmQtYnV0dG9uc3tcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50IDogc3BhY2UtYmV0d2VlbjtcblxufVxuLnNsaWRlLWNvbnRlbnR7XG4gIG1hcmdpbi10b3A6IDI0JTtcbiAgcGFkZGluZy1sZWZ0OjE2cHg7XG4gIHBhZGRpbmctcmlnaHQ6MTZweDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuLmNhcmQtaW1ne1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIG1hcmdpbi1yaWdodDogMTZweDtcbn1cbmlvbi1sYWJlbHtcbiAgZm9udC1zaXplOjE0cHg7XG59XG5pb24tY2FyZC1jb250ZW50e1xuXG59XG5pb24tYnV0dG9ue1xuICBmb250LXNpemU6IDE1cHg7XG4gIGhlaWdodDogMzBweDtcbiAgbWluLXdpZHRoOiAxMjdweDtcbn1cbi5jYXJkLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cbi5jYXJkLXRpdGxle1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiAjMjQyNDI0O1xuICAgIG1hcmdpbi1ib3R0b206NXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xuXG59XG4uY2FyZC10ZXh0e1xuICBmb250LXNpemU6MTNweDtcbn1cbi5jYXJkLWxpbmsge1xuXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBjb2xvcjogIzBjZDFlODtcbn1cbiIsIi5iYWNrQnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAxdnc7XG4gIHRvcDogMzN2aDtcbiAgd2lkdGg6IDE1dnc7XG4gIGhlaWdodDogMTV2dztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4ubmV4dEJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDIwdnc7XG4gIHRvcDogNDB2aDtcbiAgd2lkdGg6IDE1dnc7XG4gIGhlaWdodDogMTV2dztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4uY2FyZC1idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uc2xpZGUtY29udGVudCB7XG4gIG1hcmdpbi10b3A6IDI0JTtcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi5jYXJkLWltZyB7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTZweDtcbn1cblxuaW9uLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5pb24tYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIG1pbi13aWR0aDogMTI3cHg7XG59XG5cbi5jYXJkLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4uY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMyNDI0MjQ7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XG59XG5cbi5jYXJkLXRleHQge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5jYXJkLWxpbmsge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgbWFyZ2luOiBhdXRvO1xuICBjb2xvcjogIzBjZDFlODtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/map/map.ts":
/*!**********************************!*\
  !*** ./src/app/pages/map/map.ts ***!
  \**********************************/
/*! exports provided: MapPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPage", function() { return MapPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _providers_messages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/messages.service */ "./src/app/providers/messages.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var MapPage = /** @class */ (function () {
    function MapPage(confData, router, Message, platform) {
        this.confData = confData;
        this.router = router;
        this.Message = Message;
        this.platform = platform;
    }
    MapPage.prototype.ngOnInit = function () {
        /*this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: ["Spent amount", "Peers average amount"],
            datasets: [
              {
                label: "$ Amount spent on groceries",
                data: [1250, 1000],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)"
                  
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)"
                  
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
    
    
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: "pie",
          data: {
            labels: ["Remaining budget", "Spendings"],
            datasets: [
              {
                label: "Spending on shopping",
                data: [300, 1200],
                
                backgroundColor: ["rgba(255,99,132,0.6)","rgba(54, 162, 235, 0.6)"]
              }
            ]
          }
        });
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: "line",
          data: {
            labels: ["08-10-2019", "10-10-2019", "12-10-2019", "14-10-2019", "16-10-2019", "18-10-2019", "20-10-2019"],
            datasets: [
              {
                label: "Account Balance",
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
                data: [2300, 1500, 1000, 300, 100, -200, -400],
                spanGaps: false
              }
            ]
          }
        });*/
    };
    MapPage.prototype.sendmessage = function (parent_id, node_id) {
        this.Message.clearHistory();
        this.Message.sendnextmessage(parent_id, node_id);
        console.log(node_id);
        this.router.navigateByUrl('/support');
    };
    MapPage.ctorParameters = function () { return [
        { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_2__["ConferenceData"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _providers_messages_service__WEBPACK_IMPORTED_MODULE_4__["MessagesService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] }
    ]; };
    MapPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-map',
            template: __webpack_require__(/*! raw-loader!./map.html */ "./node_modules/raw-loader/index.js!./src/app/pages/map/map.html"),
            styles: [__webpack_require__(/*! ./map.scss */ "./src/app/pages/map/map.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_providers_conference_data__WEBPACK_IMPORTED_MODULE_2__["ConferenceData"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _providers_messages_service__WEBPACK_IMPORTED_MODULE_4__["MessagesService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]])
    ], MapPage);
    return MapPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-map-map-module~pages-tabs-page-tabs-page-module-es5.js.map