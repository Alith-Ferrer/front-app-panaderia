<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
          :titulo="'Contrato'"
          :tituloBoton="'Crear'"
          :abrir="abrirFormulario"
        />
  
        <Formulario :titulo="'Gestión de Contratos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <formContrato v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" />
              </el-col>
            </el-row>
          </template>
        </Formulario>      
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="tipoContrato" label="Tipo de Contrato" width="180" />
          <el-table-column prop="fechaInicio" label="Fecha de Inicio" width="180" />
          <el-table-column prop="fechaFin" label="Fecha de Fin" />
          <el-table-column prop="salario" label="Salario Correspondiente" />
          <el-table-column fixed="right" label="Acciones" min-width="120">
            <template #default>
              <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario"></el-button>
              <el-button link type="danger" :icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </LayoutMain>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import LayoutMain from '../../components/LayoutMain.vue';
  import formContrato from './components/formContrato.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import { Delete, Edit } from "@element-plus/icons-vue";
  
  const mostrarFormulario = ref(false);
  const editandoFormulario = ref(false);
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true;
    editandoFormulario.value = false;
  };
  
  const editarFormulario = async () => {
    mostrarFormulario.value = true;
    editandoFormulario.value = true;
  };
  
  const tableData = [
    {
      tipoContrato: 'Indefinido',
      fechaInicio: '01/01/2024',
      fechaFin: '31/12/2024',
      salario: '5000000',
    },
    {
      tipoContrato: 'Temporal',
      fechaInicio: '01/06/2024',
      fechaFin: '30/11/2024',
      salario: '3000000',
    }
  ];
  </script>