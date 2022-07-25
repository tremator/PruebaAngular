import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  images: any []
  video: any
  photo : any

  constructor(private service:ImageService, private router: Router) { 
    this.images = []
  }

  ngOnInit(): void {
    //this.addImage()
    this.getImages()

  }



  getImages(){
    this.images = []
    this.service.getImages()
    .then(async response => {
      for(let item of response.items){
        console.log(item)
        const url = await getDownloadURL(item)
        this.images.push({
          'name': item.name,
          'url': url
        })
      }
    })
    .catch(error => console.log(error))
  }

 

  delete(name: string){
    this.service.deleteImage(name).then(() =>{
      this.getImages()
    })
  }

  navigate(){
    this.router.navigate(['/camera']);
  }

}
