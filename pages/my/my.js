Page({

    data: {
        userInfo: null,
        loadingHidden: true
    },

    onLoad: function(options) {
        wx.getUserInfo({
            success: res => {
                console.log(res);
            }
        })

    },


})