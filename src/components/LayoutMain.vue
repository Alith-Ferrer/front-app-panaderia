<template>
    <el-container style="height: 97vh;">
      <el-header class="header">
        <Navbar />
      </el-header>
      <el-container>
        <el-aside width="250px" class="aside">
          <Sidebar />
        </el-aside>
        <el-container>
          <el-main class="main-content">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item to="/">Inicio</el-breadcrumb-item>
            </el-breadcrumb>
            <slot name="slotLayout"></slot>
          </el-main>
          <el-footer class="footer">
            © 2024 Panadería TortastaPam.<h1>  Cra. 16 #5a-54,colmuna 3 Santa Marta.</h1>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  import Sidebar from './Sidebar.vue';
  
  export default {
    name: 'LayoutMain',
    components: {
      Navbar,
      Sidebar
    }
  };
  </script>
  
  <style scoped>
  .el-header {
    padding: 0;
    background-color: #76899c;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .el-aside {
    background-color: #f8f9fa;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  }
  
  .main-content {
    padding: 20px;
    background-color: #ffffff;
    overflow-y: auto;
    transition: all 0.3s;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
  
  .aside {
    border-right: 1px solid #e9ecef;
  }
  
  .footer {
    text-align: center;
    padding: 10px 0;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    color: #343a40;
  }
  </style>