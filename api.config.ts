import { PlaywrightTestConfig } from "@playwright/test";

const config :PlaywrightTestConfig ={
    timeout:70000,
     retries:0,
     testDir:'tests',
    use:{
        headless:false,
        viewport:{width:1390,height:720},
        actionTimeout:15000,
        ignoreHTTPSErrors:true,
        video:'off',
        screenshot:"on",
    },
    projects:[
        {
            name :'chromium',
            use:{browserName:'chromium'}
        },
        {
            name :'firefox',
            use:{browserName:'firefox'}
        },
        {
            name :'webkit',
            use:{browserName:'webkit'}
        },
    ],

}
export default config


