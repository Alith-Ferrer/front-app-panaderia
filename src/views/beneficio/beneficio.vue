<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
          :titulo="'Beneficio'"
          :tituloBoton="'Crear'"
          :abrir="abrirFormulario"
        />
  
        <Formulario :titulo="'Gestión de Beneficios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <formBeneficio v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" />
              </el-col>
            </el-row>
          </template>
        </Formulario>      
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="nombre" label="Nombre del Beneficio" width="180" />
          <el-table-column prop="tipo" label="Tipo de Beneficio" width="180" />
          <el-table-column prop="monto" label="Monto Correspondiente" />
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
  import formBeneficio from './components/formBeneficio.vue';
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
      nombre: 'Bono de Alimentación',
      tipo: 'Monetario',
      monto: '50000',
    },
    {
      nombre: 'Seguro Médico',
      tipo: 'No Monetario',
      monto: '100000',
    }
  ];
  </script>
