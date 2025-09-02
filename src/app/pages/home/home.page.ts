import { Component } from '@angular/core';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { HttpService } from 'src/app/shared/services/http.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MenuEventsService } from 'src/app/shared/services/menu-events.service';

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
  category = '';
  private sub!: Subscription;

  constructor(
    private http: HttpService,
    private loaderSrv: LoaderService,
    private menuEvents: MenuEventsService
  ) {}

  ngOnInit() {
    this.loadNews();
    this.sub = this.menuEvents.menuClick$.subscribe(msg => {
      this.category = msg;
      this.reloadNews(this.category);
    });
  }

  async loadNews() {
    const url =
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=b6cc0b2bff67407e88e1020ed967ac62';
    await this.getNews(url);
  }

  reloadNews(category: string) {
    const url = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=b6cc0b2bff67407e88e1020ed967ac62`;
    console.log('url ' ,url);
    this.getNews(url);
  }

  async getNews(url: string) {
    await this.loaderSrv.present('Loading news...');
    this.http
      .get<{ articles: News[] }>(url)
      .then((res) => {
        if (res.articles && res.articles.length > 0) {
          this.featuredNews = res.articles[0];
          this.latestNews = res.articles.slice(1, 6);
          console.log(this.latestNews);
        }
        this.loaderSrv.hide();
      })
      .catch((err) => {
        console.error('Error loading news', err);
        this.loaderSrv.hide();
      });
  }

  async handleRefresh(event: RefresherCustomEvent) {
    await this.loadNews();
    event.target.complete();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
