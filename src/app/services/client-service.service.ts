import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Client } from '../models/Client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  collectionName:string="clients"
  private recieveCollection: AngularFirestoreCollection<Client>;
  collectionItems:Observable<Client[]>

  constructor(private db:AngularFirestore) { 
    this.recieveCollection=this.db.collection<Client>('clients')
    this.collectionItems=this.recieveCollection.valueChanges()
  
  }

 fetchClients():Observable<any>{
   
    return this.db.collection(this.collectionName).get()
    
  }

  postClient(client:Client):Observable<any>{
    this.recieveCollection.add(client)
    return this.collectionItems
  }


  deleteClient(id:string):Observable<any>{
    this.recieveCollection.doc(id).delete()
    return this.collectionItems
  }
  putClient(id:string,client:Client):Observable<any>{

    this.recieveCollection.doc(id).set(client)
    return this.collectionItems

  }
  fetchOneClient(id:string):Observable<any>{
    let clientCollect=this.db.doc<Client>('clients/'+id)
    let client=clientCollect.valueChanges()
   return client
  }
}
