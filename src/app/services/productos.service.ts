import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos:Producto[] = [];
  productosFiltrado:Producto[] = [];
  cargado = true;

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve,reject) => {
      this.http.get('https://angular-portafolio-c0b55.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[]) => {
        this.productos = resp;
        this.cargado = false;
        resolve();
      });
    });
  }

  getProducto(id:string){
    return this.http.get(`https://angular-portafolio-c0b55.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){
    if(this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    }
    else{
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string){
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
