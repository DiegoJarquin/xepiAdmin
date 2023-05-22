<template>
  <div id="table">


    <div class="field">
      <label class="label">DPI</label>
      <div class="control">
        <input class="input" type="number" placeholder="DPI" v-model="dpi">
      </div>
    </div>


    <div class="field">
      <label class="flexbox">Nombre(s)</label>
      <div class="control">
        <input class="input" type="text" placeholder="Nombres" v-model="nombres">
      </div>
    </div>

    <div class="field">
      <label class="label">Apellido(s)</label>

      <div class="control">
        <input class="input" type="text" placeholder="Apellidos" v-model="apellidos">
      </div>
    </div>

    <div class="field">
      <label class="label">Fecha de nacimiento</label>

      <div class="control">
        <input class="input" type="date" v-model="fecha_nacimiento">
      </div>
    </div>

    <div class="field">
      <label class="label">Sueldo</label>
      <div class="control">
        <input class="input" type="number" placeholder="Sueldo" v-model="sueldo">
      </div>
    </div>

    <div class="field">
      <label class="label">Asignar a Ubicacion</label>
      <div class="control">
        <select id="cat" class="cat" name="cat" v-model="ubicacion">
          <option v-for="location in this.locations" :value="location.ubicacion_id">{{location.ubicacion_id}} - {{location.nombre}} </option>

        </select>
      </div>
    </div>

    <button v-on:click="guardarEmpleado" class="button-6" role="button">guardar</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    hide: {
      type: Boolean
    }
  },
  name: "agregarEmpleado",
  data() {
    return{
      locations: [],
      dpi: "",
      nombres: "",
      apellidos: "",
      fecha_nacimiento: "",
      sueldo: "",
      ubicacion: ""
    }
  },

  created() {
    this.getUbicaciones();
  },

  methods:{

    async guardarEmpleado(){
      try {
        await axios.post("http://192.168.0.8:3000/empleado",
            {
              dpi: this.dpi,
              nombres: this.nombres,
              apellidos: this.apellidos,
              fecha_nacimiento: this.fecha_nacimiento,
              sueldo: this.sueldo,
              ubicacion: this.ubicacion,
              detalle: 0
            })
        this.$router.push('/')
        this.$emit('hide', true)
      }catch (err){
        console.log(err)
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
  .cat {padding: .1em .3em; width: 50%; font-size: 1.8vw;}
  .input { padding: .1em .3em; width: 100%;font-size: 1.8vw; }
}
@media (min-width: 1281px) {
  .cat {padding: .1em .3em; width: 55%; font-size: 18px;}
  .input { padding: .1em .3em; width: 100%;font-size: 18px; }
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