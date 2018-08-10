import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Notifier } from '../core/notifications/notifier';
import { InternalStateType } from '../interfaces/InternalStateType';
import { Enterprise } from '../models/core/enterprise';
import { Farmer } from '../models/core/farmer';

declare var $: any

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
  selectedEnterprise: Enterprise = null
  private farmersSource$: Observable<DocumentChangeAction<Farmer>[]>
  private enterpriseCollection: AngularFirestoreCollection<Enterprise>
  private enterprisesSource$: Observable<DocumentChangeAction<Enterprise>[]>

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
    this.farmersSource$ = this.afs
      .collection<Farmer>('farmers')
      .snapshotChanges()
      .pipe(shareReplay(1))

    this.enterpriseCollection = this.afs.collection<Enterprise>('enterprises')

    this.enterprisesSource$ = this.enterpriseCollection
      .snapshotChanges()
      .pipe(shareReplay(1))
  }

  getEnterpriseEngagementLevels() {
    return ['Major', 'Minor']
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
  addEnterprise(enterprise: Enterprise) {
    return this.enterpriseCollection.add(enterprise);
  }

  updateEnterpriseDetail(enterprise: Enterprise) {
    return this.enterpriseCollection.doc(enterprise.id).update(enterprise)
  }

  deleteEnterprise(enterprise: Enterprise) {
    return this.enterpriseCollection.doc(enterprise.id).delete()
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

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 10000,
    })
  }

  notify(message: Notifier) {
    $.Notify({
      caption: message.caption,
      content: message.content,
      icon: message.icon,
      type: message.type,
      keepOpen: message.keepOpen,
      shadow: message.shadow,
      timeout: message.timeout,
    })
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
