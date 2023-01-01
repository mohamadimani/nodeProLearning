module.exports = {
    RECAPTCHA : {
        SITE_KEY : process.env.RECAPTCHA_SITEKEY,
        SECRET_KEY : process.env.RECAPTCHA_SECRETKEY,
        OPTION:{
            hl : process.env.RECAPTCHA_HL 
        }
    }
}