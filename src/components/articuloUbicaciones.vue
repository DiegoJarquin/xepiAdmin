<template>
<ul v-for="itemlocation in itemlocations" :key="itemlocation.articulo_id">
  <li>{{itemlocation.nombre}}: {{ itemlocation.cantidad }}</li>
</ul>
</template>

<script>
import axios from "axios";
export default {
  name: "articuloUbicaciones",
  props: {
    art_id: {
      type: Number
    }
  },
  data(){
    return{
      itemlocations:[],
    }
  },
  created() {
    this.getArticuloUbicaciones()
  },

  methods: {
    async getArticuloUbicaciones(){
      try {
        console.log(this.art_id)
        const response = await axios.get(`http://192.168.0.8:3000/articuloUbicacion?id=${this.art_id}`);

        console.log(this.itemlocations.length);
        for (let i = 0; i < response.data.articulosUbicacion.length; i++) {
          this.itemlocations.push({
              "nombre":response.data.articulosUbicacion[i].nombre,
              "cantidad":response.data.articulosUbicacion[i].cantidad
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

</style>