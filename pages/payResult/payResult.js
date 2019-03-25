Page({

    data: {
        payResult: null,
        orderID: null,
        orderFrom: ''
    },

    onLoad: function(options) {
        this.setData({
            payResult: options.flag,
            orderID: options.id,
            orderFrom: options.from
        })
    },

    viewOrder: function(event) {
        wx.navigateBack({
            delta: 1
        })
    }

})