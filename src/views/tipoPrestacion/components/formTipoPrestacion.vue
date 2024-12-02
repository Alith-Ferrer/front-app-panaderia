<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Tipo" prop="Tipo">
      <el-input v-model="formulario.Tipo" />
    </el-form-item>
    <el-form-item label="ID Prestación Social" prop="id_prestacion_social">
      <el-select v-model="formulario.id_prestacion_social" placeholder="Seleccione una prestación">
        <el-option v-for="prestacion in prestaciones" :key="prestacion.id" :label="prestacion.Nombre_prestacion_social" :value="prestacion.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  prestaciones: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  Tipo: '',
  id_prestacion_social: '',
})

const datosFormulario = () => {
  formulario.Tipo = props.dataValue[0].Tipo;
  formulario.id_prestacion_social = props.dataValue[0].id_prestacion_social;
}

const rulesForm = reactive({
  Tipo: [
    { required: true, message: 'Por favor ingrese el tipo de prestación', trigger: 'blur' }
  ],
  id_prestacion_social: [
    { required: true, message: 'Seleccione una prestación', trigger: 'blur' }
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