<template>
  <el-container style="height: 100vh;">
    <el-header>
      <NavBar />
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
import NavBar from './NavBar.vue';
import SideBarMenu from './SideBarMenu.vue';

export default {
  name: 'LayoutMain',
  components: {
    NavBar,
    SideBarMenu
  }
};
</script>