function generateOtp() {
    // generate 4 digit otp 
    return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
    generateOtp
}