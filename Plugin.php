<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;

/**
 * SimpleAdmin 是一款即插即用的typecho后台美化插件，修改自<a href="https://xwsir.cn">小王先生</a>，更新地址：<a href="https://www.ijkxs.com">即刻学术</a>
 *
 * @package SimpleAdmin
 * @author gogobody
 * @version 1.0.7
 * @link https://www.ijkxs.com
 */
class SimpleAdmin_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 激活插件方法,如果激活失败,直接抛出异常
     *
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function activate()
    {
        Typecho_Plugin::factory('admin/header.php')->header_1000 = array('SimpleAdmin_Plugin', 'renderHeader');
        Typecho_Plugin::factory('admin/footer.php')->end_1000 = array('SimpleAdmin_Plugin', 'renderFooter');
        if (file_exists("var/Widget/Menu.php")) {
            //挂载menu.php
            rename("var/Widget/Menu.php", "var/Widget/Menu.php.bak");
            copy("usr/plugins/SimpleAdmin/var/Widget/Menu.php", "var/Widget/Menu.php");
        }
        if (file_exists("admin/header.php")) {
            //挂载header.php
            rename("admin/header.php", "admin/header.php.bak");
            copy("usr/plugins/SimpleAdmin/admin/header.php", "admin/header.php");
        }

    }

    /**
     * 禁用插件方法,如果禁用失败,直接抛出异常
     *
     * @static
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function deactivate()
    {
        //还原menu.php
        if (file_exists("var/Widget/Menu.php.bak")) {
            unlink("var/Widget/Menu.php");
            rename("var/Widget/Menu.php.bak", "var/Widget/Menu.php");
        }
        //还原header.php
        if (file_exists("admin/header.php.bak")) {
            unlink("admin/header.php");
            rename("admin/header.php.bak", "admin/header.php");
        }
    }

    /**
     * 获取插件配置面板
     *
     * @access public
     * @param Typecho_Widget_Helper_Form $form 配置面板
     * @return void
     */
    public static function config(Typecho_Widget_Helper_Form $form)
    {
        $options = Helper::options();
        $url = $options->pluginUrl . '/SimpleAdmin/static';
        list($prefixVersion, $suffixVersion) = explode('/', $options->version);
        ?>
        <link rel="stylesheet" href="<?php echo $url.'/css/login.min.css?v='.$suffixVersion ?>">
        <?php
        $zz1 = '<div class="zz">素雅山水</div>';
        $zz2 = '<div class="zz">蓝天群山</div>';
        $zz3 = '<div class="zz">早春印象</div>';
        $zz4 = '<div class="zz">海洋巨人</div>';
        $zz5 = '<div class="zz">绿意之方</div>';
        $zz6 = '<div class="zz">暗之色系</div>';
        $zz7 = '<div class="zz">亮之色系</div>';
        $zz8 = '<div class="zz">黑客帝国</div>';
        $zz9 = '<div class="zz">高斯模糊</div>';
        $zz10 = '<div class="zz">空白样式<br>不使用内置样式</div>';

        $bgfengge = new Typecho_Widget_Helper_Form_Element_Radio(
            'bgfengge', array(
            'suya' => _t('<div class="kuai"><img src="' . $url . '/images/suya.jpg" loading="lazy">' . $zz1 . '</div>'),
            'BlueSkyAndMountains' => _t('<div class="kuai"><img src="' . $url . '/images/BlueSkyAndMountains.jpg" loading="lazy">' . $zz2 . '</div>'),
            'Earlyspringimpression' => _t('<div class="kuai"><img src="' . $url . '/images/Earlyspringimpression.jpg" loading="lazy">' . $zz3 . '</div>'),
            'MarineGiant' => _t('<div class="kuai"><img src="' . $url . '/images/MarineGiant.jpg" loading="lazy" loading="lazy">' . $zz4 . '</div>'),
            'lv' => _t('<div class="kuai tags"><img src="' . $url . '/images/lv.jpg" loading="lazy">' . $zz5 . '</div>'),
            'black' => _t('<div class="kuai"><img src="' . $url . '/images/black.jpg" loading="lazy" loading="lazy">' . $zz6 . '</div>'),
            'white' => _t('<div class="kuai"><img src="' . $url . '/images/white.jpg" loading="lazy">' . $zz7 . '</div>'),
            'heike' => _t('<div class="kuai tags"><img src="' . $url . '/images/heike.jpg" loading="lazy">' . $zz8 . '</div>'),
            'mohu' => _t('<div class="kuai"><img src="' . $url . '/images/mohu.jpg" loading="lazy">' . $zz9 . '</div>'),
            'kongbai' => _t('<div class="kuai"><img src="' . $url . '/images/kongbai.jpg" loading="lazy">' . $zz10 . '</div>'),
        ), 'suya', _t('登陆/注册页面样式'), _t(''));
        $bgfengge->setAttribute('id', 'yangshi');
        $form->addInput($bgfengge);

        $bgUrl = new Typecho_Widget_Helper_Form_Element_Text('bgUrl', NULL, NULL, _t('自定义背景图'), _t('选中上方的基础样式后，可以在这里填写图片地址自定义背景图；<b>注意</b>：带有【动态】标识的风格不支持自定义背景图。'));
        $form->addInput($bgUrl);

        $diycss = new Typecho_Widget_Helper_Form_Element_Textarea('diycss', NULL, NULL, '自定义登录样式', _t('上边的样式选择【空白样式】，然后在这里自己写css美化注册/登录页面；<b>注意</b>：该功能与【自定义背景图】功能冲突，使用该功能时如果想设置背景图请写css里面。'));
        $form->addInput($diycss);

        $avatar = new Typecho_Widget_Helper_Form_Element_Text('avatar', NULL, NULL, _t('左边栏头像'), _t('输入头像链接，默认取QQ头像'));
        $form->addInput($avatar);

        $diyadmincss = new Typecho_Widget_Helper_Form_Element_Textarea('diyadmincss', NULL, NULL, '自定义后台样式', _t("可以自定义后台css<br>一些主题自带的色系如下：要重写的话请在重写的css后加!important<br>举例：<br>:root, [data-color-mode=light] {<br>
--backgroundA: red!important;<br>
}<br>白天<br>:root, [data-color-mode=light] {<br>
  color-scheme: light;<br>
  --background: #f1f5f8;<br>
  --backgroundA: #fff;<br>
  --theme: #4770db;<br>
  --element: #409eff;<br>
  --classA: #dcdfe6;<br>
  --classB: #e4e7ed;<br>
  --classC: #ebeef5;<br>
  --classD: #f2f6fc;<br>
  --main: #303133;<br>
  --routine: #606266;<br>
  --minor: #6e7075;<br>
  --seat: #c0c4cc;<br>
  --success: #67c23a;<br>
  --warning: #e6a23c;<br>
  --danger: #f56c6c;<br>
  --info: #909399;<br>
  --WhiteDark: #fff;<br>
  --WhiteDarkRe: #000;<br>
  --box-shadow-weight: 4px 0 25px 0 #e5ecf2;<br>
  --color-text-primary: #24292e;<br>
  --color-bg-canvas: #fff;<br>

  --toggle-thuumb-bg: #2f363d;<br>
  --toggle-track-border: #d1d5da;<br>
  --toggle-track-bg: #fff;<br>
}<br>黑夜<br>
[data-color-mode=dark] {<br>
  color-scheme: dark;<br>
  --background: #191919 !important;<br>
  --backgroundA: #212121 !important;<br>
  --WhiteDark: #000;<br>
  --WhiteDarkRe: #fff;<br>
  --box-shadow-weight: 1px 0 8px 0 #e5ecf2;<br>
  --main: #aaa !important;<br>
  --classC: rgba(0, 0, 0, .25) !important;<br>
  --classB: var(--classC) !important;<br>
  --classA: #3c3e44;<br>
  --secondary-color-darkest: var(--backgroundA);<br>
  --box-shadow: 0 0 black !important;<br>
  --minor: #777 !important;<br>
  --routine: var(--minor) !important;<br>
  --classD: #000 !important;<br>

  --color-text-primary: #c9d1d9;<br>
  --color-bg-canvas: #0d1117;<br>
  --toggle-thuumb-bg: #6e40c9;<br>
  --toggle-track-border: #3c1e70;<br>
  --toggle-track-bg: #271052;<br>
}"));
        $form->addInput($diyadmincss);
    }

    /**
     * 个人用户的配置面板
     *
     * @access public
     * @param Typecho_Widget_Helper_Form $form
     * @return void
     */
    public static function personalConfig(Typecho_Widget_Helper_Form $form)
    {
    }

    /**
     * 插件实现方法
     *
     * @access public
     * @param $hed
     * @return string
     * @throws Typecho_Exception
     */
    public static function renderHeader($hed,$new)
    {
        $hed = !empty($new)?$new:$hed;
        $url = Helper::options()->pluginUrl . '/SimpleAdmin/static/';
        if (!Typecho_Widget::widget('Widget_User')->hasLogin()) {
            $skin = Typecho_Widget::widget('Widget_Options')->plugin('SimpleAdmin')->bgfengge;
            $diycss = Typecho_Widget::widget('Widget_Options')->plugin('SimpleAdmin')->diycss;
            if ($skin == 'kongbai') {
                $hed = $hed . '<style>' . $diycss . '</style>';
            } else {
                if ($skin == 'heike') {
                    $hed = $hed . '<link rel="stylesheet" href="' . $url . 'skin/' . $skin . '.css?20191125">';
                } else {
                    $bgUrl = Typecho_Widget::widget('Widget_Options')->plugin('SimpleAdmin')->bgUrl;
                    $zidingyi = "";
                    if ($bgUrl) {
                        $zidingyi = "<style>body,body::before{background-image: url(" . $bgUrl . ")}</style>";
                    }
                    $hed = $hed . '<link rel="stylesheet" href="' . $url . 'skin/' . $skin . '.css?20191125">' . $zidingyi;
                }
            }
            echo $hed;
        } else {
            define('__TYPECHO_GRAVATAR_PREFIX__', '//' . 'cdn.v2ex.com/gravatar' . '/');
            $user = Typecho_Widget::widget('Widget_User');
            $menu = Typecho_Widget::widget('Widget_Menu')->to($menu);
            $email = $user->mail;
            if ($email) {
                $c = strtolower($email);
                $f = str_replace('@qq.com', '', $c);
                if (strstr($c, "qq.com") && is_numeric($f) && strlen($f) < 11 && strlen($f) > 4) {
                    $tx = '//q1.qlogo.cn/g?b=qq&nk=' . $f . '&';
                } else {
                    $d = md5($c);
                    $tx = '//' . 'cdn.v2ex.com/gravatar' . '/' . $d . '?';
                }
            } else {
                $tx = $url . 'img/user.png';
            }
            $tx .= 's=100';
            $options = Helper::options();
            $plugin_options = Helper::options()->plugin('SimpleAdmin');
            $avatar = empty($plugin_options->avatar)?$tx:$plugin_options->avatar;
            $diyadmincss = $plugin_options->diyadmincss;
            $hed = $hed . '
            <link rel="stylesheet" href="' . $url . 'css/user.min.css">
            <link rel="stylesheet" href="//at.alicdn.com/t/font_1159885_cgwht2i4i9m.css">
            <link rel="stylesheet" href="//at.alicdn.com/t/font_2348538_kz7l6lrb8h.css">
            <script>
                const UserLink_="' . $options->adminUrl . '/profile.php";
                const UserPic_="' . $avatar . '";
                const AdminLink_="' . $options->adminUrl . '";
                const SiteLink_="' . $options->siteUrl . '";
                const UserName_="' . $user->screenName . '";
                const UserGroup_="' . $user->group . '";
                const SiteName_="' . $options->title . '";
                const MenuTitle_="' . strip_tags($menu->title) . '";
                const globalConfig = {
                    theme:"'. $options->theme.'",
                    write_post:"'. $options->adminUrl.'write-post.php'.'",
                    write_page:"'. $options->adminUrl.'write-page.php'.'",
                    options_theme_page:"'. $options->adminUrl.'options-theme.php'.'",
                    themes:"'. $options->adminUrl.'themes.php'.'",
                    plugins:"'. $options->adminUrl.'plugins.php'.'",
                    options_general:"'. $options->adminUrl.'options-general.php'.'",
                }
            </script>
            <style>'.$diyadmincss.'</style>
            ';
        }
        return $hed;
    }

    public static function renderFooter()
    {
        $url = Helper::options()->pluginUrl . '/SimpleAdmin/static/';
        if (Typecho_Widget::widget('Widget_User')->hasLogin()) {
            echo '<script src="' . $url . 'js/user.js"></script>';
        } else {
            $url = Helper::options()->pluginUrl . '/SimpleAdmin/';
            $skin = Typecho_Widget::widget('Widget_Options')->plugin('SimpleAdmin')->bgfengge;
            $ft = '';
            if ($skin == 'heike') {
                $ft = '<canvas id="canvas"></canvas><script type="text/javascript">window.onload=function(){var canvas=document.getElementById("canvas");var context=canvas.getContext("2d");var W=window.innerWidth;var H=window.innerHeight;canvas.width=W;canvas.height=H;var fontSize=16;var colunms=Math.floor(W/fontSize);var drops=[];for(var i=0;i<colunms;i++){drops.push(0)}var str="111001101000100010010001111001111000100010110001111001001011110110100000";function draw(){context.fillStyle="rgba(0,0,0,0.05)";context.fillRect(0,0,W,H);context.font="700 "+fontSize+"px  微软雅黑";context.fillStyle="#00cc33";for(var i=0;i<colunms;i++){var index=Math.floor(Math.random()*str.length);var x=i*fontSize;var y=drops[i]*fontSize;context.fillText(str[index],x,y);if(y>=canvas.height&&Math.random()>0.99){drops[i]=0}drops[i]++}}function randColor(){var r=Math.floor(Math.random()*256);var g=Math.floor(Math.random()*256);var b=Math.floor(Math.random()*256);return"rgb("+r+","+g+","+b+")"}draw();setInterval(draw,30)};</script>';
            }
            if ($skin == 'lv') {
                $ft = '<ul class="bg-bubbles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
            }
            echo $ft;
        }
    }
}