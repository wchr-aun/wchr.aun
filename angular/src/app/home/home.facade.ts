import { Store } from "@ngrx/store";
import { loadDataActions } from "./store/actions"
import { Injectable } from '@angular/core';

@Injectable()

export class HomeFacade {
  constructor (private store: Store) {
    this.loadData()
  }

  loadData() {
    console.log('hi')
    this.store.dispatch(loadDataActions.loadHomeStart())
  }
}