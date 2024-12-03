<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
           :size="formSize" status-icon>
    <el-form-item label="Nombre del Empleado" prop="Nombre_empleado">
      <el-input v-model="formulario.Nombre_empleado" />
    </el-form-item>
    <el-form-item label="Fecha de Ingreso" prop="Fecha_ingreso">
      <el-date-picker v-model="formulario.Fecha_ingreso" type="date" value-format="YYYY-MM-DD" placeholder="Seleccione la fecha" />
    </el-form-item>
    <el-form-item label="Código del Empleado" prop="Codigo_empleado">
      <el-input v-model="formulario.Codigo_empleado" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import {onMounted, reactive, ref, watch } from 'vue';

const propiedad = defineProps({
  dataValue: Object,
});

const formSize = ref('default');
const formRef = ref();
const formulario = reactive({
  Nombre_empleado: '',
  Fecha_ingreso: '',
  Codigo_empleado: '',
});

const datosFormulario = () => {
  formulario.Nombre_empleado = propiedad.dataValue[0].Nombre_empleado;
  formulario.Fecha_ingreso = propiedad.dataValue[0].Fecha_ingreso;
  formulario.Codigo_empleado = propiedad.dataValue[0].Codigo_empleado;
};

const rulesForm = reactive({
  Nombre_empleado: [
    { required: true, message: 'Por favor ingrese el nombre del empleado', trigger: 'blur' }
  ],
  Fecha_ingreso: [
    { required: true, message: 'Por favor seleccione la fecha de ingreso', trigger: 'blur' }
  ],
  Codigo_empleado: [
    { required: true, message: 'Por favor ingrese el código del empleado', trigger: 'blur' }
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