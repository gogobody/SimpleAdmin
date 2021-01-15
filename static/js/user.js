const globalVars = {
    body: $("body"),
    ty_nav_list: $('#typecho-nav-list'),
    ty_page_main: $('.typecho-page-main')
}

function getElementsClass(classnames) {
    let classobj = [];
    let classint = 0;
    let tags = document.getElementsByTagName("*");
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].nodeType === 1) {
            if (tags[i].getAttribute("class") === classnames) {
                classobj[classint] = tags[i];
                classint++;
            }
        }
    }
    return classobj;
}
class SimpleUtils {
    constructor() {
    }
    static getVersion(){
        return '1.0.4';
    }
    static update_detec() {
        let container = document.getElementById('check-update');
        if (!container) return;
        let ajax = new XMLHttpRequest();
        container.style.display = 'block';
        ajax.open('get', 'https://api.github.com/repos/gogobody/SimpleAdmin/releases/latest');
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                let obj = JSON.parse(ajax.responseText);
                let newest = obj.tag_name;
                if (newest > SimpleUtils.getVersion()) {
                    container.innerHTML =
                        '发现新主题版本：' + obj.name +
                        '。下载地址：<a href="' + obj.zipball_url + '">点击下载</a>' +
                        '<br>您目前的版本:' + String(SimpleUtils.getVersion()) + '。' +
                        '<a target="_blank" href="' + obj.html_url + '">👉查看新版亮点</a>';
                } else {
                    container.innerHTML = '您目前使用的是最新版主题。';
                }
            }
        }
    }
}

