/**
 * Created by yuanguozheng on 15/10/10.
 */
module.exports = {
    OK: 0,
    DUPLICATE: -1,
    NONE: -1,
    ERROR: -2,
    SECRET_KEY: 'UCPnPbtu/hLlIDrMgFTLxBtQENqxVxh+IZ9y5UpvrRj7Fo1eJsrC+g==',
    DEBUG: true,

    PAYING: 'paying',  // 待支付
    PAID: 'paid',  // 已付款，待配送
    DELIVERING: 'delivering',  // 配送中
    REJECT: 'reject',  // 被拒绝
    FINISH: 'finish',  // 已完成
    CANCEL: 'cancel'  // 已取消
};