<script>

import {ref} from 'vue'
const nombre = ref (0)

</script>


<template>
    <h1>modulo de asistencia </h1>
    {{ nombre }}
    <el-input v-model="nombre"  placeholder="Ingrese su nombre" />

    <el-button type="success">Primary</el-button>

</template>


<style>

</style>
