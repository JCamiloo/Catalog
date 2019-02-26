import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos:Producto[] = [];
  cargado = true;
  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-portafolio-c0b55.firebaseio.com/productos_idx.json').subscribe((resp:Producto[]) => {
      this.productos = resp;
      setTimeout(()  => {
        this.cargado = false;
      },1500)
      
    });
  }
}
