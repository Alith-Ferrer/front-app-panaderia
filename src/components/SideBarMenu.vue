<template>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          background-color="#f8f9fa"
          text-color="#343a40"
          active-text-color="#007bff"
          collapse-transition
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Administrador</span>
            </template>
            <el-menu-item-group title="Gestión de Empleados">
                <el-menu-item index="asistencia">Asistencia</el-menu-item>
                <el-menu-item index="empleado">Empleados</el-menu-item>
              <el-menu-item index="contrato">Información del contrato</el-menu-item>
              <el-menu-item index="tipoContrato">tipos de contratos</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Beneficios y Prestaciones">
              <el-menu-item index="beneficio">Beneficios</el-menu-item>
              <el-menu-item index="tipoBeneficio">Tipos de Beneficios</el-menu-item>
              <el-menu-item index="prestacion">Prestaciones Sociales</el-menu-item>
              <el-menu-item index="tipoPrestacion">Tipos de Prestaciones Sociales</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import { Location } from '@element-plus/icons-vue';
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  </script>