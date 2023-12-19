'use strict'

const generateOtp = (res) => {
    // Function which is used to generate the otp and then return it.
    const otpGenerated = Math.floor(1000 + Math.random()*9000);
    console.log("Otp generated is : ", otpGenerated);
    return otpGenerated;

}

module.exports = {
    generateOtp
}