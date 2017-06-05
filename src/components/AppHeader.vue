<template>
  <header class="header">
      <section class="left">
          <slot name="left">
              <div class="default-goback" @click="$router.go(-1)">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" />
                </svg>
             </div>
          </slot>
      </section>
      <section class="center center-block">
           <slot></slot>
      </section>
      <section class="right">
            <slot name="right">

            </slot>
      </section>
  </header>
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
.header {
    position: relative;
    width: 100%;
    background:$color_header_bg;

    & > section {
        height: $h_header;
        line-height: @height;
    }

    .left {
        float:left;
        position: absolute;
        margin-left: $w_page_padding;
        .default-goback {
            left: 0.4rem;
            line-height: $h_header;
            @util size(0.6rem, 0.8rem);

            svg {
                fill:none;
                stroke:#7e7e7e;
                stroke-width:2;
            }
        }
    }

    .center {
        text-align: center;
        font-size: 0.8rem;
        font-weight: bold;
        /*padding: 0 1rem;*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .right {
        margin-right: $w_page_padding;
        float:right;
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
