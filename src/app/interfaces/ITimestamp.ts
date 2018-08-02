import FieldValue = firebase.firestore.FieldValue
import * as firebase from 'firebase'

export interface ITimestamp {
  updatedAt?: FieldValue
  createdAt?: FieldValue
}
