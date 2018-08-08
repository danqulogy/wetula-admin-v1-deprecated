import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
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

  private farmersCollection: AngularFirestoreCollection<Farmer>
  private enterprisesCollection: AngularFirestoreCollection<Enterprise>

  constructor(private afs: AngularFirestore) {
    this.farmersCollection = this.afs.collection<Farmer>('farmers')
    this.enterprisesCollection = this.afs.collection<Enterprise>('enterprises')
  }


  getEnterpriseEngagementLevels() {
    return [
      {
        label: "Major",
        value: EnterpriseEngagementLevel.Major
      },
      {
        label: "Minor",
        value: EnterpriseEngagementLevel.Minor
      }
    ]
  }

  getEnterpriseEngagements() {
    return this.enterprisesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Enterprise
        data.id = a.payload.doc.id
        return data
      }))
    )
  }

  getFarmers() {
    return this.farmersCollection.snapshotChanges().pipe(
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
