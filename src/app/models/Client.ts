import { Observable } from 'rxjs';


export class Client{
    id:string
    birth:Date;
    email:string
    identification:string
    lastName:string
    name:string
    phone:string
    photo:string
    photoFetch:Observable<string|null>

    constructor(data?:Client){
        if(data!=null){
            this.id=data.id
            this.birth=data.birth
            this.email=data.email
            this.identification=data.identification
            this.lastName=data.lastName
            this.name=DataTransfer.name
            this.phone=this.phone
            this.photo=this.photo
            this.photoFetch=data.photoFetch
            return
        }
        this.id=this.id
        this.birth=this.birth
        this.email=this.email
        this.identification=this.identification
        this.lastName=this.lastName
        this.name=this.name
        this.phone=this.phone
        this.photo=this.photo
        this.photoFetch=this.photoFetch
    }

}