<template>
  <table id="tableloc" >
    <thead>
    <tr>
      <th id="rowhead" class="has-text-centered">DPI</th>
      <th id="rowhead" class="has-text-centered">Nombres</th>
      <th id="rowhead" class="has-text-centered">Apellidos</th>

    </tr>
    </thead>
    <tbody  v-for="empleado in ubicacionEmpleados" :key="ubicacionEmpleados.dpi" >
    <tr >
      <td>{{ empleado.dpi }}</td>
      <td>{{ empleado.nombres }}</td>
      <td>{{ empleado.apellidos }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "ubicacionesEmpleado",
  props: {
    u_id: {
      type: Number
    }
  },
  data(){
    return{
      ubicacionEmpleados:[],
    }
  },
  created() {
    this.getEmpleados()
  },
  methods:{
    async getEmpleados(){
      try {
        const response = await axios.get(`http://192.168.0.8:3000/empleadosUbicacion?id=${this.u_id}`);
        this.ubicacionEmpleados = response.data.empleadosUbicacion;


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
  background-color: rgba(50, 119, 255, 0.44);


}

tr {
  border: solid;
  border-width: 1px 0;
}
#tableloc {
  border-collapse: collapse;
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