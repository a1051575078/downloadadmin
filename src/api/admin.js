import request from "@/utils/request";
export function getSpiders() {
    return request({
        url: '/spiders',
        method: 'get',
    })
}
