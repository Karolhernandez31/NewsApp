import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = 'NewsApp';
  @Input() showMenuButton: boolean = false;
  @Input() showBackButton: boolean = false;


  constructor(private menuController: MenuController) { }

  ngOnInit() {}

    openMenu() {
    this.menuController.open('main-menu');
  }

}
