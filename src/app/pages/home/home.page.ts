import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { HttpService } from 'src/app/shared/services/http.service';

export interface News {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface Source {
  id: null;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  featuredNews: News | null = null;
  latestNews: News[] = [];
  isLoading = true;

  constructor(
    private http: HttpService,
    private modalCtr: ModalController
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.isLoading = true;
    this.http
      .get<{ articles: News[] }>(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=b6cc0b2bff67407e88e1020ed967ac62'
      )
      .then((res) => {
        if (res.articles && res.articles.length > 0) {
          this.featuredNews = res.articles[0];
          this.latestNews = res.articles.slice(1, 6);
        }
        this.isLoading = false;
      })
      .catch((err) => {
        console.error('Error loading news', err);
        this.isLoading = false;
      });
  }

  openNews(title: any){
    const news = this.latestNews.find(n => n.title === title);
    this.modalCtr.create({
      component: ModalComponent,
      componentProps: {news: news}
    }).then(modal => modal.present());
  }
}
