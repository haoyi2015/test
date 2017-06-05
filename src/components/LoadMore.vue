<template>
    <div class="load-more">
        <div v-show="isLoading"
             class="loadingMore">
            <i class="ico-loading circle"></i> 正在加载更多…
        </div>
        <div v-show="!isLoadAll && !isLoading"
             class="btnLoadNext">
            &nbsp;
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            isLoading: false,
        };
    },
    props: {
        isLoadAll: {
            default: false,
        },
        loadPromise: {
            type: Function,
            required: true,
        },
    },
    methods: {
        checkScroll() {
            var obj = this.$el.getBoundingClientRect();
            var lmTop = obj.top;
            var se = document.documentElement.clientHeight;
            if (!obj.height) return;
            if (lmTop < se) {
                this.stopTimer();
                this.triggerLoadMore();
            }
        },
        triggerLoadMore() {
            this.isLoading = true;
            this.loadPromise()
                .then(() => {
                    this.isLoading = false;
                });
            this.$nextTick(() => {
                this.startTimer();
            });
        },
        startTimer() {
            this.timer = setInterval(() => {
                if (!this.isLoading) {
                    this.checkScroll();
                }
            }, 800);
        },
        stopTimer() {
            clearInterval(this.timer);
        },
    },
    mounted() {
        this.startTimer();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style>
.load-more {
    text-align: center;
    .loadingMore {
        padding: 0.3rem 0;
        color: #848484;
        font-size: .6rem;
    }
    .btnLoadNext {
        font-size: .7rem;
        color: #848484;
    }
    .ico-loading {
        display: inline-block;
        margin: -0.2rem 0;
        background: url(../assets/images/loading.png) no-repeat center center;
        background-size: 100%;
        @util size(.8rem, .8rem)
    }
}
</style>
