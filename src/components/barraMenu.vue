<template>
  <div id="mainWindow">
    <div id="barra">
      <a id="barrabtn" style="margin: 3%" @click="activarInventario">Inventario</a>
      <a id="barrabtn" style="margin: 3%" @click="activarUbicaciones">Ubicaciones</a>
    </div>

<!--    <a class="button is-danger is-small" @click="hideLocation = !hideLocation" id="btnHover" v-if="mostrarUbicaciones && hideLocation">Agregar Ubicación</a>-->
<!--    <a class="button is-danger is-small" @click="hideLocation = !hideLocation" id="btnHover" v-if="mostrarUbicaciones && !hideLocation">Cancelar</a>-->
    <ListaInventario v-if="mostrarInventario"/>
    <ListaUbicaciones v-if="mostrarUbicaciones"/>

<!--    <div id="add" v-if="!hideLocation">-->
<!--      <agregar-ubicacion @hide="hideAdd"/>-->
<!--    </div>-->
  </div>


</template>

<script>
import ListaInventario from "@/components/ListaInventario.vue";
import ListaUbicaciones from "@/components/ListaUbicaciones.vue";
import articuloUbicaciones from "@/components/articuloUbicaciones.vue";
import agregarInventarioUbicacion from "@/components/agregarInventarioUbicacion.vue";
import agregarUbicacion from "@/components/agregarUbicacion.vue";
import editarInventario from "@/components/EditarInventario.vue";
import axios from "axios";
export default {
  name: "barraMenu",
  components:{
    ListaInventario,
    ListaUbicaciones,
    agregarInventarioUbicacion,
    articuloUbicaciones,
    agregarUbicacion,
    editarInventario
  },
  data(){
    return{
      mostrarInventario: false,
      mostrarUbicaciones: false,
      hideLocation: true,

    }
  },
  methods: {
    hideAdd(val){
      this.hideLocation = val
      this.getArticulos()
      this.getUbicaciones()
    },
    activarInventario () {
      this.mostrarInventario = !this.mostrarInventario;
    },
    activarUbicaciones () {
      this.mostrarUbicaciones = !this.mostrarUbicaciones;
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

#barra{
  overflow: hidden;
  background-color: #333;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

}
#barrabtn{
  overflow: hidden;
  width: 15%;
  height: 50px;
}
#barrabtn:hover{
  background-color: hsla(219, 77%, 53%, 0.2);;
}


</style>