import { Menu } from './../model/menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(path:string){
    return this.http.get<Menu>(`./assets/menu/${path}.json`);
  }

  getUser(path:string){
    return this.http.get<User>(`./assets/user/user.json`);
  }
}
