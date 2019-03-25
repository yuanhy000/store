import {
    HTTP
} from '../utils/http.js'

const key = 'cart'

class CartModel extends HTTP {

    addCart(res, counts) {
        let cartArray = this.getCartFromStorage();
        let isHas = this.isHasThis(res.id, cartArray);
        if (!isHas) {
            res.counts = counts;
            res.selectedStatus = true;
            cartArray.push(res);
        } else {
            cartArray[isHas.index].counts += counts;
        }
        wx.setStorageSync(key, cartArray);
    }

    getCartTotalCounts() {
        const cartArray = this.getCartFromStorage();
        let counts = 0;
        for (let i = 0; i < cartArray.length; i++) {
            counts += cartArray[i].counts;
        }
        return counts;
    }

    getCartSelectCounts() {
        const cartArray = this.getCartFromStorage();
        let counts = 0;
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].selectedStatus) {
                counts += cartArray[i].counts;
            }
        }
        return counts;
    }

    increaseCount(id) {
        const cartArray = this.getCartFromStorage();
        let isHas = this.isHasThis(id, cartArray);
        if (isHas) {
            cartArray[isHas.index].counts += 1;
        }
        wx.setStorageSync(key, cartArray);
    }

    cutCount(id) {
        const cartArray = this.getCartFromStorage();
        let isHas = this.isHasThis(id, cartArray);
        if (isHas) {
            cartArray[isHas.index].counts -= 1;
        }
        wx.setStorageSync(key, cartArray);
    }

    delete(ids) {
        if (!(ids instanceof Array)) {
            ids = [ids];
        }
        const cartArray = this.getCartFromStorage();
        for (let i = 0; i < ids.length; i++) {
            let isHas = this.isHasThis(ids[i], cartArray);
            if (isHas) {
                cartArray.splice(isHas.index, 1);
            }
        }
        wx.setStorageSync(key, cartArray);
    }

    getCartFromStorage() {
        let cartArray = wx.getStorageSync(key);
        if (!cartArray) {
            cartArray = [];
        }
        return cartArray;
    }

    isHasThis(id, cartArray) {
        let item;
        for (let i = 0; i < cartArray.length; i++) {
            item = cartArray[i];
            if (item.id == id) {
                return {
                    index: i,
                    data: item
                }
            }
        }
        return false;
    }

    setStorage(cartArray) {
        wx.setStorageSync(key, cartArray);
    }
}

export {
    CartModel
}