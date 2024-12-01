<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
          :titulo="'Tipo de Prestación Social'"
          :tituloBoton="'Crear'"
          :abrir="abrirFormulario"
        />
  
        <Formulario :titulo="'Gestión de Tipos de Prestación Social'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <formTipoPrestacion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" />
              </el-col>
            </el-row>
          </template>
        </Formulario>      
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="tipoPrestacion" label="Tipo de Prestación Social" width="180" />
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
  import formTipoPrestacion from './components/formTipoPrestacion.vue';
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
    { tipoPrestacion: 'Vacaciones' },
    { tipoPrestacion: 'Licencia' },
    { tipoPrestacion: 'Bonificación' }
  ];
  </script>