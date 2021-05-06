export default {
    getRect(selector) {
        return new Promise((resolve) => {
            let view = uni.createSelectorQuery().select(selector);
            view.fields({
                size: true,
                rect: true,
                scrollOffset: true
            }, (res) => {
                resolve(res);
            }).exec();
        })
    }
}