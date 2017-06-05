<template>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style scoped>

body{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
}

body,html{
  overflow-x:hidden;
  overflow-y: auto;
  height: 100%;
}
.page-content{
  width: 100%;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  background-color: #eaeaea;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    opacity: 0 !important;
  }
}

</style>
<style>
.app-page{
    position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  justify-content: center;
  align-items: flex-start;
}
</style>
