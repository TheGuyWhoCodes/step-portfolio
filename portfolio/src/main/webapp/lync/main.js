(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_display_display_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/display/display.component */ "./src/app/pages/display/display.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    },
    {
        path: ':id',
        component: _pages_display_display_component__WEBPACK_IMPORTED_MODULE_3__["DisplayComponent"]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'bulkurl';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var angular_particle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-particle */ "./node_modules/angular-particle/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pages_display_display_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/display/display.component */ "./src/app/pages/display/display.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
                _pages_display_display_component__WEBPACK_IMPORTED_MODULE_9__["DisplayComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                angular_particle__WEBPACK_IMPORTED_MODULE_6__["ParticlesModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
            ],
            providers: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Navigation-->\r\n<nav class=\"navbar navbar-expand-lg navbar-light fixed-top py-3\" id=\"mainNav\">\r\n    <div class=\"container\">\r\n        <a class=\"navbar-brand js-scroll-trigger\" href=\"\">lync.rip</a><button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button>\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\r\n            <ul class=\"navbar-nav ml-auto my-2 my-lg-0\">\r\n                <li class=\"nav-item\"><a class=\"nav-link js-scroll-trigger\" href=\"\">Home</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "./src/app/header/header.component.scss":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fixed-top {\n  position: relative !important; }\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/pages/display/display.component.html":
/*!******************************************************!*\
  !*** ./src/app/pages/display/display.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div class = \"container\">\n\n    <div *ngIf = \"failed\" class = \"failed\">\n        <i class=\"fas fa-question fa-10x\"></i>\n        <h1><strong>Oh snap!</strong></h1>\n        <h3> <br> Couldn't find your URL, you've probably clicked on an invalid link. To learn more about lync.rip, please visit the <a href = \"/\">homepage</a></h3>\n    </div>\n\n    <div [hidden]=\"!success\">\n        <button (click)=\"redirectHome()\" type=\"button\" class=\"btn btn-light\"><i class=\"fas fa-backspace\"></i>  Create another URL</button>\n        <div class=\"url-success alert alert-success\" role=\"alert\">\n            <div class = \"success-container\">\n                <label><strong>Congrats!</strong> You shortened some URLs. Here is your link:</label>\n                <div class=\"input-group mb-3\">\n                    <input class = \"url\"#copyable type=\"text\" class=\"form-control\" placeholder=\"N/A\" aria-label=\"copyable url\" aria-describedby=\"basic-addon2\" readonly>\n                    <div class=\"input-group-append copier\">\n                        <span class=\"input-group-text\" id=\"basic-addon2\" (click)=\"copyInputMessage(copyable)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Copy to clipboard\"><i class=\"fas fa-copy\"></i></span>\n                    </div>\n                </div> \n            </div>\n        </div>\n    </div>\n    <table class=\"table table-striped\" *ngIf = \"hasUrls()\">\n        <thead>\n          <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">Name</th>\n            <th scope=\"col\">URL</th>\n          </tr>\n        </thead>\n        <tbody *ngFor = \"let url of urls.urls; let i = index\">\n          <tr>\n            <th scope=\"row\">{{i + 1}}</th>\n            <td>{{url.Title}}</td>\n            <td><a href = \"{{url.Url}}\">{{url.Url}}</a></td>\n          </tr>\n        </tbody>\n      </table>\n</div>"

/***/ }),

/***/ "./src/app/pages/display/display.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/display/display.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table {\n  margin-top: 2em; }\n\ntd {\n  width: 80vw; }\n\n.url-success {\n  margin: 2em; }\n\n.input-group {\n  width: 50% !important; }\n\nlabel {\n  /* Other styling... */\n  text-align: right;\n  clear: both;\n  float: left;\n  margin-right: 15px; }\n\n.success-container {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.copier:hover {\n  cursor: pointer; }\n\n.failed {\n  text-align: center;\n  margin-top: 3em; }\n"

/***/ }),

/***/ "./src/app/pages/display/display.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/display/display.component.ts ***!
  \****************************************************/
