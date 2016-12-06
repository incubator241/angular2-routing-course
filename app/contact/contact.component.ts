import { Component, Output, EventEmitter } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http } from '@angular/http';

// webpack html imports
//let template = require('./contact-page.html');

// const URL = '/api/';
const URL = 'http://localhost:3002/api/containers/Images/upload';

@Component({
  selector: 'contact-page',
  template: `
  <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                <li><a>File Upload</a></li>
                </ul>
            </div>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <form>
                    <div class="form-group">
                        <label for="multiple">Multiple</label>
                        <input type="file" class="form-control" name="multiple"  ng2FileSelect [uploader]="uploader" multiple />
                    </div>
                    <div class="form-group">
                        <label for="single">single</label>
                        <input type="file" class="form-control" name="single"  ng2FileSelect [uploader]="uploader"/>
                    </div>
                </form>
            </div>
          </div>
      </div>
      <div class="col-md-9" style="margin-bottom: 40px">

            <h3>Upload queue</h3>
            <p>Queue length: {{ uploader?.queue?.length }}</p>

            <table class="table">
                <thead>
                <tr>
                    <th width="50%">Name</th>
                    <th>Progress</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let item of uploader.queue">
                    <td><strong>{{ item?.file?.name }}</strong></td>
                    <td *ngIf="uploader.isHTML5" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>
                    <td *ngIf="uploader.isHTML5">
                        <div class="progress" style="margin-bottom: 0;">
                            <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                        </div>
                    </td>
                    <td class="text-center">
                        <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                        <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                        <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                    </td>
                    <td nowrap>
                        <button type="button" class="btn btn-success btn-xs"
                                (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                            <span class="glyphicon glyphicon-upload"></span> Upload
                        </button>
                        <button type="button" class="btn btn-warning btn-xs"
                                (click)="item.cancel()" [disabled]="!item.isUploading">
                            <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                        </button>
                        <button type="button" class="btn btn-danger btn-xs"
                                (click)="item.remove()">
                            <span class="glyphicon glyphicon-trash"></span> Remove
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <div>
                    Queue progress:
                    <div class="progress" style="">
                        <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                    </div>
                </div>
                <button type="button" class="btn btn-success btn-s"
                        (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
                    <span class="glyphicon glyphicon-upload"></span> Upload all
                </button>
                <button type="button" class="btn btn-warning btn-s"
                        (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">
                    <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
                </button>
                <button type="button" class="btn btn-danger btn-s"
                        (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">
                    <span class="glyphicon glyphicon-trash"></span> Remove all
                </button>
            </div>
            <button (click)="showImage()">Show Images</button>
            <button (click)="deleteAllImages(data)">Delete all Images</button>
            <ul style = "color:red">
            <li *ngFor="let item of data">
                <button (click)="deleteImage(item.name)"><i class="fa fa-trash-o" aria-hidden="true" >delete</i> </button>
                <img src="http://localhost:3002/api/containers/Images/download/{{item.name}}"><br>
                <span>{{item.name}}</span>
            </li>
          </ul>
    </div>


  `
})

export class ContactComponent {
  @Output() userUpdated = new EventEmitter();
  public uploader:FileUploader = new FileUploader({url: URL});
  constructor(private  http: Http) {
    this.http.get('http://localhost:3002/api/containers/Images/files')
    .subscribe(
      data => { this.userUpdated.emit(this.data) = data.json()},
      err => console.error(err),
      () => console.log(this.data)
    );
  }
  showImage() {
      this.http.get('http://localhost:3002/api/containers/Images/files')
      .subscribe(
        data => { this.data = data.json()},
        err => console.error(err),
        () => console.log(this.data)
      );
   }

   deleteImage(item) {
     this.http.delete('http://localhost:3002/api/containers/Images/files/'+item)
     .subscribe(
       data => { this.data = data.json();location.reload();console.error(this.data)},
       err => console.error(err),
       () => { this.http.get('http://localhost:3002/api/containers/Images/files')
                   .subscribe(
                     data => { this.data = data.json()},
                     err => console.error(err),
                     () => console.log(this.data)
                   );
               }
     );
   }

   deleteAllImages(items) {
    for (var i in items) {
       this.http.delete('http://localhost:3002/api/containers/Images/files/'+items[i].name)
       .subscribe(
         data => { this.data = data.json(); location.reload();},
         err => console.error(err),
         () => console.log(this.data)
       );
     }
  }

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
