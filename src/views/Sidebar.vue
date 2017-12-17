<template lang="html">
  <div class="sidebar">
    <ul>
      <li>主   页</li>
      <li>未   读</li>
      <li>已   读</li>
      <li>关   于</li>
      <li>退   出</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
};
</script>
<style lang="css" scoped>
  .sidebar {
    width: 100px;
    background-color: #666;
    opacity: 0.8;
    color: #fff;
    border: 1px solid #ddd;
    /*padding: 10px 0;*/
    position: absolute;
    top: 60px;
    height: 255px;
    transition: all 0.3s ease-out;
    transform: translateX(-100px);
  }
  li {
    list-style-type: none;
    border-bottom: 1px solid #333;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .toggleDisplay {
    transition: all 0.3s ease-out;
    transform: translateX(0);
  }
</style>
