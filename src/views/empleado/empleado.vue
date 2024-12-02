<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Empleados'" :tituloBoton="'Crear Empleado'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Empleados'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                  @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formEmpleado v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
              :dataValue="datagetDataByid" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="empleados" stripe style="width: 100%">
        <el-table-column prop="Nombre_empleado" label="Nombre del Empleado" />
        <el-table-column prop="Fecha_ingreso" label="Fecha de Ingreso" />
        <el-table-column prop="Codigo_empleado" label="Código del Empleado" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">
            </el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarEmpleado(registro.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue";
import formEmpleado from './components/formEmpleado.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const datagetDataByid = ref();
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
    await crearEmpleado();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarEmpleado();
  }
};

const crearEmpleado = async () => {
  const url = 'http://127.0.0.1:8000/api/empleado/save';

  const dataFormulario = {
    Nombre_empleado: formRef.value.formulario.Nombre_empleado,
    Fecha_ingreso: formRef.value.formulario.Fecha_ingreso,
    Codigo_empleado: formRef.value.formulario.Codigo_empleado
  };
  try {
    axios.post(url, dataFormulario)
      .then(function (response) {
        console.log(response);
        formRef.value?.limpiarFormulario();
        ElMessage({
          message: 'El empleado se creó con éxito.',
          type: 'success',
        });
        datosEmpleado();
        mostrarFormulario.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al crear empleado', error);
  }
};

const actualizarEmpleado = async () => {
  const url = 'http://127.0.0.1:8000/api/empleado/update';

  const dataFormulario = {
    id: datagetDataByid.value[0].id,
    Nombre_empleado: formRef.value.formulario.Nombre_empleado,
    Fecha_ingreso: formRef.value.formulario.Fecha_ingreso,
    Codigo_empleado: formRef.value.formulario.Codigo_empleado
  };
  try {
    axios.put(url, dataFormulario)
      .then(function (response) {
        console.log(response);
        formRef.value?.limpiarFormulario();
        ElMessage({
          message: 'El empleado se actualizó con éxito.',
          type: 'success',
        });
        datosEmpleado();
        mostrarFormulario.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error('Error al actualizar empleado', error);
  }
};

const getDataByid = async (id) => {
  const url = 'http://127.0.0.1:8000/api/empleado/getDataByid';

  try {
    const response = axios.get(url, {
      params: { id: id }
    });
    return (await response).data.result;
  } catch (error) {
    console.error('Error al obtener datos de empleado', error);
  }
};


const eliminarEmpleado = async (id) => {
  const url = 'http://127.0.0.1:8000/api/empleado/delete';

  ElMessageBox.confirm(
    '¿Está seguro de eliminar el empleado?',
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
            datosEmpleado();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.error('Error al eliminar empleado', error);
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

const datosEmpleado = async () => {
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
  datosEmpleado();
  obtenerEmpleados();
});
</script>