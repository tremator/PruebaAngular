import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { listAll, Storage, uploadBytes } from '@angular/fire/storage';
import { collection } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private firestore:Firestore, private storage: Storage) { }


  addImage(image: any){
    const images = collection(this.firestore,'images')
    return addDoc(images,image)
  } 
  deleteImage(name:string){
    const serviceRef = ref(this.storage,`images/${name}`)
    return deleteObject(serviceRef)
  }
  getImages(){
    const serviceRef = ref(this.storage,`images`)
    return listAll(serviceRef)
  }
  upploadImage(image:any, name:string){
    const serviceRef = ref(this.storage, 'images/'+image.name)
    console.log(image)
    console.log(serviceRef)
    return uploadBytes(serviceRef,image)
  }
}
