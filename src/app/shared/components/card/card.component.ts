import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() news: any;
  constructor(private modalCtr: ModalController) {}

  ngOnInit() {}

  openNews() {
    this.modalCtr
      .create({
        component: ModalComponent,
        componentProps: { news: this.news },
      })
      .then((modal) => modal.present());
  }
}
