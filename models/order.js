import {
    HTTP
} from '../utils/http.js'

const key = 'cart'

class OrderModel extends HTTP {

    getOrderFromStorage() {
        let cartArray = wx.getStorageSync(key);
        if (!cartArray) {
            cartArray = [];
        }
        let orderArray = []
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].selectedStatus) {
                orderArray.push(cartArray[i]);
            }
        }
        return orderArray;
    }

    Order(orderInfo) {
        return this.request({
            url: 'order',
            method: 'POST',
            data: {
                products: orderInfo
            }
        })
    }

    pay(orderID) {
        return this.request({
            url: 'pay/pre_order',
            method: 'POST',
            data: {
                id: orderID
            }
        })
    }

    getOrderInfo(orderID) {
        return this.request({
            url: 'get_order_info',
            method: 'POST',
            data: {
                id: orderID
            }
        })
    }
}

export {
    OrderModel
}