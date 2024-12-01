<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
          :titulo="'Prestación'"
          :tituloBoton="'Crear'"
          :abrir="abrirFormulario"
        />
  
        <Formulario :titulo="'Gestión de Prestaciones'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <formPrestacion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" />
              </el-col>
            </el-row>
          </template>
        </Formulario>      
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="tipoPrestacion" label="Tipo de Prestación" width="180" />
          <el-table-column prop="nombrePrestacion" label="Nombre de la Prestación Social" width="180" />
          <el-table-column prop="fechaInicio" label="Fecha de Inicio" />
          <el-table-column prop="fechaFin" label="Fecha de Fin" />
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
  import formPrestacion from './components/formPrestacion.vue';
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
      tipoPrestacion: 'Vacaciones',
      nombrePrestacion: 'Vacaciones Anuales',
      fechaInicio: '01/01/2024',
      fechaFin: '15/01/2024',
    },
    {
      tipoPrestacion: 'Licencia',
      nombrePrestacion: 'Licencia de Maternidad',
      fechaInicio: '01/06/2024',
      fechaFin: '01/09/2024',
    }
  ];
  </script>