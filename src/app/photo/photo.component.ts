import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  video: any
  photo: any
  form: any = {
    name: ""
  }
  showSubmit : boolean

  constructor(private imageService: ImageService, private router: Router) { 

    this.showSubmit = false
  }

  ngOnInit(): void {
    this.video = document.getElementById('video')
    this.setUpCamera()
  }

  setUpCamera(){
    navigator.mediaDevices.getUserMedia({
      video: {width:500, height: 200},
      audio: false
    })
    .then(stream => this.video.srcObject = stream)
    .catch(error => console.log(error));

  }

  async capture(){
    this.video.pause()
    let canvas = document.querySelector("canvas")
    let context = canvas?.getContext("2d")
    context?.drawImage(this.video,0,0, 325,150)
    this.photo = canvas?.toDataURL()
    this.showSubmit = true
  }

  async submit(){

    const {name} = this.form
    var info = {
      "name": name,
    }
    const file = this.dataURLtoFile(this.photo,info.name)
    await this.imageService.upploadImage(file,info.name)
    .then(respose => console.log(respose))
    .catch(error=>console.log(error));
    this.navigate()

  }

  dataURLtoFile(dataurl: any, filename:string) {
 
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  clear(){
    this.photo = ''
    this.video.play()
    this.showSubmit = false
  }
  navigate(){
    this.router.navigate(['/']);
  }

}
