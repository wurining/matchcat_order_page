// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
    // nitro: {
    //     preset: 'service-worker',
    // },
    experimental: {
        payloadExtraction: false
    },
    modules: [
        '@element-plus/nuxt',
        '@nuxt/content',
    ],
    app: {
        head: {
            meta: [
                { name: 'title', content: 'Matcha Cat🐱' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Matcha Cat🐱' },
                { property: 'og:description', content: '菜单' },
                { property: 'og:image', content: 'http://matchacat.wurining.com/logo.jpeg' },
                { property: 'og:url', content: 'http://matchacat.wurining.com/' },
            ],
            "link": [],
            "style": [],
            "script": [],
            "noscript": []
        },
        // baseURL: '/matchcat_order_page/',
        baseURL: '/',
    },
})
