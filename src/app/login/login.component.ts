import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { User } from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit {
  user:User
  isLoading:boolean=true
  loginForm:FormGroup
  correctData:boolean=true
  errorText:string=""
  constructor(private route:Router,public auth:AngularFireAuth, private fb:FormBuilder, private ngxSpinner:NgxSpinnerService) { 
    this.auth.user.subscribe((user)=>{
      this.isLoading=false
      this.user=user
    })
  }

  ngOnInit(): void { 
    this.loginForm=this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  } 
  login() {
    if(this.loginForm.valid){
      this.correctData=true
      this.ngxSpinner.show()
      this.auth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)      
      .then((user)=>{
        this.ngxSpinner.hide()
        this.route.navigateByUrl("/")
        Swal.fire({
          title: 'Singed in!',
          text: 'You have singed in as '+this.loginForm.value.email,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
      .catch((error)=>{
        this.ngxSpinner.hide()
        this.correctData=false
        this.errorText=error.message

      })
    }else{
      this.correctData=false
      this.errorText='Please verify your data'
    }
  }


}
