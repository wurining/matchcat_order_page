// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@element-plus/nuxt',
        '@nuxt/content',
    ],
    app: {
        head: {
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' }
            ],
            "link": [],
            "style": [],
            "script": [],
            "noscript": []
        },
        baseURL: '/matchcat_order_page/',
    },
    ssr: false,
    experimental: {
        payloadExtraction: false
    }
})
