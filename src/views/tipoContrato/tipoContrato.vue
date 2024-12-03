<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Tipos de Contrato'" :tituloBoton="'Crear Tipo de Contrato'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Tipos de Contrato'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormTipoContrato v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :contratos="contratos" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="tiposContrato" stripe style="width: 100%">
              <el-table-column prop="Tipo" label="Tipo" />
              <el-table-column prop="id_contrato_laborar" label="ID Contrato Laboral" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarTipoContrato(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import FormTipoContrato from './components/formTipoContrato.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const contratos = ref([])
const tiposContrato = ref([])

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  datagetDataByid.value = await getDataByid(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearTipoContrato()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarTipoContrato()
  }
}

const crearTipoContrato = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoContrato/save'
  const dataFormulario = {
      Tipo: formRef.value.formulario.Tipo,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de contrato se creó con éxito.',
                  type: 'success',
              })
              datosTipoContrato()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear tipo de contrato', error)
  }
}

const actualizarTipoContrato = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoContrato/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Tipo: formRef.value.formulario.Tipo,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de contrato se actualizó con éxito.',
                  type: 'success',
              })
              datosTipoContrato()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar tipo de contrato', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoContrato/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos del tipo de contrato', error)
  }
}

const eliminarTipoContrato = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoContrato/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar el tipo de contrato?',
      'Eliminar Registro',
      {
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar',
          type: 'error',
      }
  )
      .then(() => {
          try {
              axios.delete(url, { data: { id } })
                  .then(function (response) {
                      datosTipoContrato()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar tipo de contrato', error)
          }
          ElMessage({
              type: 'success',
              message: 'Se eliminó correctamente el registro',
          })
      })
      .catch(() => {
          ElMessage({
              type: 'info',
              message: 'Eliminación cancelada',
          })
      })
}

const datosTipoContrato = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoContrato/getData'
  try {
      axios.get(url)
          .then(function (response) {
              tiposContrato.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de tipos de contrato', error)
  }
}

const getContratos = async () => {
  const url = 'http://127.0.0.1:8000/api/ContratosLaborale/getData'
  try {
      axios.get(url)
          .then(function (response) {
              contratos.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de contratos', error)
  }
}

onMounted(() => {
  getContratos()
  datosTipoContrato()
})
</script>