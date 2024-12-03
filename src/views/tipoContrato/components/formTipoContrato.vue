<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Tipo" prop="Tipo">
      <el-input v-model="formulario.Tipo" />
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
  Tipo: '',
  id_contrato_laborar: '',
})

const datosFormulario = () => {
  formulario.Tipo = props.dataValue[0].Tipo;
  formulario.id_contrato_laborar = props.dataValue[0].id_contrato_laborar;
}

const rulesForm = reactive({
  Tipo: [
    { required: true, message: 'Por favor ingrese el tipo de contrato', trigger: 'blur' }
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