<?php

/* 通过邮箱生成头像地址 */
function _AdminGetAvatarByMail($mail)
{
    $gravatarsUrl = 'https://gravatar.helingqi.com/wavatar/';
    $mailLower = strtolower($mail);
    $md5MailLower = md5($mailLower);
    $qqMail = str_replace('@qq.com', '', $mailLower);
    if (strstr($mailLower, "qq.com") && is_numeric($qqMail) && strlen($qqMail) < 11 && strlen($qqMail) > 4) {
        return 'https://thirdqq.qlogo.cn/g?b=qq&nk=' . $qqMail . '&s=100';
    } else {
        return $gravatarsUrl . $md5MailLower . '?d=mm';
    }
};
