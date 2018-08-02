import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export interface ITimestamp{
    updatedAt?: FieldValue;
    createdAt?: FieldValue;
}