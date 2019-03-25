import {
    CartModel
} from '../../models/cart.js'

const cart = new CartModel()

Page({

    data: {
        cartArray: [],
        totalCounts: 0,
        totalPrice: 0,
        totalType: 0
    },

    onShow: function() {
        let cartArray = cart.getCartFromStorage();
        let totalInfo = this.getTotalPriceInfo(cartArray);
        this.setData({
            cartArray: cartArray,
            totalCounts: totalInfo.totalCounts,
            totalPrice: totalInfo.totalPrice,
            totalType: totalInfo.totalType
        })
    },

    getTotalPriceInfo: function(cartArray) {
        let totalPrice = 0;
        let totalCounts = 0;
        let totalType = 0;
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].selectedStatus) {
                totalPrice += cartArray[i].counts * 100 * Number(cartArray[i].price);
                totalCounts += cartArray[i].counts;
                totalType++;
            }
        }
        return {
            totalPrice: totalPrice / 100,
            totalCounts: totalCounts,
            totalType: totalType
        }
    },

    changeSelectStatus: function(event) {
        const id = event.currentTarget.dataset.id;
        const status = event.currentTarget.dataset.status;
        const index = this.getProductIndexByID(id);
        this.data.cartArray[index].selectedStatus = !status;
        this.updateTotalInfo();
    },

    changeAllSelectStatus: function(event) {
        const status = event.currentTarget.dataset.status == 'true';
        for (let i = 0; i < this.data.cartArray.length; i++) {
            this.data.cartArray[i].selectedStatus = !status;
        }
        this.updateTotalInfo();
    },

    changeSelectCount: function(event) {
        const operator = event.currentTarget.dataset.operator;
        const id = event.currentTarget.dataset.id;
        const index = this.getProductIndexByID(id);
        switch (operator) {
            case '+':
                cart.increaseCount(id);
                this.data.cartArray[index].counts += 1;
                break;
            case '-':
                cart.cutCount(id);
                this.data.cartArray[index].counts -= 1;
                break;
        }
        this.updateTotalInfo();
    },

    deleteProduct: function(event) {
        const id = event.currentTarget.dataset.id;
        const index = this.getProductIndexByID(id);
        cart.delete(id);
        this.data.cartArray.splice(index, 1);
        this.updateTotalInfo();
    },

    updateTotalInfo: function() {
        const newTotalInfo = this.getTotalPriceInfo(this.data.cartArray);
        this.setData({
            cartArray: this.data.cartArray,
            totalCounts: newTotalInfo.totalCounts,
            totalPrice: newTotalInfo.totalPrice,
            totalType: newTotalInfo.totalType
        })
    },


    getProductIndexByID: function(id) {
        for (let i = 0; i < this.data.cartArray.length; i++) {
            if (this.data.cartArray[i].id == id) {
                return i;
            }
        }
    },

    placeOrder: function(){
        wx.navigateTo({
            url:'../order/order?totalPrice='+this.data.totalPrice+'&from=cart'
        });
    },

    onHide: function() {
        cart.setStorage(this.data.cartArray);
    }
})