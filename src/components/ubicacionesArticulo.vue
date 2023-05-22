<template>

  <table id="table" >
    <thead>
    <tr>
      <th id="rowhead" class="has-text-centered" @click="sortLoc('ubicacion_id')">ID</th>
      <th id="rowhead" class="has-text-centered" @click="sortLoc('nombre')">Nombre</th>
      <th id="rowhead" class="has-text-centered" @click="sortLoc('direccion')">Cantidad</th>

    </tr>
    </thead>
    <tbody  v-for="ubicacionArticulo in ubicacionArticulos" :key="ubicacionArticulo.ubicacion_id" >
    <tr >
      <td>{{ ubicacionArticulo.articulo_id }}</td>
      <td>{{ ubicacionArticulo.nombre }}</td>
      <td> <a>{{ ubicacionArticulo.cantidad }}</a></td>
    </tr>
    </tbody>
  </table>
<!--  <ul v-for="ubicacionArticulo in ubicacionArticulos" :key="ubicacionArticulo.ubicacion_id">-->
<!--    <li>{{ubicacionArticulo.articulo_id}} {{ubicacionArticulo.nombre}} : <a>{{ ubicacionArticulo.cantidad }}</a> </li>-->
<!--  </ul>-->
</template>

<script>
import axios from "axios";

export default {
  name: "ubicacionesArticulo",
  props: {
    u_id: {
      type: Number
    }
  },
  data(){
    return{
      ubicacionArticulos:[],
    }
  },
  created() {
    this.getUbicacionArticulos()
  },

  methods: {

    async getUbicacionArticulos(){
      try {
        console.log(this.art_id)
        const response = await axios.get(`http://192.168.0.8:3000/ubicacionArticulo?id=${this.u_id}`);

        console.log(this.ubicacionArticulos.length);
        for (let i = 0; i < response.data.ubicacionArticulos.length; i++) {
          this.ubicacionArticulos.push({
            "articulo_id":response.data.ubicacionArticulos[i].articulo_id,
            "nombre":response.data.ubicacionArticulos[i].nombre,
            "cantidad":response.data.ubicacionArticulos[i].cantidad
          });
        }


        console.log(this.itemlocations);

      } catch (err){
        console.log(err);
      }
    },

  }
}
</script>

<style scoped>
#rowhead
{
  text-align: center;
  color: white;
  background-color: #222222;


}
table {
  border-collapse: collapse;
}
tr {
  border: solid;
  border-width: 1px 0;
}
#table {
  alignment: top;
  border-style: hidden;
  font-size: 18px;
  width: 100%;
  background-color: #363636;
  border-radius: 5px;
  table-layout: fixed;
  margin-left: auto;
  margin-right: auto;
}
</style>