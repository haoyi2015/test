
import { getStyle } from './util';

const mxLoadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height;
                let height;
                let setTop;
                let paddingBottom;
                let marginBottom;
                let requestFram;
                let oldScrollTop;
                let scrollEl;
                let heightEl;
                let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce = 2;

                const loadMoreFunc = () => {
                    if (scrollEl.scrollTop + windowHeight >= (height + setTop + paddingBottom + (marginBottom - scrollReduce))) {
                        binding.value();
                    }
                };
                const moveEnd = () => {
                    requestFram = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop !== oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd();
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMoreFunc();
                        }
                    });
                };

                if (scrollType === 2) {
                    scrollEl = el;
                    heightEl = el.children[0];
                } else {
                    scrollEl = document.body;
                    heightEl = el;
                }

                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;
                    // if (scrollType == 2) {
                    //     height = height;
                    // }
                    setTop = el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, false);

                el.addEventListener('touchmove', () => {
                    loadMoreFunc();
                }, false);

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, false);
            },
        },
    },
};

const CDN = 111;

export {
    mxLoadMore,
    CDN,
};