/*! exports provided: DisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayComponent", function() { return DisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DisplayComponent = /** @class */ (function () {
    function DisplayComponent(router, http, activatedRoute, titleService) {
        this.router = router;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.urls = {};
        this.success = false;
        this.key = "";
        this.failed = false;
    }
    DisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle("lync.rip :: " + this.activatedRoute.snapshot.params.id);
        this.key = this.activatedRoute.snapshot.params.id;
        this.getURLS(this.activatedRoute.snapshot.params.id).toPromise().then(function (x) {
            if (x["urls"] == null) {
                _this.failed = true;
                _this.success = false;
                _this.titleService.setTitle("lync.rip :: error!");
                return;
            }
            for (var y in x["urls"]) {
                if (x["urls"][y].Url.slice(0, 7) !== "http://" && x["urls"][y].Url.slice(0, 8) !== "https://") {
                    x["urls"][y].Url = "http://" + x["urls"][y].Url;
                }
            }
            _this.urls = x;
        });
        this.success = this.activatedRoute.snapshot.queryParamMap.get("success") === 'true';
        this.input.nativeElement.focus();
        this.input.nativeElement.value = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].url + this.key;
    };
    DisplayComponent.prototype.redirectHome = function () {
        this.router.navigate(["/"]);
    };
    DisplayComponent.prototype.hasUrls = function () {
        return !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(this.urls);
    };
    DisplayComponent.prototype.getURLS = function (key) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api + "api/v0/getURLS/", {
            params: {
                id: key
            }
        });
    };
    DisplayComponent.prototype.copyInputMessage = function (inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('copyable'),
        __metadata("design:type", Object)
    ], DisplayComponent.prototype, "input", void 0);
    DisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-display',
            template: __webpack_require__(/*! ./display.component.html */ "./src/app/pages/display/display.component.html"),
            styles: [__webpack_require__(/*! ./display.component.scss */ "./src/app/pages/display/display.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], DisplayComponent);
    return DisplayComponent;
}());



/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<particles [params]=\"myParams\" [style]=\"myStyle\" [width]=\"width\" [height]=\"height\"></particles>\n\n<div class = \"hero\">\n  <h1>lync.rip</h1>\n  <h2>Send those long links to the grave.</h2>\n\n  <div class = \"url-hero\">\n    <div class = \"url-container\">\n        <form [formGroup]=\"urlForm\" novalidate (ngSubmit)=\"save(urlForm)\" autocomplete=\"off\">\n            <div *ngIf=\"hardError == true\" class=\"alert alert-danger alert-dismissible errorMessage\" role=\"alert\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n                <strong>Oops!</strong> {{errorMessage}}\n            </div>\n\n            <!-- list of addresses -->\n            <div formArrayName=\"urls\">\n                <div *ngFor=\"let address of urlForm.controls.urls.controls; let i=index\">\n                    <!-- address header, show remove button when more than one address available -->\n        \n                    <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->\n                    <div [formGroupName]=\"i\">\n                        <div class = \"single-url\">\n                            <div class=\"input-group mb-3\" style=\"margin-bottom: 0px !important;\">\n                                <div class=\"input-group-prepend title-input\">\n                                    <input class=\"input-group-text title-inner-input\" id=\"basic-addon3\" placeholder = \"URL {{i+1}}\" formControlName=\"title\">\n                                  </div>\n                                <input type=\"text\" class=\"form-control url-input\" placeholder=\"Enter a URL...\" aria-label=\"URL\" aria-describedby=\"basic-addon2\"  type=\"text\" formControlName=\"url\">\n                                <div class=\"input-group-append\">\n                                    <button *ngIf = \"i != 0\" (click)=\"removeUrl(i)\" class = \"btn btn-danger delete-url\"><i class=\"fas fa-trash-alt\"></i></button>\n                                </div>\n                              </div>\n                            <!--display error message if street is not valid-->\n                            <small [hidden]=\"urlForm.controls.urls.controls[i].controls.url.valid\">\n                                Valid URL is required\n                            </small>\n                            \n                        </div>\n\n                    </div>\n                </div>\n            </div>\n            <button class = \"btn btn-success success\"type=\"submit\" [disabled]=\"urlForm.valid\"><i class=\"fas fa-link\"></i> Submit</button>\n        </form>\n        <button class = \"btn btn-primary add-url\" (click)=\"addUrl()\"><i class=\"fas fa-plus-circle\"></i> Add URL</button>\n    </div>    \n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/home/home.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".hero {\n  text-align: center;\n  margin-top: 5em; }\n\nh1 {\n  font-family: 'Khula', sans-serif;\n  color: #f5f5f5;\n  font-size: 4.5em;\n  font-weight: 700; }\n\nh2 {\n  color: #f5f5f5; }\n\n.url-hero {\n  background-color: #f5f5f5e3;\n  width: 40%;\n  min-height: 500px;\n  height: auto;\n  margin: auto;\n  padding-bottom: 70px;\n  margin-top: 2em;\n  margin-bottom: 2em;\n  border-radius: 9px; }\n\n.title-input {\n  width: 30%; }\n\n.title-inner-input {\n  width: 100%; }\n\n.url-input {\n  width: 70%; }\n\n.url-inner-input {\n  width: 100%; }\n\n@media only screen and (max-width: 950px) {\n  .hero {\n    margin-top: 2em; }\n  .url-hero {\n    width: 86%;\n    min-height: 70vh; }\n  h2 {\n    font-size: 1.2em; }\n  .title-input {\n    width: 40%; }\n  .url-input {\n    width: 60%; } }\n\n.url-container {\n  width: 80%;\n  margin: auto;\n  padding-top: 25px; }\n\n.add-url {\n  background-color: #ff9331;\n  border-color: #ff9331;\n  margin-top: 10px;\n  float: left; }\n\n.success {\n  margin-top: 10px;\n  float: right; }\n\n::-moz-selection {\n  /* Code for Firefox */\n  background: #ff9331; }\n\n::selection {\n  background: #ff9331; }\n\n.single-url {\n  display: block;\n  margin-bottom: 10px; }\n"

/***/ }),

