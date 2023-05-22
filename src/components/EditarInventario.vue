<template>
  <div id="add">
    <button @:click="$router.back()" class="button-6" role="button">Regresar</button>
    <h1 style="margin-bottom: 5%">Editar {{this.nombre}}</h1>
    <div class="field">
      <label class="label">Categoria</label>
      <div class="control">
        <select id="cat" class="cat" name="cat" v-model="categoria">
          <option value="ukulele">Ukulele</option>
          <option value="avion">Avion</option>
          <option value="rompecabezas_grande">Rompecabezas 2000</option>
          <option value="rompecabezas_mediano">Rompecabezas 1500</option>
          <option value="rompecabezas_small">Rompecabezas 1000</option>
          <option value="cuadro_grande">Cuadro 41x25</option>
          <option value="cuadro_mediano">Cuadro 20x30</option>
          <option value="cuadro_small">Cuadro 15x30</option>
          <option value="cuadro_misc">Cuadros formas</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Nombre</label>
      <div class="control">
        <input class="input" type="text" placeholder="Nombre del articulo" v-model="nombre">
      </div>
    </div>


    <div class="field">
      <label class="flexbox">Descripción</label>
      <div class="control">
        <input class="input" type="text" placeholder="Detalles del articulo" v-model="descripcion" style="height: 80px">
      </div>
    </div>

    <div class="field">
      <label class="label">Precio</label>

      <div class="control">
        <input class="input" type="number" placeholder="0" v-model="precio">
      </div>
    </div>

    <div class="field">
      <label class="label">Imagen</label>

      <div class="control">
        <input class="input" type="text" placeholder="url de la imagen" v-model="img">
      </div>
    </div>

    <div class="field" v-if="categoria == 'ukulele'">
      <label class="label">Color</label>

      <div class="control">
        <input class="input" type="text" placeholder="color del ukulele" v-model="color">
      </div>
    </div>

    <div class="field" v-if="categoria == 'ukulele'">
      <label class="label">Modelo</label>

      <div class="control">
        <input class="input" type="text" placeholder="modelo del ukulele" v-model="color">
      </div>
    </div>

    <div class="field" v-if="categoria == 'avion'">
      <label class="label">Color</label>

      <div class="control">
        <input class="input" type="text" placeholder="color del avion" v-model="color">
      </div>
    </div>

    <div class="field" v-if="categoria == 'avion'">
      <label class="label">Marca</label>

      <div class="control">
        <input class="input" type="text" placeholder="Marca del avion" v-model="marca">
      </div>
    </div>


    <div class="field" v-if="categoria == 'avion'">
      <label class="label">Modelo</label>

      <div class="control">
        <input class="input" type="text" placeholder="Modelo del avion" v-model="modelo">
      </div>
    </div>

    <button v-on:click="guardarArticulo()" class="button-6" role="button">guardar</button>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "EditarInventario",
  data() {
    return{
      id: "",
      nombre: "",
      categoria: "",
      descripcion: "",
      precio: "",
      img: "",
      color: "",
      marca: "",
      modelo: ""
    }
  },
  created: function() {
    this.getArticuloId()
  },


  methods:{


    async getArticuloId(){
      const id = this.$route.params.id
      console.log(id);

      try {
        const response = await axios.get(`http://192.168.0.8:3000/articulo?id=${id}`);
        console.log(response.data);
        this.nombre = response.data.articulos[0].nombre;
        this.categoria = response.data.articulos[0].categoria;
        this.descripcion = response.data.articulos[0].descripcion;
        this.precio = response.data.articulos[0].precio;
        this.img = response.data.articulos[0].img;
        this.color = response.data.articulos[0].color;
        this.marca = response.data.articulos[0].marca;
        this.modelo = response.data.articulos[0].modelo;
        this.id = response.data.articulos[0].aid;


        // console.log(first);
      } catch (err){
        console.log(err);
      }
    },


    async guardarArticulo(){
      // console.log(this.id)
      // console.log(this.nombre)
      try {
        await axios.put(`http://192.168.0.8:3000/articulos?id=${this.id}`,
            {
              nombre: this.nombre,
              categoria: this.categoria,
              descripcion: this.descripcion,
              precio: this.precio,
              img: this.img,
              color: this.color,
              marca: this.marca,
              modelo: this.modelo,
              detalle: 0
            })
        this.$router.push('/')
        // window.location.reload();
      }catch (err){
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 1280px) {
  .cat {padding: .1em .3em; width: 50%; font-size: 1.8vw;}
  .input { padding: .1em .3em; width: 100%;font-size: 1.8vw; }

  #add
  {
    margin-top: 10%;
    width: 45%;
    padding: 3%;
    background-color: #303030;
    border-radius: 5px;
    table-layout: fixed;
    font-size: 1.7vw;

  }
}
@media (min-width: 1281px) {
  .cat {padding: .1em .3em; width: 55%; font-size: 18px;}
  .input { padding: .1em .3em; width: 100%;font-size: 18px; }
  #add
  {
    margin-top: 10%;
    width: 33%;
    padding: 3%;
    background-color: #303030;
    border-radius: 5px;
    table-layout: fixed;
    font-size: 18px;

  }
}


.button-6 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 15px;
  padding: 5px;
  position: relative;
  transform: translateY(20%);
  right: 0;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(10%);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(10%);
}
</style>