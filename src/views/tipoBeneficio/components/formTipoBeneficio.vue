<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Tipo" prop="Tipo">
      <el-input v-model="formulario.Tipo" />
    </el-form-item>
    <el-form-item label="ID Beneficio" prop="id_beneficios">
      <el-select v-model="formulario.id_beneficios" placeholder="Seleccione un beneficio">
        <el-option v-for="beneficio in beneficios" :key="beneficio.id" :label="beneficio.Nombre_beneficio" :value="beneficio.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
  beneficios: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  Tipo: '',
  id_beneficios: '',
})

const datosFormulario = () => {
  formulario.Tipo = props.dataValue[0].Tipo;
  formulario.id_beneficios = props.dataValue[0].id_beneficios;
}

const rulesForm = reactive({
  Tipo: [
    { required: true, message: 'Por favor ingrese el tipo de beneficio', trigger: 'blur' }
  ],
  id_beneficios: [
    { required: true, message: 'Seleccione un beneficio', trigger: 'blur' }
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