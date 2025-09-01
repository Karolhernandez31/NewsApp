import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false
})
export class ModalComponent implements OnInit {
  @Input() news!: News;

  constructor() { }

  ngOnInit() {
  }

}
