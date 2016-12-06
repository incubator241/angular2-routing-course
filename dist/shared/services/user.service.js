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
var usersPromise = Promise.resolve([
    {
        id: 1,
        name: 'Chris',
        username: 'sevilayha',
        avatar: 'app/images/download1.jpg'
    },
    {
        id: 2,
        name: 'Nick',
        username: 'whatnicktweets',
        avatar: 'app/images/download.jpg'
    },
    {
        id: 3,
        name: 'Holly',
        username: 'hollylawly',
        avatar: 'app/images/downloa.jpg'
    }
]);
var UserService = (function () {
    function UserService() {
    }
    // get all users
    UserService.prototype.getUsers = function () {
        return usersPromise;
    };
    // find a specific user
    UserService.prototype.getUser = function (username) {
        return usersPromise.then(function (users) { return users.find(function (user) { return user.username === username; }); });
        // let user = usersPromise.then(users => {
        //   return users.find(user => {
        //     return user.username === username;
        //   });
        // });
        // return user;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map