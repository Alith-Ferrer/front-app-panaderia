<template>
  <el-card style="max-width: 100%">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Formulario Beneficio</h1>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Nombre del Beneficio">
            <el-input v-model="form.nombre"></el-input>
          </el-form-item>
          <el-form-item label="Tipo de Beneficio">
            <el-select v-model="form.tipo" placeholder="Seleccione">
              <el-option label="Monetario" value="Monetario"></el-option>
              <el-option label="No Monetario" value="No Monetario"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Monto Correspondiente">
            <el-input v-model="form.monto" type="number"></el-input>
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
  tipo: '',
  monto: ''
});
</script>