class Simple{
    constructor() {
        this.init()
    }
    init(){
        this.global_init()
        this.header_cat_init()

        this.manages_pages_init()
        this.comments_page_init()
        this.copyright_init()
        this.mask_init()
        this.input_init()
        this.button_init()
        this.select_init()
        this.table_init()
        this.dropdown_init()

        this.managetags_page_init()
        this.manages_plugins_init()
        this.mobile_nav_init()

        SimpleUtils.update_detec()
    }
    global_init(){
        let childCount = globalVars.ty_nav_list.children('.root').size();
        let one = '', two = '', three = '', four = '', five = '';
        globalVars.ty_nav_list.find('.child li').eq(0).each(function () {
            $(this).remove();
        });
        globalVars.ty_nav_list.find('.child').eq(0).each(function () {
            one = $(this).html();
        });
        globalVars.ty_nav_list.find('.child').eq(1).each(function () {
            two = $(this).html();
        });
        globalVars.ty_nav_list.find('.child').eq(2).each(function () {
            three = $(this).html();
        });
        globalVars.ty_nav_list.find('.child').eq(3).each(function () {
            four = $(this).html();
        });
        if (childCount > 4) {
            let linshi = "", icon = "fa-ding";
            for (let i = 4; i < childCount; i++) {
                globalVars.ty_nav_list.find('.child').eq(i).each(function () {
                    linshi = "<ul class=\"menu-ul\">" + $(this).html() + "</ul>";
                });
                globalVars.ty_nav_list.find('.root').eq(i).find('.parent a').each(function () {
                    if ($(this).html() === 'TePass') {
                        icon = "fa-rmb";
                    }
                    five = five + "<li class=\"menu-li\"><a href=\"javascript:;\"><i class=\"fa " + icon + "\"></i>" + $(this).html() + "<i class=\"zm zm-sanJiaoBottom right\"></i></a>" + linshi + "</li>";
                });
            }
        }
        let Mask = '<div class="mask"></div>';
        $("body div.main").prepend(Mask)
        let UserInfo = "<div class=\"user-info\"><a href=\"" + AdminLink_ + "\"><img src=\"" + UserPic_ + "s=100\" /></a><p>欢迎您，<a href=\"" + AdminLink_ + "\">" + UserName_ + "</a></p></div>";
        let HtmlText = ""
        if (UserGroup_ === "administrator") {
            HtmlText = "<div class=\"user-nav\"><ul><li><a href=\"" + AdminLink_ + "index.php\"><i class=\"zm zm-zu\"></i>主控制台</a></li><li><a href=\"" + AdminLink_ + "write-post.php\"><i class=\"zm zm-bianji\"></i>撰写文章</a></li><li class=\"menu-li\"><a href=\"javascript:;\"><i class=\"zm zm-quanjushuxing\"></i>全局模块<i class=\"zm zm-sanJiaoBottom right\"></i></a><ul class=\"menu-ul\">" + one + "</ul></li><li class=\"menu-li\"><a href=\"javascript:;\"><i class=\"zm zm-zhuomiankuaijiefangshi\"></i>快捷操作<i class=\"zm zm-sanJiaoBottom right\"></i></a><ul class=\"menu-ul\">" + two + "</li></ul></li><li class=\"menu-li\"><a href=\"javascript:;\"><i class=\"zm zm-leibie\"></i>内容管理<i class=\"zm zm-sanJiaoBottom right\"></i></a><ul class=\"menu-ul\">" + three + "</ul></li><li class=\"menu-li\"><a href=\"javascript:;\"><i class=\"zm zm-shezhi\"></i>网站设置<i class=\"zm zm-sanJiaoBottom right\"></i></a><ul class=\"menu-ul\">" + four + "</ul><li>" + five + "</ul></div>";
        } else if (UserGroup_ === "editor" || UserGroup_ === "contributor") {
            HtmlText = "<div class=\"user-nav\"><ul><li><a href=\"" + AdminLink_ + "index.php\"><i class=\"fa fa-dashboard\"></i>主控制台</a></li><li><a href=\"" + AdminLink_ + "profile.php\"><i class=\"fa fa-gear\"></i>个人设置</a></li><li><a href=\"" + AdminLink_ + "write-post.php\"><i class=\"zm zm-bianji\"></i>撰写文章</a></li><li><a href=\"" + AdminLink_ + "manage-posts.php\"><i class=\"fa fa-cube\"></i>管理文章</a></li><li><a href=\"" + AdminLink_ + "/manage-comments.php\"><i class=\"fa fa-comments-o\"></i>管理评论</a></li></ul></div>";
        } else {
            HtmlText = "<div class=\"user-nav\"><ul><li><a href=\"" + AdminLink_ + "index.php\"><i class=\"fa fa-dashboard\"></i>主控制台</a></li><li><a href=\"" + AdminLink_ + "profile.php\"><i class=\"fa fa-gear\"></i>个人设置</a></li></ul></div>";
        }
        let NavHtml = UserInfo + HtmlText;
        let Nav = document.getElementById('typecho-nav-list');
        if (UserGroup_ !== "") {
            globalVars.ty_nav_list.html(NavHtml);
            let ToMain = getElementsClass("operate")[0];
            let Main = getElementsClass("main")[0];
            let ToNav = document.createElement('a');
            let width = document.body.clientWidth;
            ToNav.id = "tonav";
            ToNav.href = 'javascript:;';
            ToNav.innerHTML = '<i class="zm zm-caidan"></i>';
            ToMain.appendChild(ToNav);
            let ToggleNav = document.createElement('tonav');
            tonav.onclick = function () {
                if (width > 1000) {
                    if (Nav.style.display === "block") {
                        Nav.style.display = "none";
                        ToMain.style.width = "calc(100% - 15px)";
                        Main.style.width = "100%";
                    } else if (Nav.style.display === "none") {
                        Nav.style.display = "block";
                        ToMain.style.width = "calc(100% - 225px)";
                        Main.style.width = "calc(100% - 230px)";
                    } else {
                        Nav.style.display = "none";
                        ToMain.style.width = "calc(100% - 15px)";
                        Main.style.width = "100%";
                    }
                } else {
                    if (Nav.style.display === "block") {
                        Nav.style.display = "none";
                        ToMain.style.width = "100%";
                        Main.style.width = "100%";
                    } else if (Nav.style.display === "none") {
                        Nav.style.display = "block";
                        ToMain.style.width = "100%";
                        Main.style.width = "100%";
                    } else {
                        Nav.style.display = "block";
                        ToMain.style.width = "100%";
                        Main.style.width = "100%";
                    }
                }
                if (width < 500){
                    $(".main .mask").toggleClass("active")
                }
            }
            if (MenuTitle_ === "个人设置") {
                let avatar = getElementsClass("profile-avatar")[0];
                avatar.setAttribute("src", UserPic_ + "s=640");
                avatar.style.width = "150px";
            }
        } else {
            let LoginMain = getElementsClass("i-logo")[0];
            let Body = getElementsClass("body-100")[0];
            let Cover = document.createElement('div');
            Cover.id = "cover";
            Body.appendChild(Cover);
            LoginMain.innerHTML = "<img src=\"" + SiteLink_ + "img/logo.png\" alt=\"" + SiteName_ + "\"/>";
        }

        globalVars.ty_nav_list.find('li.focus').each(function () {
            $(this).parent(".menu-ul").show();
        });

        globalVars.body.on("click", ".menu-li",
            function () {
                if ($(this).find(".menu-ul").is(":hidden")) {
                    $(".menu-ul").hide(200);
                }
                $(this).find(".menu-ul").slideToggle(200);
            });
        globalVars.body.on("click", "#wmd-fullscreen-button",
            function () {
                $(".main").addClass("main-in");
            });
        globalVars.body.on("click", "#wmd-exit-fullscreen-button",
            function () {
                $(".main").removeClass("main-in");
            });

        $('.typecho-list-table').find('colgroup').each(function () {
            $(this).remove();
        });
        if (MenuTitle_ === "网站概要") {
            globalVars.ty_page_main.find('li:eq(0) a').html("撰写文章");
            globalVars.ty_page_main.find('div:eq(1)').addClass("col-tb-6").removeClass("col-tb-4");
            globalVars.ty_page_main.find('div:eq(2)').addClass("col-tb-6").removeClass("col-tb-4");
            globalVars.ty_page_main.find('div:eq(3)').each(function () {
                $(this).remove();
            });
        }
        let ty_list_table_tr = $('.typecho-list-table tr')
        if (MenuTitle_ === "插件管理") {
            $("body").addClass("manageplugins")
            ty_list_table_tr.find('td:eq(0)').attr("data-label", "名称：");
            ty_list_table_tr.find('td:eq(1)').attr("data-label", "描述：");
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "版本：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "作者：");
            ty_list_table_tr.find('td:eq(4)').attr("data-label", "操作：");
        } else if (MenuTitle_ === "管理文章") {
            $("body").addClass("manageposts")
            ty_list_table_tr.find('th:eq(1)').text("评论");
            ty_list_table_tr.find('td:eq(1)').attr("data-label", "评论：");
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "标题：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "作者：");
            ty_list_table_tr.find('td:eq(4)').attr("data-label", "分类：");
            ty_list_table_tr.find('td:eq(5)').attr("data-label", "日期：");
        } else if (MenuTitle_ === "管理页面") {
            $("body").addClass("managepages")
            ty_list_table_tr.find('th:eq(1)').text("评论");
            ty_list_table_tr.find('td:eq(1)').attr("data-label", "评论：");
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "标题：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "缩略名：");
            ty_list_table_tr.find('td:eq(4)').attr("data-label", "作者：");
            ty_list_table_tr.find('td:eq(5)').attr("data-label", "日期：");
        } else if (MenuTitle_ === "管理评论") {
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "评论者：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "发表于：");
        } else if (MenuTitle_ === "管理分类") {
            ty_list_table_tr.find('td:eq(1)').attr("data-label", "名称：");
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "子分类：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "缩略名：");
            ty_list_table_tr.find('td:eq(5)').attr("data-label", "文章数：");
        } else if (MenuTitle_ === "管理用户") {
            ty_list_table_tr.find('th:eq(1)').text("文章数");
            ty_list_table_tr.find('td:eq(1)').attr("data-label", "文章数：");
            ty_list_table_tr.find('td:eq(2)').attr("data-label", "用户名：");
            ty_list_table_tr.find('td:eq(3)').attr("data-label", "昵称：");
            ty_list_table_tr.find('td:eq(4)').attr("data-label", "邮件：");
            ty_list_table_tr.find('td:eq(5)').attr("data-label", "用户组：");
        } else if (MenuTitle_ === "管理标签") {
            $("body").addClass("managetags")
        }
    }
    comments_page_init(){
        Comments_page.filter_comments()
    }

