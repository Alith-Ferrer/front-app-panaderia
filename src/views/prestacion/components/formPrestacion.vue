<template>
  <el-card style="max-width: 100%">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Formulario Prestación</h1>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Tipo de Prestación">
            <el-select v-model="form.tipoPrestacion" placeholder="Seleccione">
              <el-option label="Vacaciones" value="Vacaciones"></el-option>
              <el-option label="Licencia" value="Licencia"></el-option>
              <el-option label="Bonificación" value="Bonificación"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Nombre de la Prestación Social">
            <el-input v-model="form.nombrePrestacion"></el-input>
          </el-form-item>
          <el-form-item label="Fecha de Inicio">
            <el-date-picker v-model="form.fechaInicio" type="date" placeholder="Seleccione la fecha"></el-date-picker>
          </el-form-item>
          <el-form-item label="Fecha de Fin">
            <el-date-picker v-model="form.fechaFin" type="date" placeholder="Seleccione la fecha"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  tipoPrestacion: '',
  nombrePrestacion: '',
  fechaInicio: '',
  fechaFin: ''
});
</script>