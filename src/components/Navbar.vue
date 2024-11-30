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
        class="logo-img"
        alt="Element logo"
      />
    </el-menu-item>
    <el-sub-menu index="1" class="user-menu">
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