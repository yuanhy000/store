import {
    ProductModel
} from '../../models/product.js'

import {
    CartModel
} from '../../models/cart.js'

const product = new ProductModel()
const cart = new CartModel()

Page({

    data: {
        productID: null,
        productArray: [],
        countArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        selectCount: 1,
        tabs: ['商品详情', '产品参数', '售后服务'],
        bindTabsIndex: 0,
        loading: true,
        cartTotalCount: 0
    },

    onLoad: function(options) {
        this.data.productID = options.id;
        this.loadData();
    },

    loadData: function(argument) {
        product.getProductInfo(this.data.productID).then(res => {
            this.setData({
                productArray: res,
                loading: false,
                cartTotalCount: cart.getCartTotalCounts()
            })
        })
    },

    getSelectCount: function(event) {
        this.setData({
            selectCount: this.data.countArray[event.detail.value]
        })
    },

    bindTabsTap: function(event) {
        this.setData({
            bindTabsIndex: event.currentTarget.dataset.index
        })
    },

    addCart: function(argument) {
        const productObject = {};
        const keys = ['id', 'name', 'main_img_url', 'price'];
        for (let key in this.data.productArray) {
            if (keys.indexOf(key) >= 0) {
                productObject[key] = this.data.
                productArray[key];
            }
        }
        cart.addCart(productObject, this.data.selectCount);
        this.setData({
            cartTotalCount: this.data.cartTotalCount + this.data.selectCount
        })
    },

    changeToCart: function(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    }
})