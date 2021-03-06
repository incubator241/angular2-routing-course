"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var angular2_jwt_1 = require('angular2-jwt');
var http_1 = require('@angular/http');
var auth_service_1 = require('./auth.service');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var forms_1 = require('@angular/forms');
var dashboard_module_1 = require('./dashboard/dashboard.module');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var contact_component_1 = require('./contact/contact.component');
var not_found_component_1 = require('./not-found/not-found.component');
var auth_guard_service_1 = require('./shared/guards/auth-guard.service');
var can_deactivate_guard_service_1 = require('./shared/guards/can-deactivate-guard.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.appRouting,
                dashboard_module_1.DashboardModule,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                contact_component_1.ContactComponent,
                not_found_component_1.NotFoundComponent,
                ng2_file_upload_1.FileSelectDirective
            ],
            providers: [
                angular2_jwt_1.AUTH_PROVIDERS, auth_service_1.Auth,
                auth_guard_service_1.AuthGuard,
                can_deactivate_guard_service_1.CanDeactivateGuard
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map