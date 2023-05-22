<template>
  <div id="mainWindow">
    <!--    <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Agregar</router-link>-->
    <a class="button is-danger is-small" @click="hide = !hide" id="btnHover" v-if="hide">Agregar Artículo</a>
    <a class="button is-danger is-small" @click="hide = !hide" id="btnHover" v-if="!hide">Cancelar</a>
    <br>
    <table id="table" >
      <thead>
      <tr>
        <th id="rowhead" class="has-text-centered" @click="sort('aid')">ID</th>
        <th id="rowhead" class="has-text-centered" @click="sort('nombre')">Nombre</th>
        <th id="rowhead" class="has-text-centered" @click="sort('categoria')">Tipo</th>
        <th id="rowhead" class="has-text-centered" @click="sort('precio')">Precio</th>
        <th id="rowhead" class="has-text-centered" @click="sort('cantidad')">Cantidad Total</th>
        <th id="rowhead" class="has-text-centered">Acciones</th>
      </tr>
      </thead>
      <tbody  v-for="(item, index) in sortedArticulos" :key="index" v-on:click="toggleDetails(index);"  >
      <tr >
        <td>{{ item.aid }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.categoria }}</td>
        <td>GTQ {{ item.precio }}</td>
        <td>{{ item.cantidad }}</td>
        <td class="has-text-centered">
          <router-link
              :to="{ name: 'Edit', params: { id: item.aid } }"
              class="button is-info is-small" id="btn">Editar</router-link>
          <a class="button is-danger is-small" @click="deleteProducts(item.aid)" id="btn">Eliminar</a>
        </td>
      </tr>
      <tr id="hide" v-if="item.detalle" :class="{'open-details': item.detalle, 'close-details': !item.detalle}">
        <td colspan="1" style="padding-left: 3%;padding-right: 3%; text-align: justify">{{ item.descripcion }}</td>
        <td colspan="3" style="height: 50px"><div id="img"><img style="height: 90%; width: auto; object-fit: contain" :src="item.img" ></div></td>
        <td  colspan="2" style="padding-right: 0.5%">
          <articulo-ubicaciones :art_id="item.aid" :key="item.aid"/>

        </td>
      </tr>
      </tbody>
    </table>
    <button @:click="getArticulos" class="button-6" role="button">Refrescar</button>

    <div id="add" v-if="!hide">
      <AgregarInventario @hide="hideAdd"></AgregarInventario>
    </div>
    <br>
    <br>


<!--    tabla de ubicaciones -->

<!--    <a class="button is-danger is-small" @click="hideLocation = !hideLocation" id="btnHover" v-if="hideLocation">Agregar Ubicación</a>-->
<!--    <a class="button is-danger is-small" @click="hideLocation = !hideLocation" id="btnHover" v-if="!hideLocation">Cancelar</a>-->
<!--    <table id="table" >-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th id="rowhead" class="has-text-centered" @click="sortLoc('ubicacion_id')">ID</th>-->
<!--        <th id="rowhead" class="has-text-centered" @click="sortLoc('nombre')">Nombre</th>-->
<!--        <th id="rowhead" class="has-text-centered" @click="sortLoc('direccion')">Dirección</th>-->
<!--        <th id="rowhead" class="has-text-centered">Acciones</th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody  v-for="(location, index) in locations" :key="index" v-on:dblclick="toggleDetailsLocation(index)" >-->
<!--      <tr >-->
<!--        <td>{{ location.ubicacion_id }}</td>-->
<!--        <td>{{ location.nombre }}</td>-->
<!--        <td>{{ location.direccion }}</td>-->

<!--        <td class="has-text-centered">-->
<!--&lt;!&ndash;          <router-link&ndash;&gt;-->
<!--&lt;!&ndash;              :to="{ name: 'Edit', params: { id: location.ubicacion_id } }"&ndash;&gt;-->
<!--&lt;!&ndash;              class="button is-info is-small" id="btn">Editar</router-link>&ndash;&gt;-->
<!--          <a class="button is-danger is-small" @click="deleteLocation(location.ubicacion_id)" id="btn">Eliminar</a>-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr id="hide" v-if="location.detalle" :class="{'open-details': location.detalle, 'close-details': !location.detalle}">-->
<!--        <td colspan="4">-->
<!--          <agregar-inventario-ubicacion :articulos="items" :ubicacion_id="location.ubicacion_id" @hide="hideAdd"/>-->
<!--        </td>-->


<!--      </tr>-->
<!--      </tbody>-->


<!--    </table>-->
<!--    <div id="add" v-if="!hideLocation">-->
<!--      <AgregarUbicacion @hide="hideAdd"></AgregarUbicacion>-->
<!--    </div>-->

  </div>


</template>

<script>
import axios from "axios";
import AgregarInventario from "@/components/AgregarInventario.vue";

import AgregarUbicacion from "@/components/agregarUbicacion.vue";
import ArticuloUbicaciones from "@/components/articuloUbicaciones.vue";
import AgregarInventarioUbicacion from "@/components/agregarInventarioUbicacion.vue";


