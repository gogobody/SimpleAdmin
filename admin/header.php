<?php
if (!defined('__TYPECHO_ADMIN__')) {
    exit;
}

$header = '<link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'normalize.css', true) . '">
<link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'grid.css', true) . '">
<link rel="stylesheet" href="' . $options->adminStaticUrl('css', 'style.css', true) . '">';

/** 注册一个初始化插件 */
$header = Typecho_Plugin::factory('admin/header.php')->header($header);

?><!DOCTYPE HTML>
<html data-color-mode="<?php if($_COOKIE['night']=='1')echo 'dark';else echo 'light'; ?>">
<head>
    <meta charset="<?php $options->charset(); ?>">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><?php _e('%s - %s - Powered by Typecho', $menu->title, $options->title); ?></title>
    <meta name="robots" content="noindex, nofollow">
    <?php echo $header; ?>
</head>
<body<?php if (isset($bodyClass)) {echo ' class="' . $bodyClass . '"';} ?>>
