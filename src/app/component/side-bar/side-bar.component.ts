import { User } from './../../model/user';
import { Item, Menu, MenuActive } from './../../model/menu';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

@Output()
change=  new EventEmitter<string>();

  menuActive: MenuActive;
  menu: Menu;
  user: User;
  @Input() icon: any;

  currentPath: string;
  positionActive: number;

  constructor(
    private serviceMenu: MenuService,
    private router: Router
  ) {
    this.menu = new Menu();
    this.icon = {
      menu: 'icon-chevron_right',
      more: 'icon-chevron-left'
    }
  }

  ngOnInit() {
    this.serviceMenu.getMenu('main').subscribe(response => this.menu = response);
    this.serviceMenu.getUser('user').subscribe(response => this.user = response);
    let menu = localStorage.getItem('menu');
    this.menuActive = JSON.parse(localStorage.getItem('menuActive'));
  }

  /**
   * Method to load pages in applications
   * @param element
   * @param index
   */
  loadPage(element: Item, index: number) {
    if (element.more) {
      localStorage.setItem('menu', element.path);
      this.serviceMenu.getMenu(element.path)
        .subscribe(response => {
          this.menu = response;
          this.currentPath = element.path;
          this.positionActive = undefined;
          if (this.menuActive && element.path == this.menuActive.path) {
            this.positionActive = this.menuActive.position;
          }
        });
    } else {
      this.menuActive = new MenuActive();
      this.menuActive.position = index;
      this.menuActive.path = this.currentPath;
      localStorage.setItem('menuActive', JSON.stringify(this.menuActive));
      this.positionActive = index;
      this.router.navigate([element.path]);
    }
  }

  changeAdquiriente() {
    console.log("changeAdquiriente");
    this.change.emit('close');
  }

  goOut() {
    console.log("goOut");
  }
}
