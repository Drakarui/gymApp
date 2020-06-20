import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ClientServiceService } from '../services/client-service.service';
import { Client } from '../models/Client';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2' 


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  editClient: Client = null 
  clientForm: FormGroup
  percent: number = 0
  editInProgress:boolean=false
  constructor(private fb: FormBuilder, private route:Router,private clientService: ClientServiceService, private storage: AngularFireStorage, private activeRoute: ActivatedRoute,private spinner:NgxSpinnerService) {

  }
  dateModel: NgbDateStruct
  photoPath: string = ""

  ngOnInit(): void {
  
    this.clientForm = this.fb.group({
      document: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      photo: ['']
    })
if(this.activeRoute.snapshot.params.id){
  this.spinner.show()
  this.editInProgress=true
    this.clientService.fetchOneClient(this.activeRoute.snapshot.params.id).subscribe(result => {
      this.editClient = result
      let newDate: Date = new Date(result.birth.seconds * 1000)
      let dateModel: NgbDate = new NgbDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate())

      this.clientForm.setValue({
        document: this.editClient.identification,
        name: this.editClient.name,
        lastName: this.editClient.lastName,
        birth: dateModel,
        email: this.editClient.email,
        phone: this.editClient.phone,
        photo: ""
      })
      this.spinner.hide()
    })}
  }

  addClient() {

    let date: NgbDate = this.clientForm.value.birth
    let client: Client = {
      id: '',
      birth: new Date(`${date.year}-${date.month}-${date.day}`),
      email: this.clientForm.value.email,
      identification: this.clientForm.value.document,
      lastName: this.clientForm.value.lastName,
      name: this.clientForm.value.name,
      phone: this.clientForm.value.phone,
      photo: this.photoPath,
      photoFetch: null
    }


    this.clientService.postClient(client).subscribe(result => {
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    })

    this.clientForm.reset()
    this.percent = 0
  }
  uploadPhoto(event) {
    this.photoPath = `clientPhotos/${this.clientForm.value.document}photo`
    const file = event.target.files[0];
    const filePath = this.photoPath;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.percentageChanges().subscribe(progress => {
      this.percent = progress
    })
    if(this.percent==100){
      Swal.fire({
        title: 'Success!',
        text: 'User photo uploaded successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }
  edit(){
    let date: NgbDate = this.clientForm.value.birth
    let client: Client = {
      id: '',
      birth: new Date(`${date.year}-${date.month}-${date.day}`),
      email: this.clientForm.value.email,
      identification: this.clientForm.value.document,
      lastName: this.clientForm.value.lastName,
      name: this.clientForm.value.name,
      phone: this.clientForm.value.phone,
      photo: this.editClient.photo,
      photoFetch: null
    }

    this.clientService.putClient(this.activeRoute.snapshot.params.id,client).subscribe((result)=>{
      
      this.clientForm.reset()
      this.route.navigateByUrl("clientList")
      Swal.fire({
        title: 'Edit Performed!',
        text: 'This user were edit successfully',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    })
  
    
  }

  

}
