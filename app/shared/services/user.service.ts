import { Injectable } from '@angular/core';
import { User } from '../models/user';

const usersPromise: Promise<User[]> = Promise.resolve([
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

@Injectable()
export class UserService {

  // get all users
  getUsers() {
    return usersPromise;
  }

  // find a specific user
  getUser(username) {
    return usersPromise.then(users => users.find(user => user.username === username));

    // let user = usersPromise.then(users => {
    //   return users.find(user => {
    //     return user.username === username;
    //   });
    // });

    // return user;
  }

}
