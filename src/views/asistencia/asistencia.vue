<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Asistencia'" :tituloBoton="'Registrar Asistencia'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Asistencias'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                  @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formAsistencia v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :empleados="empleados" :dataValue="datagetDataByid" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="asistencias" stripe style="width: 100%">
        <el-table-column prop="Fecha_asistencia" label="Fecha de Asistencia" />
        <el-table-column prop="Hora_entrada" label="Hora de Entrada" />
        <el-table-column prop="Hora_salida" label="Hora de Salida" />
        <el-table-column prop="id_empleado" label="ID Empleado" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">
            </el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarAsistencia(registro.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch  } from 'vue';
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue";
import formAsistencia from './components/formAsistencia.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const datagetDataByid = ref();
const asistencias = ref([]);
const empleados = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  datagetDataByid.value = await getDataByid(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearAsistencia();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarAsistencia();
  }
};

const crearAsistencia = async () => {
  const url = 'http://127.0.0.1:8000/api/Asistencia/save';

  const dataFormulario = {
    Fecha_asistencia: formRef.value.formulario.Fecha_asistencia,
    Hora_entrada: formRef.value.formulario.Hora_entrada,
    Hora_salida: formRef.value.formulario.Hora_salida,
    id_empleado: formRef.value.formulario.id_empleado
  };
  try {
    axios.post(url, dataFormulario)
      .then(function (response) {
        console.log(response);
        formRef.value?.limpiarFormulario();
        ElMessage({
          message: 'La asistencia se registró con éxito.',
          type: 'success',
        });
        datosAsistencia();
        mostrarFormulario.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al registrar asistencia', error);
  }
};

const actualizarAsistencia = async () => {
  const url = 'http://127.0.0.1:8000/api/Asistencia/update';

  const dataFormulario = {
    id: datagetDataByid.value[0].id,
    Fecha_asistencia: formRef.value.formulario.Fecha_asistencia,
    Hora_entrada: formRef.value.formulario.Hora_entrada,
    Hora_salida: formRef.value.formulario.Hora_salida,
    id_empleado: formRef.value.formulario.id_empleado
  };
  try {
    axios.put(url, dataFormulario)
      .then(function (response) {
        console.log(response);
        formRef.value?.limpiarFormulario();
        ElMessage({
          message: 'La asistencia se actualizó con éxito.',
          type: 'success',
        });
        datosAsistencia();
        mostrarFormulario.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al actualizar asistencia', error);
  }
};

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/Asistencia/getDataByid';

  try {
    const response = axios.get(url, {
      params: { id: id }
    });
    return (await response).data.result;
  } catch (error) {
    console.error('Error al obtener datos de asistencia', error);
  }
};

const eliminarAsistencia = async (id) => {
  const url = 'http://127.0.0.1:8000/api/Asistencia/delete';

  ElMessageBox.confirm(
    '¿Está seguro de eliminar la asistencia?',
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
            datosAsistencia();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.error('Error al eliminar asistencia', error);
      }
      ElMessage({
        type: 'success',
        message: 'Se eliminó correctamente el registro',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      });
    });
};

const datosAsistencia = async () => {
  const url = 'http://127.0.0.1:8000/api/Asistencia/getData';

  try {
    axios.get(url)
      .then(function (response) {
        asistencias.value = response.data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al obtener datos de asistencias', error);
  }
};

const obtenerEmpleados = async () => {
  const url = 'http://127.0.0.1:8000/api/empleado/getData';

  try {
    axios.get(url)
      .then(function (response) {
        empleados.value = response.data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al obtener datos de empleados', error);
  }
};

onMounted(() => {
  datosAsistencia();
  obtenerEmpleados();
});
</script>