import {
    HTTP
} from '../utils/http.js'

class ProductModel extends HTTP {

    getProductInfo(id) {
        return this.request({
            'url': 'product/' + id
        })
    }
}

export {
    ProductModel
}