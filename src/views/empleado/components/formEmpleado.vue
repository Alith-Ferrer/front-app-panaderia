<template>
  <el-card style="max-width: 100%">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Formulario Empleado</h1>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Nombre del Empleado">
            <el-input v-model="form.nombre"></el-input>
          </el-form-item>
          <el-form-item label="Fecha de Ingreso">
            <el-date-picker v-model="form.fechaIngreso" type="date" placeholder="Seleccione la fecha"></el-date-picker>
          </el-form-item>
          <el-form-item label="Código del Empleado">
            <el-input v-model="form.codigo"></el-input>
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
  fechaIngreso: '',
  codigo: ''
});
</script>