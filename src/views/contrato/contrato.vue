<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Contratos Laborales'" :tituloBoton="'Crear Contrato  +'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Contratos Laborales'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <formContrato v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :empleados="empleados" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="contratos" stripe style="width: 100%">
              <el-table-column prop="Tipo_contrato_laboral" label="Tipo de Contrato" />
              <el-table-column prop="Fecha_inicio_contrato_laboral" label="Fecha de Inicio" />
              <el-table-column prop="Fecha_fin_contrato_laboral" label="Fecha de Fin" />
              <el-table-column prop="Salario_contrato_laboral" label="Salario" />
              <el-table-column prop="id_empleado" label="Empleado" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarContrato(registro.row.id)"></el-button>
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
import FormContrato from './components/formContrato.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const empleados = ref([])
const contratos = ref([])

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
      await crearContrato()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarContrato()
  }
}

const crearContrato = async () => {
  const url = 'http://127.0.0.1:8000/api/ContratosLaborale/save'
  const dataFormulario = {
      Tipo_contrato_laboral: formRef.value.formulario.Tipo_contrato_laboral,
      Fecha_inicio_contrato_laboral: formRef.value.formulario.Fecha_inicio_contrato_laboral,
      Fecha_fin_contrato_laboral: formRef.value.formulario.Fecha_fin_contrato_laboral,
      Salario_contrato_laboral: formRef.value.formulario.Salario_contrato_laboral,
      id_empleado: formRef.value.formulario.id_empleado
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El contrato se creó con éxito.',
                  type: 'success',
              })
              datosContrato()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear contrato', error)
  }
}

const actualizarContrato = async () => {
  const url = 'http://127.0.0.1:8000/api/ContratosLaborale/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Tipo_contrato_laboral: formRef.value.formulario.Tipo_contrato_laboral,
      Fecha_inicio_contrato_laboral: formRef.value.formulario.Fecha_inicio_contrato_laboral,
      Fecha_fin_contrato_laboral: formRef.value.formulario.Fecha_fin_contrato_laboral,
      Salario_contrato_laboral: formRef.value.formulario.Salario_contrato_laboral,
      id_empleado: formRef.value.formulario.id_empleado
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El contrato se actualizó con éxito.',
                  type: 'success',
              })
              datosContrato()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar contrato', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/ContratosLaborale/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos del contrato', error)
  }
}

const eliminarContrato = async (id) => {
  const url = 'http://127.0.0.1:8000/api/ContratosLaborale/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar el contrato?',
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
                      datosContrato()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar contrato', error)
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

const datosContrato = async () => {
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

const getEmpleados = async () => {
  const url = 'http://127.0.0.1:8000/api/empleados/datos'
  try {
      axios.get(url)
          .then(function (response) {
              empleados.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de empleados', error)
  }
}

onMounted(() => {
  getEmpleados()
  datosContrato()
})
</script>