export default {
  components:{
    AgregarInventarioUbicacion,
    ArticuloUbicaciones,
    AgregarUbicacion,
    AgregarInventario
  },
  name: "ListaInventario",
  data(){
    return{
      hide: true,
      hideLocation: true,
      items: [],
      locations: [],
      itemlocations:[],
      currentSort:'name',
      currentSortDir:'asc',
      currentSortLoc:'name',
      currentSortDirLoc:'asc'
    }
  },

  created() {
    this.getArticulos();
    this.getUbicaciones();
  },

  methods: {
    toggleDetails(index) {
      this.items[index].detalle = !this.items[index].detalle;
    },
    toggleDetailsLocation(index) {
      this.locations[index].detalle = !this.locations[index].detalle;
    },
    hideAdd(val){
      this.hide = val
      this.getArticulos()
      this.getUbicaciones()
    },
    async getArticulos(){
      try {
        const response = await axios.get("http://192.168.0.8:3000/articulos");
        this.items = response.data.articulos;
        console.log(this.items);

      } catch (err){
        console.log(err);
      }
    },
    async getUbicaciones(){
      try {
        const response = await axios.get("http://192.168.0.8:3000/ubicaciones");
        this.locations = response.data.ubicaciones;

      } catch (err){
        console.log(err);
      }
    },
    // async getArticuloUbicaciones(id){
    //   try {
    //     const response = await axios.get(`http://192.168.0.8:3000/articuloUbicacion?id=${id}`);
    //
    //     console.log(this.itemlocations.length);
    //     for (let i = 0; i < response.data.articulosUbicacion.length; i++) {
    //       this.itemlocations.push({
    //         "id":id,
    //         "arreglo":{
    //           "nombre":response.data.articulosUbicacion[i].nombre,
    //           "cantidad":response.data.articulosUbicacion[i].cantidad
    //         }
    //       });
    //     }
    //
    //
    //     console.log(this.itemlocations);
    //
    //   } catch (err){
    //     console.log(err);
    //   }
    // },
    async deleteProducts(id){

      try {
        await axios.delete(`http://192.168.0.8:3000/articulo?id=${id}`);
        window.location.reload();
      } catch (err){
        console.log(err);
      }
    },

    async deleteLocation(id){

      try {
        await axios.delete(`http://192.168.0.8:3000/ubicacion?id=${id}`);
        window.location.reload();
      } catch (err){
        console.log(err);
      }
    },

    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },

    sortLoc:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSortLoc) {
        this.currentSortDirLoc = this.currentSortDirLoc==='asc'?'desc':'asc';
      }
      this.currentSortLoc = s;
    }

  },
  computed:{
    sortedArticulos:function() {
      return this.items.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    sortedLocations:function() {
      return this.locations.sortLoc((a,b) => {
        let modifier = 1;
        if(this.currentSortDirLoc === 'desc') modifier = -1;
        if(a[this.currentSortLoc] < b[this.currentSortLoc]) return -1 * modifier;
        if(a[this.currentSortLoc] > b[this.currentSortLoc]) return 1 * modifier;
        return 0;
      });
    },

  }

}
</script>

<style scoped>


@media (max-width: 1280px) {
  #table {
    border-style: hidden;
    font-size: 1.8vw;
    width: 100%;
    background-color: #303030;
    border-radius: 5px;
    table-layout: fixed;
    margin-left: auto;
    margin-right: auto;
  }
  #btnHover{
    border-radius: 5px;
    font-size: 2vw;
  }
  #add
  {
    margin-top: 7%;
    width: 45%;
    padding: 3%;
    background-color: #303030;
    border-radius: 5px;
    table-layout: fixed;
    font-size: 2vw;
  }
  #mainWindow
  {
    padding-left: 5%;
    padding-right: 5%;
    /*display: flex;*/
    alignment: center;
    align-items: center;
    justify-content: center;
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
    /*font-size: 16px;*/
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3%;
    padding: 5px;
    position: absolute;
    transform: translateY(20%);
    right: 5%;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
  }
}
@media (min-width: 1281px) {
  #table {
    border-style: hidden;
    font-size: 18px;
    width: 100%;
    background-color: #303030;
    border-radius: 5px;
    table-layout: fixed;
    margin-left: auto;
    margin-right: auto;
  }
  #btnHover{
    border-radius: 5px;
    font-size: 20px;
  }
  #add
  {
    margin-top: 5%;
    width: 33%;
    padding: 3%;
    background-color: #303030;
    border-radius: 5px;
    /*table-layout: fixed;*/
    font-size: 16px;
  }
  #mainWindow
  {
    padding-left: 10%;
    padding-right: 10%;
    /*display: flex;*/
    alignment: center;
    align-items: center;
    justify-content: center;
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
    /*font-size: 16px;*/
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3%;
    padding: 5px;
    position: absolute;
    transform: translateY(20%);
    right: 10%;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
  }
}


#rowhead
{
  text-align: center;
  color: white;
  background-color: #222222;
  border-radius: 5px;

}
td{
  text-align: center;
  vertical-align: middle;
}

#btn
{
  alignment: center;
  margin-left: 8%;
}

#hide{
  height: 50%;
  background-color: #363636;
  border-color: #333333;
}

#img{
  height: 200px;
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