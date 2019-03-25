import {
    HTTP
} from '../utils/http.js'

class AddressModel extends HTTP {

    mergeAddressInfo(address) {
        const province = address.provinceName || address.province,
            city = address.cityName || address.city,
            county = address.countyName || address.county,
            detail = address.detailInfo || address.detail;

        let totalAddress = city + county + detail;

        if (!this.isMunicipality(province)) {
            totalAddress = province + totalAddress;
        }
        return totalAddress;
    }

    isMunicipality(province) {
        const municipality = ['北京市', '上海市', '重庆市', '天津市'];
        const result = municipality.indexOf(province);
        if (result >= 0) {
            return true;
        }
        return false;
    }

    submitAddress(data) {
        return this.request({
            url: 'address',
            method: 'POST',
            data: this.setAddressInfo(data)
        })
    }

    setAddressInfo(res) {
        let addressInfo = {
            name: res.userName,
            // mobile: res.telNumber,
            mobile: 17784457936,
            province: res.provinceName,
            city: res.cityName,
            county: res.countyName,
            detail: res.detailInfo
        };
        return addressInfo;
    }

    getAddressInfo() {
        return this.request({
            url: 'address/get',
            method: 'POST'
        })
    }
}

export {
    AddressModel
}