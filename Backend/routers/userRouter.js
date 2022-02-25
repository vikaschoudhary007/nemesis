const router = require("express").Router();
const {addAccount, getAccounts, updateAccountStatus, deleteAccount, updateAccountDogeRequired, sendEmail} = require("../controllers/user")

router.post("/add", addAccount)
router.get("/all", getAccounts)
router.post("/update",updateAccountStatus)
router.post("/delete",deleteAccount)
router.post("/update/doge",updateAccountDogeRequired)
router.post("/sendmail",sendEmail)

module.exports = router;