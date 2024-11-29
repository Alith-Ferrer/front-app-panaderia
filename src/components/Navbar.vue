<template>
    <el-menu
      :default-active="activeIndex"
      background-color="#343a40"
      text-color="#fff"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0" class="logo">
        <img
          src="../../imagenes/image.png"
          style="width: 120px"
          alt="Element logo"
        />
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><user /></el-icon>
          <span>Usuario</span>
        </template>
        <el-menu-item index="2-1">Perfil</el-menu-item>
        <el-menu-item index="2-2">Cerrar sesión</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { User } from '@element-plus/icons-vue';
  
  const activeIndex = ref('1');
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  </script>
  
  <style scoped>
  .el-menu-demo {
    top: 0;
    width: 100%;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .el-menu-item,
  span.el-avatar.el-avatar--circle {
    margin-right: auto;
    padding: 0;
  }
  
  .logo img {
    mix-blend-mode: color-burn;
  }
  
  .el-sub-menu__title {
    display: flex;
    align-items: center;
  }
  
  .el-sub-menu__title el-icon {
    margin-right: 8px;
  }
  </style>