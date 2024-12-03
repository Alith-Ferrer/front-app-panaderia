<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Tipos de Beneficio'" :tituloBoton="'Crear Tipo de Beneficio'" :abrir="abrirFormulario" />

          <Formulario :titulo="'Gestión de Tipos de Beneficio'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <formTipoBeneficio v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :beneficios="beneficios" :dataValue="datagetDataByid" />
                      </el-col>
                  </el-row>
              </template>
          </Formulario>

          <el-table :data="tiposBeneficio" stripe style="width: 100%">
              <el-table-column prop="Tipo" label="Tipo" />
              <el-table-column prop="id_beneficios" label="ID Beneficio" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarTipoBeneficio(registro.row.id)"></el-button>
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
import formTipoBeneficio from './components/formTipoBeneficio.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const datagetDataByid = ref()
const beneficios = ref([])
const tiposBeneficio = ref([])

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
      await crearTipoBeneficio()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarTipoBeneficio()
  }
}

const crearTipoBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoBeneficio/save'
  const dataFormulario = {
      Tipo: formRef.value.formulario.Tipo,
      id_beneficios: formRef.value.formulario.id_beneficios
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de beneficio se creó con éxito.',
                  type: 'success',
              })
              datosTipoBeneficio()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al crear tipo de beneficio', error)
  }
}

const actualizarTipoBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoBeneficio/update'
  const dataFormulario = {
      id: datagetDataByid.value[0].id,
      Tipo: formRef.value.formulario.Tipo,
      id_beneficios: formRef.value.formulario.id_beneficios
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El tipo de beneficio se actualizó con éxito.',
                  type: 'success',
              })
              datosTipoBeneficio()
              mostrarFormulario.value = false
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al actualizar tipo de beneficio', error)
  }
}

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoBeneficio/getDataByid'
  try {
      const response = axios.get(url, {
          params: { id: id }
      })
      return (await response).data.result
  } catch (error) {
      console.error('Error al obtener datos del tipo de beneficio', error)
  }
}

const eliminarTipoBeneficio = async (id) => {
  const url = 'http://127.0.0.1:8000/api/TipoBeneficio/delete'
  ElMessageBox.confirm(
      '¿Está seguro de eliminar el tipo de beneficio?',
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
                      datosTipoBeneficio()
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          } catch (error) {
              console.error('Error al eliminar tipo de beneficio', error)
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

const datosTipoBeneficio = async () => {
  const url = 'http://127.0.0.1:8000/api/TipoBeneficio/getData'
  try {
      axios.get(url)
          .then(function (response) {
              tiposBeneficio.value = response.data.result
          })
          .catch(function (error) {
              console.log(error);
          });
  } catch (error) {
      console.error('Error al obtener datos de tipos de beneficio', error)
  }
}

const getBeneficios = async () => {
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

onMounted(() => {
  getBeneficios()
  datosTipoBeneficio()
})
</script>