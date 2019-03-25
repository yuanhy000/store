import {
    HTTP
} from '../utils/http.js'

class CategoryModel extends HTTP {

    getCategoryData() {
        return this.request({
            'url': 'category/all'
        })
    }

    getProductByCategory(id) {
        return this.request({
            'url': 'product/by_category?id=' + id
        })
    }
}

export {
    CategoryModel
}