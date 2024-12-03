<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Tipo de Prestación" prop="Tipo_prestacion">
      <el-input v-model="formulario.Tipo_prestacion" />
    </el-form-item>
    <el-form-item label="Nombre de la Prestación" prop="Nombre_prestacion_social">
      <el-input v-model="formulario.Nombre_prestacion_social" />
    </el-form-item>
    <el-form-item label="Fecha de Inicio" prop="Fecha_inicio_prestacion">
      <el-date-picker v-model="formulario.Fecha_inicio_prestacion" type="date" value-format="YYYY-MM-DD" placeholder="Seleccione la fecha de inicio" />
    </el-form-item>
    <el-form-item label="Fecha de Fin" prop="Fecha_fin_prestacion">
      <el-date-picker v-model="formulario.Fecha_fin_prestacion" type="date" value-format="YYYY-MM-DD" placeholder="Seleccione la fecha de fin" />
    </el-form-item>
    <el-form-item label="ID Contrato Laboral" prop="id_contrato_laborar">
      <el-select v-model="formulario.id_contrato_laborar" placeholder="Seleccione un contrato">
        <el-option v-for="contrato in contratos" :key="contrato.id" :label="contrato.Tipo_contrato_laboral" :value="contrato.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
  contratos: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  Tipo_prestacion: '',
  Nombre_prestacion_social: '',
  Fecha_inicio_prestacion: '',
  Fecha_fin_prestacion: '',
  id_contrato_laborar: '',
})

const datosFormulario = () => {
  formulario.Tipo_prestacion = props.dataValue[0].Tipo_prestacion;
  formulario.Nombre_prestacion_social = props.dataValue[0].Nombre_prestacion_social;
  formulario.Fecha_inicio_prestacion = props.dataValue[0].Fecha_inicio_prestacion;
  formulario.Fecha_fin_prestacion = props.dataValue[0].Fecha_fin_prestacion;
  formulario.id_contrato_laborar = props.dataValue[0].id_contrato_laborar;
}

const rulesForm = reactive({
  Tipo_prestacion: [
    { required: true, message: 'Por favor ingrese el tipo de prestación', trigger: 'blur' }
  ],
  Nombre_prestacion_social: [
    { required: true, message: 'Por favor ingrese el nombre de la prestación', trigger: 'blur' }
  ],
  Fecha_inicio_prestacion: [
    { required: true, message: 'Seleccione la fecha de inicio', trigger: 'blur' }
  ],
  Fecha_fin_prestacion: [
    { required: true, message: 'Seleccione la fecha de fin', trigger: 'blur' }
  ],
  id_contrato_laborar: [
    { required: true, message: 'Seleccione un contrato', trigger: 'blur' }
  ],
})

const limpiarFormulario = () => {
  formRef.value.resetFields()
}

const validarFormulario = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

watch(
  () => props.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped></style>