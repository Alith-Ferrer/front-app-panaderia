<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
           :size="formSize" status-icon>
    <el-form-item label="Fecha de Asistencia" prop="Fecha_asistencia">
      <el-date-picker v-model="formulario.Fecha_asistencia" type="date" placeholder="Seleccione la fecha" />
    </el-form-item>
    <el-form-item label="Hora de Entrada" prop="Hora_entrada">
      <el-time-picker v-model="formulario.Hora_entrada" placeholder="Seleccione la hora" />
    </el-form-item>
    <el-form-item label="Hora de Salida" prop="Hora_salida">
      <el-time-picker v-model="formulario.Hora_salida" placeholder="Seleccione la hora" />
    </el-form-item>
    <el-form-item label="Empleado" prop="id_empleado">
      <el-select v-model="formulario.id_empleado" placeholder="Seleccione un empleado">
        <el-option v-for="empleado in empleados" :key="empleado.id" :label="empleado.Nombre_empleado" :value="empleado.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';

const propiedad = defineProps({
  empleados: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default');
const formRef = ref();
const formulario = reactive({
  Fecha_asistencia: '',
  Hora_entrada: '',
  Hora_salida: '',
  id_empleado: '',
});

const datosFormulario = () => {
  formulario.Fecha_asistencia = propiedad.dataValue[0].Fecha_asistencia;
  formulario.Hora_entrada = propiedad.dataValue[0].Hora_entrada;
  formulario.Hora_salida = propiedad.dataValue[0].Hora_salida;
  formulario.id_empleado = propiedad.dataValue[0].id_empleado;
};

const rulesForm = reactive({
  Fecha_asistencia: [
    { required: true, message: 'Por favor seleccione la fecha de asistencia', trigger: 'blur' }
  ],
  Hora_entrada: [
    { required: true, message: 'Por favor seleccione la hora de entrada', trigger: 'blur' }
  ],
  Hora_salida: [
    { required: true, message: 'Por favor seleccione la hora de salida', trigger: 'blur' }
  ],
  id_empleado: [
    { required: true, message: 'Por favor seleccione un empleado', trigger: 'blur' }
  ],
});

const limpiarFormulario = () => {
  formRef.value.resetFields();
};

const validarFormulario = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario });
</script>

<style scoped></style>