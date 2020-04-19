(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/login/login.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>Connexion</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n<ion-toolbar *ngIf=\"invalidcred\"  mode=\"ios\" color=\"danger\">\n  <ion-title >Identifiant ou Mot de passe invalide</ion-title>\n</ion-toolbar>\n  <ion-row style=\"text-align:center;\">\n  <ion-col>\n\n</ion-col>\n<ion-col>\n  <div class=\"login-logo\">\n    <ion-img alt=\"Connexion\" style=\"margin:auto;display:block;width: 60%;\" src=\"assets/img/{{banklogo}}\"></ion-img>\n\n\n    <ion-text >\n        <h2 >\n          Connexion\n        </h2>\n      </ion-text>\n          <ion-text >\n          <h5 >\n            {{bankname}}</h5>\n          </ion-text>\n\n  </div>\n</ion-col>\n  <ion-col>\n  </ion-col>\n </ion-row>\n   <!--iframe  #IFRAME sandbox=\"allow-same-origin allow-scripts allow-popups allow-forms\" [src]=\"url\"></iframe-->\n\n  <form #loginForm=\"ngForm\" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label position=\"stacked\" >Identifiant </ion-label>\n        <ion-input [(ngModel)]=\"login.username\" name=\"username\" type=\"text\" #username=\"ngModel\" spellcheck=\"false\" autocapitalize=\"off\"\n          required>\n        </ion-input>\n      </ion-item>\n\n      <ion-text color=\"danger\">\n        <p [hidden]=\"username.valid || submitted == false\" class=\"ion-padding-start\">\n          Identifiant is required\n        </p>\n      </ion-text>\n\n      <ion-item>\n        <ion-label position=\"stacked\" >Code secret</ion-label>\n        <ion-input [(ngModel)]=\"login.password\" name=\"password\" type=\"password\" #password=\"ngModel\" required>\n        </ion-input>\n      </ion-item>\n\n      <ion-text color=\"danger\">\n        <p [hidden]=\"password.valid || submitted == false\" class=\"ion-padding-start\">\n          Mot de passe is required\n        </p>\n      </ion-text>\n    </ion-list>\n\n    <ion-row>\n    <ion-col>\n        \n      </ion-col>\n      <ion-col>\n        <ion-button (click)=\"onLogin(loginForm)\" style=\"border-radius: 30px;\" type=\"submit\" expand=\"block\"><ion-icon name=\"arrow-dropright\"></ion-icon></ion-button>\n      </ion-col>\n      <ion-col>\n      </ion-col>\n    </ion-row>\n  </form>\n  <ion-row style=\"margin-bottom: 4%;\">\n        <ion-col>\n        <ion-text >\n        \n        <em style='display: table-cell;margin-right: .8rem;color: #738aaa;font-size: .8rem;'><ion-icon name=\"information-circle-outline\"></ion-icon> Renseignez les mêmes informations que celles que vous utilisez sur le site de votre banque.</em>\n      </ion-text>\n      </ion-col>\n      </ion-row>\n\n<ion-row >\n    <ion-col>\n    </ion-col>\n    <ion-col>\n        <ion-img alt=\"Secure\" style=\"margin-left:45%;width: 19%;\" src=\"assets/img/secure.svg\"></ion-img>\n\n    </ion-col>\n    <ion-col>\n    </ion-col>\n\n    </ion-row>\n    <ion-row>\n\n    \n      <ion-col    style=\"padding-top: 0px;\">\n      <ion-text style=\"margin-left: 30%;\">\n    <em style='display: table-cell;color: #738aaa;font-size: .8rem;'> ATTILA est securisé et sûr</em>\n    </ion-text>\n    </ion-col>\n    \n  </ion-row>\n      \n    \n\n</ion-content>\n\n\n"

/***/ }),

/***/ "./src/app/pages/login/login-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/login-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login */ "./src/app/pages/login/login.ts");




var routes = [
    {
        path: '',
        component: _login__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
var LoginPageRoutingModule = /** @class */ (function () {
    function LoginPageRoutingModule() {
    }
    LoginPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], LoginPageRoutingModule);
    return LoginPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ "./src/app/pages/login/login.ts");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/pages/login/login-routing.module.ts");







var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_6__["LoginPageRoutingModule"]
            ],
            declarations: [
                _login__WEBPACK_IMPORTED_MODULE_5__["LoginPage"],
            ]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/pages/login/login.scss":
/*!****************************************!*\
  !*** ./src/app/pages/login/login.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-logo {\n  padding: 30px 0 0 0;\n  min-height: 150px;\n  text-align: center;\n}\n\n.login-logo img {\n  max-width: 150px;\n}\n\n.list {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uc2NzcyIsInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ2luLWxvZ28ge1xuICBwYWRkaW5nOiAzMHB4IDAgMCAwO1xuICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubG9naW4tbG9nbyBpbWcge1xuICBtYXgtd2lkdGg6IDE1MHB4O1xufVxuXG4ubGlzdCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG4iLCIubG9naW4tbG9nbyB7XG4gIHBhZGRpbmc6IDMwcHggMCAwIDA7XG4gIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5sb2dpbi1sb2dvIGltZyB7XG4gIG1heC13aWR0aDogMTUwcHg7XG59XG5cbi5saXN0IHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/login/login.ts":
/*!**************************************!*\
  !*** ./src/app/pages/login/login.ts ***!
  \**************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/conference-data */ "./src/app/providers/conference-data.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, userData, router, route) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.router = router;
        this.route = route;
        this.login = { username: '', password: '' };
        this.submitted = false;
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.bankid = this.route.snapshot.paramMap.get('bankId');
        var idbank = this.bankid;
        var currentbank = this.userData.banks.filter(function (el) {
            return el['bank_id'] == idbank;
        })[0];
        if (currentbank) {
            this.bankname = currentbank.bank_name;
            this.banklogo = currentbank.bank_logo;
        }
    };
    LoginPage.prototype.onLogin = function (form) {
        this.submitted = true;
        if (form.valid) {
            this.login['bankid'] = this.bankid;
            this.userData.adddata(this.login);
            this.navCtrl.navigateRoot('/app/tabs/schedule');
            //this.router.navigateByUrl('/app/tabs/schedule');
        }
    };
    LoginPage.prototype.onSignup = function () {
        this.router.navigateByUrl('/signup');
    };
    LoginPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
        { type: _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-login',
            template: __webpack_require__(/*! raw-loader!./login.html */ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.html"),
            styles: [__webpack_require__(/*! ./login.scss */ "./src/app/pages/login/login.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"],
            _providers_conference_data__WEBPACK_IMPORTED_MODULE_3__["ConferenceData"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es5.js.map