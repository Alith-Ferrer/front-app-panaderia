<template>
  <el-container style="height: 100vh;">
    <el-header>
      <Navbar />
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

<script>
import Navbar from './navbar.vue';
import SideBarMenu from './SideBarMenu.vue';

export default {
  name: 'LayoutMain',
  components: {
    Navbar,
    SideBarMenu
  }
};
</script>