    managetags_page_init(){
        Managetags_page.tags_init()
    }
    header_cat_init(){
        // cat init
        let domHtml = '<div class="profile-color-modes js-promo-color-modes-banner-profile"><svg aria-hidden="true" height="30" viewBox="0 0 106 60" fill="none" stroke-width="3"                         stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><g class="profile-color-modes-illu-group profile-color-modes-illu-red"><path d="M37.5 58.5V57.5C37.5 49.768 43.768 43.5 51.5 43.5V43.5C59.232 43.5 65.5 49.768 65.5 57.5V58.5"></path></g><g class="profile-color-modes-illu-group profile-color-modes-illu-orange"><path d="M104.07 58.5C103.401 55.092 97.7635 54.3869 95.5375 57.489C97.4039 54.6411 99.7685 48.8845 94.6889 46.6592C89.4817 44.378 86.1428 50.1604 85.3786 54.1158C85.9519 50.4768 83.7226 43.294 78.219 44.6737C72.7154 46.0534 72.7793 51.3754 74.4992 55.489C74.169 54.7601 72.4917 53.3567 70.5 52.8196"></path></g><g class="profile-color-modes-illu-group profile-color-modes-illu-purple"><path d="M5.51109 58.5V52.5C5.51109 41.4543 14.4654 32.5 25.5111 32.5C31.4845 32.5 36.8464 35.1188 40.5111 39.2709C40.7212 39.5089 40.9258 39.7521 41.1245 40"></path><path d="M27.511 49.5C29.6777 49.5 28.911 49.5 32.511 49.5"></path><path d="M27.511 56.5C29.6776 56.5 26.911 56.5 30.511 56.5"></path></g><g class="profile-color-modes-illu-group profile-color-modes-illu-green"><circle cx="5.5" cy="12.5" r="4"></circle><circle cx="18.5" cy="5.5" r="4"></circle><path d="M18.5 9.5L18.5 27.5"></path><path d="M18.5 23.5C6 23.5 5.5 23.6064 5.5 16.5"></path></g><g class="profile-color-modes-illu-group profile-color-modes-illu-blue"><g class="profile-color-modes-illu-frame"><path d="M40.6983 31.5C40.5387 29.6246 40.6456 28.0199 41.1762 27.2317C42.9939 24.5312 49.7417 26.6027 52.5428 30.2409C54.2551 29.8552 56.0796 29.6619 57.9731 29.6619C59.8169 29.6619 61.5953 29.8452 63.2682 30.211C66.0833 26.5913 72.799 24.5386 74.6117 27.2317C75.6839 28.8246 75.0259 33.7525 73.9345 37.5094C74.2013 37.9848 74.4422 38.4817 74.6555 39"></path></g><g class="profile-color-modes-illu-frame"><path d="M41.508 31.5C41.6336 31.2259 41.7672 30.9582 41.9085 30.6968C40.7845 26.9182 40.086 21.8512 41.1762 20.2317C42.9939 17.5312 49.7417 19.6027 52.5428 23.2409C54.2551 22.8552 56.0796 22.6619 57.9731 22.6619C59.8169 22.6619 61.5953 22.8452 63.2682 23.211C66.0833 19.5913 72.799 17.5386 74.6117 20.2317C75.6839 21.8246 75.0259 26.7525 73.9345 30.5094C75.1352 32.6488 75.811 35.2229 75.811 38.2283C75.811 38.49 75.8058 38.7472 75.7957 39"></path><path d="M49.4996 33V35.6757"></path><path d="M67.3375 33V35.6757"></path></g><g class="profile-color-modes-illu-frame"><path d="M41.508 31.5C41.6336 31.2259 41.7672 30.9582 41.9085 30.6968C40.7845 26.9182 40.086 21.8512 41.1762 20.2317C42.9939 17.5312 49.7417 19.6027 52.5428 23.2409C54.2551 22.8552 56.0796 22.6619 57.9731 22.6619C59.8169 22.6619 61.5953 22.8452 63.2682 23.211C66.0833 19.5913 72.799 17.5386 74.6117 20.2317C75.6839 21.8246 75.0259 26.7525 73.9345 30.5094C75.1352 32.6488 75.811 35.2229 75.811 38.2283C75.811 38.49 75.8058 38.7472 75.7957 39"></path></g><g class="profile-color-modes-illu-frame"><path d="M41.508 31.5C41.6336 31.2259 41.7672 30.9582 41.9085 30.6968C40.7845 26.9182 40.086 21.8512 41.1762 20.2317C42.9939 17.5312 49.7417 19.6027 52.5428 23.2409C54.2551 22.8552 56.0796 22.6619 57.9731 22.6619C59.8169 22.6619 61.5953 22.8452 63.2682 23.211C66.0833 19.5913 72.799 17.5386 74.6117 20.2317C75.6839 21.8246 75.0259 26.7525 73.9345 30.5094C75.1352 32.6488 75.811 35.2229 75.811 38.2283C75.811 38.49 75.8058 38.7472 75.7957 39"></path><path d="M49.4996 33V35.6757"></path><path d="M67.3375 33V35.6757"></path></g><g class="profile-color-modes-illu-frame"><path d="M41.508 31.5C41.6336 31.2259 41.7672 30.9582 41.9085 30.6968C40.7845 26.9182 40.086 21.8512 41.1762 20.2317C42.9939 17.5312 49.7417 19.6027 52.5428 23.2409C54.2551 22.8552 56.0796 22.6619 57.9731 22.6619C59.8169 22.6619 61.5953 22.8452 63.2682 23.211C66.0833 19.5913 72.799 17.5386 74.6117 20.2317C75.6839 21.8246 75.0259 26.7525 73.9345 30.5094C75.1352 32.6488 75.811 35.2229 75.811 38.2283C75.811 38.49 75.8058 38.7472 75.7957 39"></path></g><g class="profile-color-modes-illu-frame"><path d="M41.508 31.5C41.6336 31.2259 41.7672 30.9582 41.9085 30.6968C40.7845 26.9182 40.086 21.8512 41.1762 20.2317C42.9939 17.5312 49.7417 19.6027 52.5428 23.2409C54.2551 22.8552 56.0796 22.6619 57.9731 22.6619C59.8169 22.6619 61.5953 22.8452 63.2682 23.211C66.0833 19.5913 72.799 17.5386 74.6117 20.2317C75.6839 21.8246 75.0259 26.7525 73.9345 30.5094C75.1352 32.6488 75.811 35.2229 75.811 38.2283C75.811 38.49 75.8058 38.7472 75.7957 39"></path><path d="M49.4996 33V35.6757"></path><path d="M67.3375 33V35.6757"></path></g><g class="profile-color-modes-illu-frame"><path d="M73.4999 40.2236C74.9709 38.2049 75.8108 35.5791 75.8108 32.2283C75.8108 29.2229 75.1351 26.6488 73.9344 24.5094C75.0258 20.7525 75.6838 15.8246 74.6116 14.2317C72.7989 11.5386 66.0832 13.5913 63.2681 17.211C61.5952 16.8452 59.8167 16.6619 57.973 16.6619C56.0795 16.6619 54.2549 16.8552 52.5427 17.2409C49.7416 13.6027 42.9938 11.5312 41.176 14.2317C40.0859 15.8512 40.7843 20.9182 41.9084 24.6968C41.003 26.3716 40.4146 28.3065 40.2129 30.5"></path><path d="M82.9458 30.5471L76.8413 31.657"></path><path d="M76.2867 34.4319L81.8362 37.7616"></path><path d="M49.4995 27.8242V30.4999"></path><path d="M67.3374 27.8242V30.4998"></path></g><g class="profile-color-modes-illu-frame"><path d="M45.3697 34.2658C41.8877 32.1376 39.7113 28.6222 39.7113 23.2283C39.7113 20.3101 40.3483 17.7986 41.4845 15.6968C40.3605 11.9182 39.662 6.85125 40.7522 5.23168C42.5699 2.53117 49.3177 4.6027 52.1188 8.24095C53.831 7.85521 55.6556 7.66186 57.5491 7.66186C59.3929 7.66186 61.1713 7.84519 62.8442 8.21095C65.6593 4.59134 72.375 2.5386 74.1877 5.23168C75.2599 6.82461 74.6019 11.7525 73.5105 15.5094C74.7112 17.6488 75.3869 20.2229 75.3869 23.2283C75.3869 28.6222 73.2105 32.1376 69.7285 34.2658C70.8603 35.5363 72.6057 38.3556 73.3076 40"></path><path d="M49.0747 19.8242V22.4999"></path><path d="M54.0991 28C54.6651 29.0893 55.7863 30.0812 57.9929 30.0812C59.0642 30.0812 59.8797 29.8461 60.5 29.4788"></path><path d="M66.9126 19.8242V22.4999"></path><path d="M33.2533 20.0237L39.0723 22.1767"></path><path d="M39.1369 25.0058L33.0935 27.3212"></path><path d="M81.8442 19.022L76.0252 21.1751"></path><path d="M75.961 24.0041L82.0045 26.3196"></path></g><g class="profile-color-modes-illu-frame"><path d="M73.4999 40.2236C74.9709 38.2049 75.8108 35.5791 75.8108 32.2283C75.8108 29.2229 75.1351 26.6488 73.9344 24.5094C75.0258 20.7525 75.6838 15.8246 74.6116 14.2317C72.7989 11.5386 66.0832 13.5913 63.2681 17.211C61.5952 16.8452 59.8167 16.6619 57.973 16.6619C56.0795 16.6619 54.2549 16.8552 52.5427 17.2409C49.7416 13.6027 42.9938 11.5312 41.176 14.2317C40.0859 15.8512 40.7843 20.9182 41.9084 24.6968C41.003 26.3716 40.4146 28.3065 40.2129 30.5"></path><path d="M82.9458 30.5471L76.8413 31.657"></path><path d="M76.2867 34.4319L81.8362 37.7616"></path><path d="M49.4995 27.8242V30.4999"></path><path d="M67.3374 27.8242V30.4998"></path></g><g class="profile-color-modes-illu-frame"><path d="M40.6983 31.5C40.5387 29.6246 40.6456 28.0199 41.1762 27.2317C42.9939 24.5312 49.7417 26.6027 52.5428 30.2409C54.2551 29.8552 56.0796 29.6619 57.9731 29.6619C59.8169 29.6619 61.5953 29.8452 63.2682 30.211C66.0833 26.5913 72.799 24.5386 74.6117 27.2317C75.6839 28.8246 75.0259 33.7525 73.9345 37.5094C74.2013 37.9848 74.4422 38.4817 74.6555 39"></path></g></g></svg><span class="profile-color-modes-toggle js-promo-color-modes-toggle" role="checkbox"                          aria-checked="false" aria-label="Toggle dark mode" tabindex="0"><div class="profile-color-modes-toggle-track"></div><div class="profile-color-modes-toggle-thumb js-promo-color-modes-thumb"><svg class="profile-svg-inner" style="fill: #ffdf5d;" aria-hidden="true"  width="14" height="13" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.52208 7.71754C7.5782 7.71754 10.0557 5.24006 10.0557 2.18394C10.0557 1.93498 10.0392 1.68986 10.0074 1.44961C9.95801 1.07727 10.3495 0.771159 10.6474 0.99992C12.1153 2.12716 13.0615 3.89999 13.0615 5.89383C13.0615 9.29958 10.3006 12.0605 6.89485 12.0605C3.95334 12.0605 1.49286 10.001 0.876728 7.24527C0.794841 6.87902 1.23668 6.65289 1.55321 6.85451C2.41106 7.40095 3.4296 7.71754 4.52208 7.71754Z"></path></svg></div></span></div>';
        $(".typecho-head-nav .operate").prepend(domHtml)

        // 切换按钮
        function set_mode_toggle(e) {
            let t = !0, mode = "dark";
            "true" === e.getAttribute("aria-checked") && (t = !1 , mode = "light")
            e.setAttribute("aria-checked", String(t))
            change_mode(mode);
        }

        // 改变模式 并设置 cookie
        function change_mode(e) {
            const t = document.querySelector("html[data-color-mode]");
            if (e === "dark") document.cookie = "night=1;path=/";
            else document.cookie = "night=0;path=/"
            t && t.setAttribute("data-color-mode", e)
        }

        // 获取当前模式
        function get_user_scheme_mode() {
            const e = document.querySelector("html[data-color-mode]");
            if (!e)
                return;
            const t = e.getAttribute("data-color-mode");
            return "auto" === t ? function () {
                if (get_sys_scheme_mode("dark"))
                    return "dark";
                if (get_sys_scheme_mode("light"))
                    return "light";
            }() : t
        }

        // 获取系统模式 先判断 cookie 在获取系统的
        function get_sys_scheme_mode(e) {
            let night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            if (night) {
                if (night === '0') {
                    return false
                } else if (night === '1') {
                    return true
                }
            } else
                return window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${e})`).matches
        }

        !async function () {
            const e = document.querySelector(".js-promo-color-modes-toggle");
            if (e && "auto" === function () {
                const e = document.querySelector("html[data-color-mode]");
                if (!e)
                    return;
                return e.getAttribute("data-color-mode")
            }()) {
                "dark" === get_user_scheme_mode() && e.setAttribute("aria-checked", "true")
            }
        }()
        !async function () {
            document.querySelector(".js-color-mode-settings") && window.history.replaceState({}, document.title, document.URL.split("?")[0])
        }()
        // 添加点击事件
        let toggle_btn = document.getElementsByClassName("js-promo-color-modes-toggle")
        toggle_btn[0] ? toggle_btn[0].addEventListener('click', function (e) {
            set_mode_toggle(e.currentTarget)
        }, false) : false
    }
    mask_init(){
        $(".main .mask").click(function () {
            $("#tonav").click()
        })
    }
    input_init(){
        $("input[type=checkbox]").each(function (index,ele) {
            if (!$(ele).hasClass("form-check-input")){
                $(ele).addClass("form-check-input")
                $(ele).parent("li").addClass("form-check")
                $(ele).next("label").addClass("form-check-label")
            }
        })
        $("input[type=radio]").each(function (index,ele) {
            if (!$(ele).hasClass("form-check-input")){
                $(ele).addClass("form-check-input")
                $(ele).parent("span").addClass("form-check")
                $(ele).next("label").addClass("form-check-label")
            }
        })
        $("input[type=text]").each(function (index,ele) {
            if (!$(ele).hasClass("form-control")){
                $(ele).addClass("form-control")
            }
        })
    }
    button_init(){
        $("button.btn").each(function (index,ele){
            if ($(ele).hasClass("primary")){
                $(ele).removeClass("primary")
                $(ele).addClass("btn-primary btn-jelly")
            }else if($(ele).hasClass("btn-warn")){
                $(ele).removeClass("btn-warn")
                $(ele).addClass("btn-warning btn-jelly")
            }else {
                // $(ele).addClass("btn-jelly")
            }
        })
    }
    select_init(){
        $("select").each(function (index,ele){
            let tmp = $(ele).prop("outerHTML");
            $(ele).prop('outerHTML','<li class="select">'+tmp+"</li>")
        })
    }
    table_init(){
        $("table.typecho-list-table").addClass("table")
    }
    dropdown_init(){
        let dropdown = $(".btn-group.btn-drop")
        dropdown.find("button.dropdown-toggle").unbind('click')
        dropdown.addClass("dropdown")
        dropdown.find(".i-caret-down").remove()
        dropdown.find(".dropdown-menu li").addClass("dropdown-item")
        dropdown.children(".dropdown-toggle").click(function (e) {
            $(this).parent(".dropdown").toggleClass("active")
        })
    }
    manages_pages_init(){
        $("form.operate-form .typecho-list-table tbody tr").addClass("card shadow-sm")
    }
    manages_plugins_init(){
        $("body.manageplugins .typecho-list-table tbody tr").addClass("card shadow-sm")
    }
    copyright_init(){
        if (MenuTitle_ === "网站概要"){
            let tmpHtml = '<div class="typecho-page-title"><h2>插件说明</h2></div><div class="row typecho-page-main"><div class="col-mb-12 welcome-board">' +
                '<p><em>SimpleAdmin</em> 是一款即插即用的typecho后台美化插件</p><p>由gogobody修改自<a href="https://xwsir.cn">小王先森</a></p><p>更新地址：<a href="https://ijkxs.com">即刻学术</p></a></p>' +
                '<p id="check-update"></p></div></div>';
            $(".typecho-dashboard").prepend(tmpHtml)
        }
    }
    mobile_nav_init(){
        if ($(window).width()< 768){
            let color_select = $(".profile-color-modes.js-promo-color-modes-banner-profile")
            let all_nodes = $(".typecho-head-nav .operate").children()
            let nodes_len = all_nodes.length
            let dropdown_ele = '<div class="dropdown" id="navmore" style="display: inline-block;margin-right: 3px"><a style="background-color: var(--backgroundA)!important;" class="dropdown-toggle" href="#">更多</a><ul class="dropdown-menu" style="right: 0;left: auto">'
            all_nodes.each(function (index,ele){
                if (index>0 && index < nodes_len -1){ // 去掉首尾节点留作备用
                    if ($(ele).is('a')){
                        dropdown_ele = dropdown_ele +'<li class="dropdown-item">'+ $(ele).prop('outerHTML') +'</li>';
                    }else{
                        dropdown_ele = dropdown_ele +'<li class="dropdown-item"><a>'+ $(ele).prop('outerHTML') +'</a></li>';
                    }
                    $(ele).remove()
                }
            })
            dropdown_ele = dropdown_ele + '</ul></div>'
            color_select.after(dropdown_ele);
            $('#navmore').children(".dropdown-toggle").click(function (e) {
                $(this).parent(".dropdown").toggleClass("active")
            })
        }
    }

}
let Comments_page = {
    filter_comments:function () {
        let comments_form = $("form[name=manage_comments]")
        if (comments_form.length ===0) return;
        let comments_tr = comments_form.find('tbody tr .comment-content p')
        // 显示canvas 图片
        comments_tr.each(function (i, item) {
            let str = $(item).html();
            if (!/\{!\{.*\}!\}/.test(str)) return;
            str = str.replace(/{!{/, '').replace(/}!}/, '');
            $(item).html('<img style="height: 100px;width: auto" class="canvas" src="' + str + '" />');
        });
    }
}
let Managetags_page = {
    tags_init:function (){
        $("form[name=manage_tags] ul.tag-list li.form-check").each(function (index,ele) {
            $(ele).addClass("tag tag-primary")
        })
    }
}

$(function () {
    window.Simple = new Simple();
});
