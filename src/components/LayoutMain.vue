<script>
import navbar from './navbar.vue';
import SideBarMenu from './SideBarMenu.vue';

</script>

<template>
  <el-container style="height: 100vh;">
    <el-header>
      <navbar />
    </el-header>
    <el-container>
      <el-aside width="auto">
        <SideBarMenu />
      </el-aside>
      <el-main class="main-content">
        <slot name="slotLayout"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

