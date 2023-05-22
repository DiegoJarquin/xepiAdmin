<template>
  <div class="field">
    <label class="label">Agregar Articulo</label>
    <div class="control">
      <select id="cat" class="cat" name="cat" v-model="aid">
        <option v-for="articulo in this.articulos" :value="articulo.aid">{{articulo.aid}} - {{articulo.nombre}} - {{articulo.categoria}}</option>

      </select>
    </div>
  </div>

  <div class="field">
    <label class="label">Cantidad</label>
    <div class="control">
      <input class="input" type="number" placeholder="0" v-model="cantidad">
    </div>
  </div>
  <button v-on:click="guardarArticulo()" class="button-6" role="button">guardar</button>

</template>

<script>
import axios from "axios";
export default {
  props: {
    hide:{
      type: Boolean
    },
    articulos: {
      type: Array
    },
    ubicacion_id:{
      type: Number
    }
  },
  name: "agregarInventarioUbicacion",
  data(){
    return{
      hide: true,
      hideLocation: true,
      items: [],
      locations: [],
      itemlocations:[],
      aid: "",
      cantidad: ""
    }
  },
  methods: {
    async guardarArticulo(){
      // console.log(this.id)
      // console.log(this.nombre)
      try {
        await axios.post(`http://192.168.0.8:3000/ubicacionArticulo?id=${this.ubicacion_id}`,
            {
              articulo_id: this.aid,
              cantidad: this.cantidad,
            })
        this.$router.push('/')
        this.$emit('hide', true)

        // window.location.reload();
      }catch (err){
        console.log(error.response.data)
      }
    }
  }
}
</script>

<style scoped>

#table{
  background-color: #393939;
}
</style>