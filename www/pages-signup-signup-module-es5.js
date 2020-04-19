(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-signup-signup-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/signup/signup.html":
/*!********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/signup/signup.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Signup</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div class=\"signup-logo\">\n    <img src=\"assets/img/appicon.svg\" alt=\"Ionic Logo\">\n  </div>\n\n  <form #signupForm=\"ngForm\" novalidate>\n    <ion-list lines=\"none\">\n      <ion-item>\n        <ion-label position=\"stacked\" color=\"primary\">Username</ion-label>\n        <ion-input [(ngModel)]=\"signup.username\" name=\"username\" type=\"text\" #username=\"ngModel\" required>\n        </ion-input>\n      </ion-item>\n      <ion-text color=\"danger\">\n        <p [hidden]=\"username.valid || submitted == false\" class=\"ion-padding-start\">\n          Username is required\n        </p>\n      </ion-text>\n\n      <ion-item>\n        <ion-label position=\"stacked\" color=\"primary\">Password</ion-label>\n        <ion-input [(ngModel)]=\"signup.password\" name=\"password\" type=\"password\" #password=\"ngModel\" required>\n        </ion-input>\n      </ion-item>\n      <ion-text color=\"danger\">\n        <p [hidden]=\"password.valid || submitted == false\" class=\"ion-padding-start\">\n          Password is required\n        </p>\n      </ion-text>\n    </ion-list>\n\n    <div class=\"ion-padding\">\n      <ion-button  type=\"submit\" expand=\"block\">Create</ion-button>\n    </div>\n  </form>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/signup/signup-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/signup/signup-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: SignupPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageRoutingModule", function() { return SignupPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _signup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup */ "./src/app/pages/signup/signup.ts");




var routes = [
    {
        path: '',
        component: _signup__WEBPACK_IMPORTED_MODULE_3__["SignupPage"]
    }
];
var SignupPageRoutingModule = /** @class */ (function () {
    function SignupPageRoutingModule() {
    }
    SignupPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], SignupPageRoutingModule);
    return SignupPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/signup/signup.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/signup/signup.module.ts ***!
  \***********************************************/
/*! exports provided: SignUpModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpModule", function() { return SignUpModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _signup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signup */ "./src/app/pages/signup/signup.ts");
/* harmony import */ var _signup_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./signup-routing.module */ "./src/app/pages/signup/signup-routing.module.ts");







var SignUpModule = /** @class */ (function () {
    function SignUpModule() {
    }
    SignUpModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _signup_routing_module__WEBPACK_IMPORTED_MODULE_6__["SignupPageRoutingModule"]
            ],
            declarations: [
                _signup__WEBPACK_IMPORTED_MODULE_5__["SignupPage"],
            ]
        })
    ], SignUpModule);
    return SignUpModule;
}());



/***/ }),

/***/ "./src/app/pages/signup/signup.scss":
/*!******************************************!*\
  !*** ./src/app/pages/signup/signup.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".signup-logo {\n  padding: 20px 0;\n  min-height: 200px;\n  text-align: center;\n}\n\n.signup-logo img {\n  max-width: 150px;\n}\n\n.list {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudGZpdC9wc2QyL2lvbmljLWNvbmZlcmVuY2UtYXBwL3NyYy9hcHAvcGFnZXMvc2lnbnVwL3NpZ251cC5zY3NzIiwic3JjL2FwcC9wYWdlcy9zaWdudXAvc2lnbnVwLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9zaWdudXAvc2lnbnVwLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lnbnVwLWxvZ28ge1xuICBwYWRkaW5nOiAyMHB4IDA7XG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zaWdudXAtbG9nbyBpbWcge1xuICBtYXgtd2lkdGg6IDE1MHB4O1xufVxuXG4ubGlzdCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG4iLCIuc2lnbnVwLWxvZ28ge1xuICBwYWRkaW5nOiAyMHB4IDA7XG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zaWdudXAtbG9nbyBpbWcge1xuICBtYXgtd2lkdGg6IDE1MHB4O1xufVxuXG4ubGlzdCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/signup/signup.ts":
/*!****************************************!*\
  !*** ./src/app/pages/signup/signup.ts ***!
  \****************************************/
/*! exports provided: SignupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPage", function() { return SignupPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providers_user_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/user-data */ "./src/app/providers/user-data.ts");




var SignupPage = /** @class */ (function () {
    function SignupPage(router, userData) {
        this.router = router;
        this.userData = userData;
        this.signup = { username: '', password: '' };
        this.submitted = false;
    }
    SignupPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _providers_user_data__WEBPACK_IMPORTED_MODULE_3__["UserData"] }
    ]; };
    SignupPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-signup',
            template: __webpack_require__(/*! raw-loader!./signup.html */ "./node_modules/raw-loader/index.js!./src/app/pages/signup/signup.html"),
            styles: [__webpack_require__(/*! ./signup.scss */ "./src/app/pages/signup/signup.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _providers_user_data__WEBPACK_IMPORTED_MODULE_3__["UserData"]])
    ], SignupPage);
    return SignupPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-signup-signup-module-es5.js.map