<template>
  <el-card style="max-width: 100%">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Formulario Asistencia</h1>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Nombre">
            <el-input v-model="form.nombre"></el-input>
          </el-form-item>
          <el-form-item label="Asistencia">
            <el-select v-model="form.asistencia" placeholder="Seleccione">
              <el-option label="Presente" value="Presente"></el-option>
              <el-option label="Ausente" value="Ausente"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Fecha de Entrada">
            <el-date-picker v-model="form.fechaEntrada" type="datetime" placeholder="Seleccione la fecha y hora"></el-date-picker>
          </el-form-item>
          <el-form-item label="Fecha de Salida">
            <el-date-picker v-model="form.fechaSalida" type="datetime" placeholder="Seleccione la fecha y hora"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  nombre: '',
  asistencia: '',
  fechaEntrada: '',
  fechaSalida: ''
});
</script>