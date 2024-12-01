<template>
    <el-card style="max-width: 100%">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h1>Formulario Tipo de Beneficio</h1>
          <el-form :model="form" label-width="120px">
            <el-form-item label="Tipo de Beneficio">
              <el-input v-model="form.tipoBeneficio"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const form = reactive({
    tipoBeneficio: ''
  });
  </script>