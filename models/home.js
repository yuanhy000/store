import {
    HTTP
} from '../utils/http.js'

class HomeModel extends HTTP {

    getBannerData(id) {
        return this.request({
            'url': 'banner/' + id
        })
    }

    getThemeData() {
        return this.request({
            'url': 'theme?ids=1,2,3'
        })
    }

    getRecentProduct(start, end) {
        return this.request({
            'url': 'product/recent',
            'data': {
                start: start,
                end: end
            },
            'method': 'POST'
        })
    }
}

export {
    HomeModel
}