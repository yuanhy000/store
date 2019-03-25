Component({

    properties: {
        categoryData: {
            type: Object
        }
    },

    data: {

    },

    methods: {
    	onProductTap(event) {
            const id = event.currentTarget.dataset.id
            wx.navigateTo({
                url: '/pages/product/product?id=' + id
            })
        }
    }
})