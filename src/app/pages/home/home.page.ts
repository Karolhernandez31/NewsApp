import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news';
import { HttpService } from 'src/app/shared/services/http.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MenuEventsService } from 'src/app/shared/services/menu-events.service';
import { environment } from 'src/environments/environment';


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
  private apiKey = environment.apiKey;

  constructor(
    private http: HttpService,
    private loaderSrv: LoaderService,
    private menuEvents: MenuEventsService
  ) {}

  ngOnInit() {
    this.loadNews();
    this.sub = this.menuEvents.menuClick$.subscribe(msg => {
      this.category = msg;
      this.loadNews(this.category);
    });
  }

  async loadNews(category: string = 'tesla') {
    const url = `https://newsapi.org/v2/everything?q=${category}&from=2025-08-02&sortBy=publishedAt&apiKey=${this.apiKey}`;
    await this.loaderSrv.present('Cargando noticias...');
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
