<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Tipos de Prestación'" :tituloBoton="'Crear Tipo de Prestación  +'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Tipos de Prestación'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <formTipoPrestacion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :prestaciones="prestaciones" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="tiposPrestacion" stripe style="width: 100%">
              <el-table-column prop="Tipo" label="Tipo" />
              <el-table-column prop="id_prestacion_social" label="ID Prestación Social" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarTipoPrestacion(registro.row.id)"></el-button>
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
import formTipoPrestacion from './components/formTipoPrestacion.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const prestaciones = ref([])
const tiposPrestacion = ref([])

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
      await crearTipoPrestacion()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarTipoPrestacion()
  }
}

const crearTipoPrestacion = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoPrestacionesSociale/save'
  const dataFormulario = {
      Tipo: formRef.value.formulario.Tipo,
      id_prestacion_social: formRef.value.formulario.id_prestacion_social
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de prestación se creó con éxito.',
                  type: 'success',
              })
              datosTipoPrestacion()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear tipo de prestación', error)
  }
}

const actualizarTipoPrestacion = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoPrestacionesSociale/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Tipo: formRef.value.formulario.Tipo,
      id_prestacion_social: formRef.value.formulario.id_prestacion_social
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de prestación se actualizó con éxito.',
                  type: 'success',
              })
              datosTipoPrestacion()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar tipo de prestación', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoPrestacionesSociale/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos del tipo de prestación', error)
  }
}

const eliminarTipoPrestacion = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoPrestacionesSociale/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar el tipo de prestación?',
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
                      datosTipoPrestacion()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar tipo de prestación', error)
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

const datosTipoPrestacion = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoPrestacionesSociale/getData'
  try {
      axios.get(url)
          .then(function (response) {
              tiposPrestacion.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de tipos de prestación', error)
  }
}

const getPrestaciones = async () => {
  const url = 'http://127.0.0.1:8000/api/PrestacionesSociale/getData'
  try {
      axios.get(url)
          .then(function (response) {
              prestaciones.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de prestaciones', error)
  }
}

onMounted(() => {
  getPrestaciones()
  datosTipoPrestacion()
})
</script>