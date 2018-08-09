import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InternalStateType } from '../interfaces/InternalStateType';
import { Enterprise } from '../models/core/enterprise';
import { Farmer } from '../models/core/farmer';
import { EnterpriseEngagementLevel } from '../valueObjects/enterprise_engagement_level';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Set your states default value.
  private state: InternalStateType = {
    currentLoginUser: null,
    appName: 'Wetula',
    darkMode: false,
    initial: false,
    messagePanelOpen: false,
    pageFooter: false,
    pageFullScreen: false,
    sideNavCollapse: false,
    sideNavMode: 'over',
    sideNavOpen: true,
    topNavTitle: 'Wetula Platform',
    topNavSubTitle: 'Administrative Console',
    titleColor1: 'fg-green',
    titleColor2: 'fg-darkGreen',
  }

  private enterprisesCollection: AngularFirestoreCollection<Enterprise>
  private farmersSource$: Observable<DocumentChangeAction<Farmer>[]>
  private enterprisesSource$: Observable<DocumentChangeAction<Enterprise>[]>

  constructor(private afs: AngularFirestore) {
    this.farmersSource$ = this.afs.collection<Farmer>('farmers').snapshotChanges().pipe(shareReplay(1));
    this.enterprisesSource$ = this.afs.collection<Enterprise>('enterprises').snapshotChanges().pipe(shareReplay(1));

    // this.enterprisesCollection = this.afs.collection<Enterprise>('enterprises')
  }

  getEnterpriseEngagementLevels() {
    return [
      {
        label: 'Major',
        value: EnterpriseEngagementLevel.Major,
      },
      {
        label: 'Minor',
        value: EnterpriseEngagementLevel.Minor,
      },
    ]
  }

  getEnterpriseEngagements() {
    return this.enterprisesSource$.pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Enterprise
          data.id = a.payload.doc.id
          return data
        })
      )
    )
  }

  getFarmers() {
    return this.farmersSource$.pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Farmer
          data.id = a.payload.doc.id
          return data
        })
      )
    )
  }

  /**
   * Get entire states.1
   *
   * @return  {InternalStateType} State do not respond to changes.
   */
  public cloneState(): InternalStateType {
    return JSON.parse(JSON.stringify(this.state))
  }

  /**
   * Reload entire states.
   *
   * @param state
   */
  public reloadState(state: InternalStateType) {
    this.state = state
  }

  /**
   * Get state by key.
   *
   * You can get state value like:
   *
   * Store:
   * 1. appName: string = appService.getState.appName;
   * 2. appName: string = appService.getState['appName'];
   *
   * Change:
   * 1. appService.getState.appName = appName;
   * 2. appService.getState['appName'] = appName;
   *
   * @param prop State key name.
   * @return {InternalStateType} State respond to changes.
   */
  public getState(prop?: any): InternalStateType {
    const state = this.state
    return state.hasOwnProperty(prop) ? state[prop] : state
  }

  /**
   * Set state by key and value.
   *
   * @param prop State key name.
   * @param value State value.
   * @return {any} State value.
   */
  public setState(prop: string, value: any) {
    return (this.state[prop] = value)
  }
}
