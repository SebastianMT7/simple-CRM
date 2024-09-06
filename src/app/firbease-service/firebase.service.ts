import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  query,
  orderBy,
  DocumentChange,
  DocumentData,
  getDocs,
} from 'firebase/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  unsubUserList;
  users: User[] = [];  //User[] ist die Typendeklaration
  singleUserlId: any = '';
  
  singleUserDetail: User = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: 0,
    email: '',
    street: '',
    zipCode: 0,
    city: '',
  };

  constructor() {
    this.unsubUserList = this.getUserList();
  }

  getUserList() {
    const q = query(this.getUsersCollectionRef(), orderBy('lastName'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        const user = this.setUserObject(element.data(), element.id);
        user.id = element.id;
        console.log('id', user);
        this.users.push(user);
      });
      list.docChanges().forEach((change) => {
        this.logChanges(change);
      });
    });
  }

  logChanges(change: DocumentChange<DocumentData>) {
    if (change.type === 'added') {
      console.log('New User ', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified User: ', change.doc.data());
    }
    if (change.type === 'removed') {
      console.log('Removed User: ', change.doc.data());
    }
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || 0,
      email: obj.email || '',
      street: obj.street || '',
      zipCode: obj.zipCode || 0,
      city: obj.city || '',
    };
  }

  async addUser(user: any) {
    await addDoc(this.getUsersCollectionRef(), this.getCleanJson(user)).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  getUsersCollectionRef() {
    return collection(this.firestore, 'users');
  }


  getCleanJson(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  getUserDetails() {
    return onSnapshot(this.getSingleUserDocRef(), (doc) => {
      // console.log(doc.data());
      let user = new User(doc.data());
      this.singleUserDetail = user;
    });
  }

  getSingleUserDocRef() {
    return doc(this.getUsersCollectionRef(), this.singleUserlId);
  }

}