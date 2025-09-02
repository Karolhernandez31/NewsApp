import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false,
})
export class PrincipalNewsComponent implements OnInit {
  @Input() news: any;
  constructor(private modalCtr: ModalController) {}

  ngOnInit() {}

  openNews(title: any) {
    this.modalCtr
      .create({
        component: ModalComponent,
        componentProps: { news: this.news },
      })
      .then((modal) => modal.present());
  }
}
