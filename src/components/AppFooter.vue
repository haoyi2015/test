<template>
  <div class="app-footer">
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

<style>
@import "../style/postcss/_var.css";
.app-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: relative;
  width: 100%;
  z-index: 100;
}
</style>
