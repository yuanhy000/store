import {
    HomeModel
} from '../../models/home.js'

const home = new HomeModel()

Page({
    data: {
        bannerArray: [],
        themeArray: [],
        productArray: [],
        loading: false,
        total: null,
        noneResult: false
    },

    onLoad: function(options) {
        this.loadData();
    },

    onReachBottom: function() {
        this.loadMoreProduct();
    },

    loadData: function(argument) {
        home.getBannerData(1).then(res => {
            this.setData({
                bannerArray: res[0].items
            })
        })

        home.getThemeData().then(res => {
            this.setData({
                themeArray: res,
                loadingHidden: true
            })
        })

        home.getRecentProduct(0, 8).then(res => {
            this.setData({
                productArray: res.product
            })
            this.setTotal(res.total);

        })
    },
    loadMoreProduct() {
        if (this.isLocked()) {
            return
        }
        if (this.hasMore()) {
            this.locked()
            home.getRecentProduct(this.getCurrentStart(), this.getCurrentStart() + 8).then(res => {
                this.setMoreData(res.product);
                this.unLocked()
            }, () => {
                this.unLocked()
            })
        }

    },
    setMoreData(dataArray) {
        let temp = []
        for (let key in dataArray) {
            temp.push(dataArray[key]);
        }
        let tempArray = this.data.productArray.concat(temp)
        this.setData({
            productArray: tempArray
        })
    },
    isLocked() {
        return this.data.loading ? true : false
    },
    locked() {
        this.setData({
            loading: true
        })
    },
    unLocked() {
        this.setData({
            loading: false
        })
    },
    hasMore() {
        if (this.data.productArray.length >= this.data.total) {
            return false
        } else {
            return true
        }
    },
    getCurrentStart() {
        return this.data.productArray.length
    },
    setTotal(total) {
        this.data.total = total
        if (total == 0) {
            this.setData({
                noneResult: true
            })
        }
    }
})