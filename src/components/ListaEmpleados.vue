<template>
  <div id="mainWindow">
    <!--    <router-link :to="{ name: 'Create' }" class="button is-success mt-5">Agregar</router-link>-->
    <a class="button is-danger is-small" @click="hide = !hide" id="btnHover" v-if="hide">Agregar Empleado</a>
    <a class="button is-danger is-small" @click="hide = !hide" id="btnHover" v-if="!hide">Cancelar</a>
    <br>
    <table id="table" >
      <thead>
      <tr>
        <th id="rowhead" class="has-text-centered" >DPI</th>
        <th id="rowhead" class="has-text-centered" >Nombre(s)</th>
        <th id="rowhead" class="has-text-centered" >Apellido(s)</th>
        <th id="rowhead" class="has-text-centered" >Edad</th>
        <th id="rowhead" class="has-text-centered" >Sueldo</th>
        <th id="rowhead" class="has-text-centered">Acciones</th>
      </tr>
      </thead>
      <tbody  v-for="(empleado, index) in empleados" :key="empleado.dpi" v-on:click="toggleDetails(index);">
      <tr >
        <td>{{ empleado.dpi }}</td>
        <td>{{ empleado.nombres }}</td>
        <td>{{ empleado.apellidos }}</td>
        <td>{{ dateToAge(new Date(empleado.fecha_nacimiento)) }}</td>
        <td>GTQ {{ empleado.sueldo }}</td>
        <td class="has-text-centered">
          <router-link
              :to="{ name: 'EditEmpleado', params: { id: empleado.dpi } }"
              class="button is-info is-small" id="btn">Editar</router-link>
          <a class="button is-danger is-small" @click="deleteEmpleado(empleado.dpi)" id="btn">Eliminar</a>
        </td>
      </tr>

      <tr id="hide" v-if="empleado.detalle" :class="{'open-details': empleado.detalle, 'close-details': !empleado.detalle}">
        <td colspan="6">{{empleado.nombre}}</td>
      </tr>

      </tbody>
    </table>


    <div id="add" v-if="!hide">
      <agregar-empleado @hide="hideAdd"></agregar-empleado>
    </div>
    <br>
    <br>



  </div>
</template>

<script>
import AgregarEmpleado from "@/components/agregarEmpleado.vue";
import axios from "axios";

export default {
  name: "ListaEmpleados",
  components: {AgregarEmpleado},
  data(){
    return{
      hide: true,
      empleados: [],
    }
  },
  created() {
    this.getEmpleados();

  },

  methods:{
    toggleDetails(index) {
      this.empleados[index].detalle = !this.empleados[index].detalle;
    },

    hideAdd(val){
      this.hide = val
      this.getEmpleados()
    },

    async getEmpleados(){
      try {
        const response = await axios.get("http://192.168.0.8:3000/empleados");
        this.empleados = response.data.empleados;
        console.log(this.empleados);

      } catch (err){
        console.log(err);
      }
    },
    async deleteEmpleado(id){

      try {
        await axios.delete(`http://192.168.0.8:3000/empleado?id=${id}`);
        window.location.reload();
      } catch (err){
        console.log(err);
      }
    },

    dateToAge(fecha_nac){
      var dif_mes = Date.now() - fecha_nac.getTime();
      var dif_edad = new Date(dif_mes);

      var year = dif_edad.getUTCFullYear();
      var edad = Math.abs(year - 1970);


      return edad;
    }


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