/***/ "./src/app/pages/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomeComponent = /** @class */ (function () {
    function HomeComponent(_fb, http, router, titleService) {
        this._fb = _fb;
        this.http = http;
        this.router = router;
        this.titleService = titleService;
        this.myStyle = {};
        this.myParams = {};
        this.width = 100;
        this.height = 100;
        this.hardError = false;
        this.errorMessage = "This is an error on our end, try again later!";
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("lync.rip :: home");
        this.urlForm = this._fb.group({
            name: ['name', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(5)]],
            urls: this._fb.array([
                this.initUrl(),
            ])
        });
        this.myStyle = {
            'position': 'fixed',
            'top': '0',
            'width': '100%',
            'height': '100vh',
            'z-index': -1,
            'background-color': "#336ae5"
        };
        this.myParams = {
            "particles": {
                "number": {
                    "value": 24,
                    "density": {
                        "enable": true,
                        "value_area": 1262.6362266116362
                    }
                },
                "color": {
                    "value": "#cdcdcd"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3.945738208161363,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 4,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 600
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 250,
                        "size": 0,
                        "duration": 2,
                        "opacity": 0,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 400,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        };
    };
    HomeComponent.prototype.initUrl = function () {
        // const urlRegex = `#(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))#iS`;
        return this._fb.group({
            url: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required /*, Validators.pattern(urlRegex)*/]],
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    HomeComponent.prototype.addUrl = function () {
        // add address to the list
        var control = this.urlForm.controls['urls'];
        control.push(this.initUrl());
    };
    HomeComponent.prototype.removeUrl = function (i) {
        var control = this.urlForm.controls['urls'];
        control.removeAt(i);
    };
    HomeComponent.prototype.save = function (model) {
        var _this = this;
        // call API to save customer
        this.hardError = false;
        var urlPost = [];
        for (var val in model.value.urls) {
            if (model.value.urls[val]["url"] == "") {
                this.hardError = true;
                this.errorMessage = "One of your URLs is empty!";
            }
            if (model.value.urls.length >= 10) {
                this.hardError = true;
                this.errorMessage = "Cannot shorten more than 10 links!";
            }
            if (model.value.urls.size == 0) {
                this.hardError = true;
                this.errorMessage = "Haha, you need to actually shorten a link!";
            }
            urlPost.push({
                url: model.value.urls[val]["url"],
                title: model.value.urls[val]["title"] != "" ? model.value.urls[val]["title"] : "URL " + (parseInt(val) + 1)
            });
        }
        if (!this.hardError) {
            this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].api + "api/v0/writeURL/", {
                "title": "TeFfdsst",
                "urls": urlPost
            }).subscribe(function (data) {
                _this.hardError = false;
                _this.router.navigate([data.Id], { queryParams: { success: true } });
            }, function (error) {
                _this.hardError = true;
            });
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/pages/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: true,
    api: "http://34.70.184.135/",
    url: "http://lync.rip/"
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\chris\Desktop\bulkshort\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map