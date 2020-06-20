import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../services/client-service.service';
import { Client } from '../models/Client';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  constructor(private clientService:ClientServiceService,private storage:AngularFireStorage,private spinner:NgxSpinnerService) { }
  clients:Array<Client>=new Array<Client>()
  filteredClients:Array<Client>=this.clients
  client:Client=new Client()
  isLoading:boolean=true
  ngOnInit(): void {
    this.spinner.show()
  this.clientService.fetchClients().subscribe((result)=>{
      result.docs.forEach(element => {
        this.client=element.data()
        this.client.id=element.id
        const ref=this.storage.ref(this.client.photo)
        this.client.photoFetch=ref.getDownloadURL()
        this.clients.push(this.client)
        this.isLoading=false
        this.spinner.hide()
    });
   
  })
 
  }

  searchClient(value){

    
    this.clients=this.filteredClients.filter(x=>{
      return x.identification.includes(value)
    })
  }

}
