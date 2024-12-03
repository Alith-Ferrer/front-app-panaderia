<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombre del Beneficio" prop="Nombre_beneficio">
      <el-input v-model="formulario.Nombre_beneficio" />
    </el-form-item>
    <el-form-item label="Tipo de Beneficio" prop="Tipo_beneficio">
      <el-input v-model="formulario.Tipo_beneficio" />
    </el-form-item>
    <el-form-item label="Monto Correspondiente" prop="Monto_correspondiente_beneficio">
      <el-input v-model="formulario.Monto_correspondiente_beneficio" />
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
  Nombre_beneficio: '',
  Tipo_beneficio: '',
  Monto_correspondiente_beneficio: '',
  id_contrato_laborar: '',
})

const datosFormulario = () => {
  formulario.Nombre_beneficio = props.dataValue[0].Nombre_beneficio;
  formulario.Tipo_beneficio = props.dataValue[0].Tipo_beneficio;
  formulario.Monto_correspondiente_beneficio = props.dataValue[0].Monto_correspondiente_beneficio;
  formulario.id_contrato_laborar = props.dataValue[0].id_contrato_laborar;
}

const rulesForm = reactive({
  Nombre_beneficio: [
    { required: true, message: 'Por favor ingrese el nombre del beneficio', trigger: 'blur' }
  ],
  Tipo_beneficio: [
    { required: true, message: 'Por favor ingrese el tipo de beneficio', trigger: 'blur' }
  ],
  Monto_correspondiente_beneficio: [
    { required: true, message: 'Ingrese el monto correspondiente', trigger: 'blur' }
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