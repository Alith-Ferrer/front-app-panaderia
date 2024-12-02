<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Beneficios'" :tituloBoton="'Crear Beneficio  +'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Beneficios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <formBeneficio v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :contratos="contratos" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="beneficios" stripe style="width: 100%">
              <el-table-column prop="Nombre_beneficio" label="Nombre del Beneficio" />
              <el-table-column prop="Tipo_beneficio" label="Tipo de Beneficio" />
              <el-table-column prop="Monto_correspondiente_beneficio" label="Monto Correspondiente" />
              <el-table-column prop="id_contrato_laborar" label="ID Contrato Laboral" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarBeneficio(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import {  onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import formBeneficio from './components/formBeneficio.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const contratos = ref([])
const beneficios = ref([])

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
      await crearBeneficio()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarBeneficio()
  }
}

const crearBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/Beneficio/save'
  const dataFormulario = {
      Nombre_beneficio: formRef.value.formulario.Nombre_beneficio,
      Tipo_beneficio: formRef.value.formulario.Tipo_beneficio,
      Monto_correspondiente_beneficio: formRef.value.formulario.Monto_correspondiente_beneficio,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El beneficio se creó con éxito.',
                  type: 'success',
              })
              datosBeneficio()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear beneficio', error)
  }
}

const actualizarBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/Beneficio/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Nombre_beneficio: formRef.value.formulario.Nombre_beneficio,
      Tipo_beneficio: formRef.value.formulario.Tipo_beneficio,
      Monto_correspondiente_beneficio: formRef.value.formulario.Monto_correspondiente_beneficio,
      id_contrato_laborar: formRef.value.formulario.id_contrato_laborar
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El beneficio se actualizó con éxito.',
                  type: 'success',
              })
              datosBeneficio()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar beneficio', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/Beneficio/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos del beneficio', error)
  }
}

const eliminarBeneficio = async (id) => {
  const url = 'http://127.0.0.1:8000/api/Beneficio/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar el beneficio?',
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
                      datosBeneficio()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar beneficio', error)
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

const datosBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/Beneficio/getData'
  try {
      axios.get(url)
          .then(function (response) {
              beneficios.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de beneficios', error)
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
  datosBeneficio()
})
</script>