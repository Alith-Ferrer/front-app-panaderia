<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Tipo de Contrato" prop="Tipo_contrato_laboral">
      <el-input v-model="formulario.Tipo_contrato_laboral" />
    </el-form-item>
    <el-form-item label="Fecha de Inicio" prop="Fecha_inicio_contrato_laboral">
      <el-date-picker v-model="formulario.Fecha_inicio_contrato_laboral" type="date" placeholder="Seleccione la fecha de inicio" />
    </el-form-item>
    <el-form-item label="Fecha de Fin" prop="Fecha_fin_contrato_laboral">
      <el-date-picker v-model="formulario.Fecha_fin_contrato_laboral" type="date" placeholder="Seleccione la fecha de fin" />
    </el-form-item>
    <el-form-item label="Salario" prop="Salario_contrato_laboral">
      <el-input v-model="formulario.Salario_contrato_laboral" />
    </el-form-item>
    <el-form-item label="Empleado" prop="id_empleado">
      <el-select v-model="formulario.id_empleado" placeholder="Seleccione un empleado">
        <el-option v-for="empleado in empleados" :key="empleado.id" :label="empleado.nombre" :value="empleado.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
  empleados: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  Tipo_contrato_laboral: '',
  Fecha_inicio_contrato_laboral: '',
  Fecha_fin_contrato_laboral: '',
  Salario_contrato_laboral: '',
  id_empleado: '',
})

const datosFormulario = () => {
  formulario.Tipo_contrato_laboral = props.dataValue[0].Tipo_contrato_laboral;
  formulario.Fecha_inicio_contrato_laboral = props.dataValue[0].Fecha_inicio_contrato_laboral;
  formulario.Fecha_fin_contrato_laboral = props.dataValue[0].Fecha_fin_contrato_laboral;
  formulario.Salario_contrato_laboral = props.dataValue[0].Salario_contrato_laboral;
  formulario.id_empleado = props.dataValue[0].id_empleado;
}

const rulesForm = reactive({
  Tipo_contrato_laboral: [
    { required: true, message: 'Por favor ingrese el tipo de contrato', trigger: 'blur' }
  ],
  Fecha_inicio_contrato_laboral: [
    { required: true, message: 'Seleccione la fecha de inicio', trigger: 'blur' }
  ],
  Fecha_fin_contrato_laboral: [
    { required: true, message: 'Seleccione la fecha de fin', trigger: 'blur' }
  ],
  Salario_contrato_laboral: [
    { required: true, message: 'Ingrese el salario', trigger: 'blur' }
  ],
  id_empleado: [
    { required: true, message: 'Seleccione un empleado', trigger: 'blur' }
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