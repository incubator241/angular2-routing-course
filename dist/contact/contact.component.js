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
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var http_1 = require('@angular/http');
// webpack html imports
//let template = require('./contact-page.html');
// const URL = '/api/';
var URL = 'http://localhost:3002/api/containers/Images/upload';
var ContactComponent = (function () {
    function ContactComponent(http) {
        var _this = this;
        this.http = http;
        this.userUpdated = new core_1.EventEmitter();
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.http.get('http://localhost:3002/api/containers/Images/files')
            .subscribe(function (data) { _this.userUpdated.emit(_this.data) = data.json(); }, function (err) { return console.error(err); }, function () { return console.log(_this.data); });
    }
    ContactComponent.prototype.showImage = function () {
        var _this = this;
        this.http.get('http://localhost:3002/api/containers/Images/files')
            .subscribe(function (data) { _this.data = data.json(); }, function (err) { return console.error(err); }, function () { return console.log(_this.data); });
    };
    ContactComponent.prototype.deleteImage = function (item) {
        var _this = this;
        this.http.delete('http://localhost:3002/api/containers/Images/files/' + item)
            .subscribe(function (data) { _this.data = data.json(); location.reload(); console.error(_this.data); }, function (err) { return console.error(err); }, function () {
            _this.http.get('http://localhost:3002/api/containers/Images/files')
                .subscribe(function (data) { _this.data = data.json(); }, function (err) { return console.error(err); }, function () { return console.log(_this.data); });
        });
    };
    ContactComponent.prototype.deleteAllImages = function (items) {
        var _this = this;
        for (var i in items) {
            this.http.delete('http://localhost:3002/api/containers/Images/files/' + items[i].name)
                .subscribe(function (data) { _this.data = data.json(); location.reload(); }, function (err) { return console.error(err); }, function () { return console.log(_this.data); });
        }
    };
    ContactComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    ContactComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    __decorate([
        core_1.Output(),
        __metadata('design:type', Object)
    ], ContactComponent.prototype, "userUpdated", void 0);
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact-page',
            template: "\n  <nav class=\"navbar navbar-default\">\n        <div class=\"container-fluid\">\n            <div class=\"navbar-header\">\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                <ul class=\"nav navbar-nav\">\n                <li><a>File Upload</a></li>\n                </ul>\n            </div>\n            </div>\n        </div>\n    </nav>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <form>\n                    <div class=\"form-group\">\n                        <label for=\"multiple\">Multiple</label>\n                        <input type=\"file\" class=\"form-control\" name=\"multiple\"  ng2FileSelect [uploader]=\"uploader\" multiple />\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"single\">single</label>\n                        <input type=\"file\" class=\"form-control\" name=\"single\"  ng2FileSelect [uploader]=\"uploader\"/>\n                    </div>\n                </form>\n            </div>\n          </div>\n      </div>\n      <div class=\"col-md-9\" style=\"margin-bottom: 40px\">\n\n            <h3>Upload queue</h3>\n            <p>Queue length: {{ uploader?.queue?.length }}</p>\n\n            <table class=\"table\">\n                <thead>\n                <tr>\n                    <th width=\"50%\">Name</th>\n                    <th>Progress</th>\n                    <th>Actions</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let item of uploader.queue\">\n                    <td><strong>{{ item?.file?.name }}</strong></td>\n                    <td *ngIf=\"uploader.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\n                    <td *ngIf=\"uploader.isHTML5\">\n                        <div class=\"progress\" style=\"margin-bottom: 0;\">\n                            <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                        </div>\n                    </td>\n                    <td class=\"text-center\">\n                        <span *ngIf=\"item.isSuccess\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n                        <span *ngIf=\"item.isCancel\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span>\n                        <span *ngIf=\"item.isError\"><i class=\"glyphicon glyphicon-remove\"></i></span>\n                    </td>\n                    <td nowrap>\n                        <button type=\"button\" class=\"btn btn-success btn-xs\"\n                                (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n                        </button>\n                        <button type=\"button\" class=\"btn btn-warning btn-xs\"\n                                (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\n                            <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel\n                        </button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs\"\n                                (click)=\"item.remove()\">\n                            <span class=\"glyphicon glyphicon-trash\"></span> Remove\n                        </button>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n            <div>\n                <div>\n                    Queue progress:\n                    <div class=\"progress\" style=\"\">\n                        <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn btn-success btn-s\"\n                        (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                    <span class=\"glyphicon glyphicon-upload\"></span> Upload all\n                </button>\n                <button type=\"button\" class=\"btn btn-warning btn-s\"\n                        (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                    <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all\n                </button>\n                <button type=\"button\" class=\"btn btn-danger btn-s\"\n                        (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                    <span class=\"glyphicon glyphicon-trash\"></span> Remove all\n                </button>\n            </div>\n            <button (click)=\"showImage()\">Show Images</button>\n            <button (click)=\"deleteAllImages(data)\">Delete all Images</button>\n            <ul style = \"color:red\">\n            <li *ngFor=\"let item of data\">\n                <button (click)=\"deleteImage(item.name)\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\" >delete</i> </button>\n                <img src=\"http://localhost:3002/api/containers/Images/download/{{item.name}}\"><br>\n                <span>{{item.name}}</span>\n            </li>\n          </ul>\n    </div>\n\n\n  "
        }),
        __metadata('design:paramtypes', [http_1.Http])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map
