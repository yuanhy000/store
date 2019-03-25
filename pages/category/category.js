import {
    CategoryModel
} from '../../models/category.js'
import {
    StorageModel
} from '../../utils/storage.js'

const category = new CategoryModel()
const storage = new StorageModel()

Page({

    data: {
        categoryArray: [],
        productOfCategory: [],
        selectedIndex: 0,
        loading: true
    },


    onLoad: function(options) {
        this.loadData();
    },

    loadData: function(argument) {

        category.getCategoryData().then(res => {
                this.setData({
                    categoryArray: res
                })
                return category.getProductByCategory(this.data.categoryArray[0].id)
            })
            .then(res => {
                this.setObject(0, res)
            })
    },

    changeCategory: function(event) {
        const id = event.currentTarget.dataset.id
        const index = event.currentTarget.dataset.index
        this.setData({
            selectedIndex: index,
            loading: true
        })
        this.getProductList(id, index)
    },

    getProductList: function(id, index) {
        //尝试从缓存中读取数据    
        let key = this.data.categoryArray[index].name
        let data = storage.get(key)
        if (!data) {
            category.getProductByCategory(id).then(res => {
                this.setObject(index, res)
            })
        } else {
            this.setData({
                productOfCategory: data,
                loading: false
            })
        }
    },

    setObject: function(index, res) {
        let dataObject = {
            products: res,
            topImgUrl: this.data.categoryArray[index].img.url,
            title: this.data.categoryArray[index].name
        }
        this.setData({
            productOfCategory: dataObject,
            loading: false
        })
        //以category名称作为缓存的key
        let key = this.data.categoryArray[index].name
        storage.put(key, dataObject, 600)
    },

    onPullDownRefresh: function() {
        this.loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function() {
        return {
            title: '分享给你',
            path: 'pages/category/category'
        }
    }
})