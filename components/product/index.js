// components/product/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        product: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            const id = event.currentTarget.dataset.id
            wx.navigateTo({
                url: '/pages/product/product?id=' + id
            })
        }
    }
})