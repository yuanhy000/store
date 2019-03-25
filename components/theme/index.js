// components/theme/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        theme: {
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
            const id = event.currentTarget.dataset.id;
            const name = event.currentTarget.dataset.name;
            wx.navigateTo({
                'url': '/pages/theme/theme?id=' + id + '&name=' + name
            })
        }
    }
})