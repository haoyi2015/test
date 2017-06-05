<template>
  <a class="item-cell" :href="href" ref="itemlink" @click="click"  :class="{'item-link': link, 'top-line': topLine, 'bottom-line': bottomLine }">
    <div>
        <slot></slot>
    </div>
  </a>
</template>

<script>

    export default {
        components: {
        },
        props: {
            link: {
                type: Boolean,
                default: false,
            },
            topLine: {
                type: Boolean,
                default: false,
            },
            bottomLine: {
                type: Boolean,
                default: false,
            },
            href: {
                type: String,
                default: 'javascript:void(0);',
            },
        },
        methods: {
            click() {
                this.$emit('click');
            },
        },
    };
</script>

<style scoped>
.item-cell {
    position: relative;
    display: block;
    align-items: center;
    background: #fff;
    padding: .7rem 0;
    div{
        font-size: .7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: .6rem;
        padding-right:.6rem;
    }
    &:active{
        background: #e5e5e5;
    }
}

.item-cell.item-link>div{
  background-image: url("data:image/svg+xml;charset=utf8,<svg viewBox='0 0 60 120' xmlns='http://www.w3.org/2000/svg'><path d='m60 61.5-38.25 38.25-9.75-9.75 29.25-28.5-29.25-28.5 9.75-9.75z' fill='#ddd'/></svg>");
  background-size: .5rem 1rem;
  background-repeat: no-repeat;
  background-position: 97% center;
  padding-right: 1.2rem;
}
.item-cell.top-line:before,
.item-cell.bottom-line:after{
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: rgba(0,0,0,.1);
    display: block;
}

.item-cell.top-line:before{
    top: 0;
    left: 0;
}
.item-cell.bottom-line:after{
    left: 0;
    bottom: 0;
}
</style>
