import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuEventsService {

  private menuClickSource = new Subject<string>();

  constructor() {

  }

  menuClick$ = this.menuClickSource.asObservable();

  emitirClick(category: string) {
    this.menuClickSource.next(category);
  }
}
