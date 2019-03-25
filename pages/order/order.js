import {
    OrderModel
} from '../../models/order.js'

import {
    AddressModel
} from '../../models/address.js'

import {
    CartModel
} from '../../models/cart.js'

const order = new OrderModel()
const address = new AddressModel()
const cart = new CartModel()

Page({

    data: {
        orderArray: [],
        totalPrice: 0,
        orderStatus: 0,
        addressInfo: null,
        orderID: null,
        basicInfo: null
    },

    onLoad: function(options) {
        const totalPrice = options.totalPrice;
        const orderArray = order.getOrderFromStorage();
        this.setData({
            totalPrice: totalPrice,
            orderArray: orderArray,
            orderStatus: 0
        })
        address.getAddressInfo().then(res => {
            this.setAddress(res);
        }).catch(err => {})
    },

    onShow: function() {
        if (this.data.orderID) {
            order.getOrderInfo(this.data.orderID).then(res => {
                this.setData({
                    orderStatus: 2,
                    // orderStatus: res.status,
                    orderArray: JSON.parse(res.snap_items),
                    totalPrice: res.total_price,
                    basicInfo: {
                        orderTime: res.created_at,
                        orderNumber: res.order_no
                    }
                })
                this.setAddress(JSON.parse(res.snap_address)[0]);
            })
        }
    },

    changeAddress: function() {
        wx.chooseAddress({
            success: (res) => {
                this.setAddress(res);
                address.submitAddress(res).catch(err => {});
            }
        })
    },

    setAddress: function(res) {
        let addressInfo = {
            name: res.userName || res.name,
            mobile: res.telNumber || res.mobile,
            totalAddress: address.mergeAddressInfo(res)
        }
        this.setData({
            addressInfo: addressInfo
        })
    },

    readyToPay: function(event) {
        if (!this.data.addressInfo) {
            this.showMessage('下单提示', '请填写收货地址再进行支付', false)
            return;
        }
        if (this.data.orderStatus == 0) {
            this.firstTimeToPay();
        } else {
            this.otherTimeToPay();
        }
    },

    firstTimeToPay: function() {
        let orderInfo = [];
        for (let i = 0; i < this.data.orderArray.length; i++) {
            orderInfo.push({
                product_id: this.data.orderArray[i].id,
                count: this.data.orderArray[i].counts
            })
        }
        order.Order(orderInfo).then(res => {
            wx.setStorageSync('newOrder', true);
            if (res.pass) {
                this.data.orderID = res.order_id;
                this.pay();
            } else {
                this.orderFail(res);
            }
        })
    },

    pay: function() {
        order.pay(this.data.orderID).then(res => {
            // this.deleteProductAfterOrder();
            this.showMessage('支付消息', '没权限支付，就当支付成功咯', true);
        })

    },

    deleteProductAfterOrder: function() {
        let ProductIDs = [];
        let orderArray = this.data.orderArray;
        for (let i = 0; i < orderArray.length; i++) {
            ProductIDs.push(orderArray[i].id);
        }
        cart.delete(ProductIDs);
    },

    otherTimeToPay: function() {
        this.pay();
    },

    orderFail: function(res) {
        console.log(res);
        const productArray = res.productStatusArray;
        let name = '';
        let message = '';
        let nameArray = [];
        for (let i = 0; i < productArray.length; i++) {
            if (!productArray[i].haveStock) {
                name = productArray[i].name;
                nameArray.push(name);
                if (nameArray.length >= 2) {
                    break;
                }
            }
        }
        message += nameArray.join('、');
        if (nameArray.length >= 2) {
            message += ' 等';
        }
        message += '库存不足哦';
        this.showMessage('下单失败', message, false);
    },

    showMessage: function(title, content, change) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success: res => {
                if (change) {
                    wx.navigateTo({
                        url: '/pages/payResult/payResult?id=' +
                            this.data.orderID + '&flag=true&from=order'
                    });
                }
            }
        });
    }

})