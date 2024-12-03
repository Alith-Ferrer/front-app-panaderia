<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Prestaciones Sociales'" :tituloBoton="'Crear Prestación'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Prestaciones Sociales'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <formPrestacion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :contratos="contratos" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="prestaciones" stripe style="width: 100%">
              <el-table-column prop="Tipo_prestacion" label="Tipo de Prestación" />
              <el-table-column prop="Nombre_prestacion_social" label="Nombre de la Prestación" />
              <el-table-column prop="Fecha_inicio_prestacion" label="Fecha de Inicio" />
              <el-table-column prop="Fecha_fin_prestacion" label="Fecha de Fin" />
              <el-table-column prop="id_contrato_laborar" label="ID Contrato Laboral" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarPrestacion(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import formPrestacion from './components/formPrestacion.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const contratos = ref([])
const prestaciones = ref([])

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
      await crearPrestacion()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarPrestacion()
  }
}

const crearPrestacion = async () => {
  const url = 'http://127.0.0.1:8000/api/PrestacionesSociale/save'
  const dataFormulario = {
      Tipo_prestacion: formRef.value.formulario.Tipo_prestacion,
      Nombre_prestacion_social: formRef.value.formulario.Nombre_prestacion_social,
      Fecha_inicio_prestacion: formRef.value.formulario.Fecha_inicio_prestacion,
      Fecha_fin_prestacion: formRef.value.formulario.Fecha_fin_prestacion,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'La prestación se creó con éxito.',
                  type: 'success',
              })
              datosPrestacion()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear prestación', error)
  }
}

const actualizarPrestacion = async () => {
  const url = 'http://127.0.0.1:8000/api/PrestacionesSociale/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Tipo_prestacion: formRef.value.formulario.Tipo_prestacion,
      Nombre_prestacion_social: formRef.value.formulario.Nombre_prestacion_social,
      Fecha_inicio_prestacion: formRef.value.formulario.Fecha_inicio_prestacion,
      Fecha_fin_prestacion: formRef.value.formulario.Fecha_fin_prestacion,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'La prestación se actualizó con éxito.',
                  type: 'success',
              })
              datosPrestacion()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar prestación', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/PrestacionesSociale/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos de la prestación', error)
  }
}

const eliminarPrestacion = async (id) => {
  const url = 'http://127.0.0.1:8000/api/PrestacionesSociale/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar la prestación?',
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
                      datosPrestacion()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar prestación', error)
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

const datosPrestacion = async () => {
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
  datosPrestacion()
})
</script>