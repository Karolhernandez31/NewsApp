import { Component, Input, OnInit } from '@angular/core';
import { DefaultWebViewOptions, InAppBrowser } from '@capacitor/inappbrowser';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent implements OnInit {
  @Input() news!: News;

  constructor() {}

  ngOnInit() {
    console.log('News received in modal:', this.news);
  }

  async openNewsWeb() {
    await InAppBrowser.openInWebView({
      url: this.news.url,
      options: DefaultWebViewOptions,
    });
  }

}
