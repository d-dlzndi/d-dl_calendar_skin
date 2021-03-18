$(document).ready(function () {
    var linkHref = $(location).attr('href');
    var linkHref2 = encodeURI(linkHref);
    var hostHref = $(location).attr('protocol') + '//' + $(location).attr('host') + '/';

    $(".menu-side > div:not(.profile) a").each(function () {
        // $(this).removeClass('selected');
        var origHref = encodeURI($(this).attr("href"));

        if (linkHref.indexOf(origHref) == -1 && linkHref2.indexOf(origHref) == -1)
            return;

        var link = linkHref.substr(linkHref.length - origHref.length);
        var link2 = linkHref2.substr(linkHref2.length - origHref.length);
        if (link.indexOf(origHref) == -1 && link2.indexOf(origHref) == -1) {
            if (origHref == "/") {
                if (linkHref != hostHref)
                    return;
            } else if (origHref == "/category") {
                if (linkHref.indexOf(origHref + "/?") == -1 &&
                    linkHref2.indexOf(origHref + "/?") == -1)
                    return;
            } else if (origHref.indexOf("/category/") == 0) {
                if (linkHref.indexOf(origHref + "?") == -1 &&
                    linkHref2.indexOf(origHref + "?") == -1)
                    return;
            }
        }
        if (linkHref.indexOf("/archive/") != -1 &&
            origHref.indexOf("/archive/") == -1) {
            return; // 아카이브 날짜 때문에 들어가는 코드
        }
        $(this).addClass("selected");
        $(this).closest(".sub_category_list").prev("a").addClass("selected");
    });

    // 코멘트0, 댓글창 닫혀있을 경우 댓글을 아예 다 지움.
    $('.cmt-count').each(function () {
        var txt = $(this).html();
        if (txt != 0 && txt != '0' && txt != 'null') return;
        var par = $(this).closest('.comment-bar');
        var par2 = par.next('.white-box');
        var par3 = par2.next('.article-comment');
        var form = par3.find('form');
        if ($.trim(form.html()) == "") {
            par.css("display", "none");
            par2.css("display", "none");
            par3.css("display", "none");
        }
    });

    $('.list-style').each(function () {
        var child = $(this).children('.thumb-box');
        if (!$(this).hasClass('list')) {
            child = $(this).children('li');
            var smalls = $('.list-style').find('.thumb-content span.small');
            smalls.each(function () {
                var tt = $(this).find(".comment-count");
                var ct = tt.html();
                if (ct == "(0)" || ct == null || ct == "")
                    $(this).css("display", "none");
                else
                    tt.html(ct.substr(1, ct.length - 2));
            });
        }
        child.each(function () {
            $(this).remove()
        });
    });

}); //document ready

window.onload = function () {
    $('.tag-list').each(function () {
        var comma = $(this).html();
        $(this).html(comma.replace(/,/g, ''));
    });
    $('.dot-edit').each(function () {
        var dot = $(this).html();
        $(this).html(dot.replaceAll('.', ''));
    });
    $('.description').each(function () {
        var txt = $.trim($(this).find('p').text());
        if (txt != "" && txt != $.trim($('.profile .descrip').text())) {
            $(this).slideDown();
        }
    });
    $(".list-style *[lsummary]").each(function () {
        if ($(this).attr("lsummary") != "보호되어 있는 글입니다.") return;
        if ($(this).hasClass("thumb-lock")) {
            $(this).closest(".thumb-box").addClass("lock");
        } else {
            $(this).html('<i class="fas fa-lock"></i>');
        }
    });
    $('a.btn-toggle-moreless').click(function () {
        if (!$(this).closest('div[data-ke-type="moreLess"]').hasClass('open')) {
            $("html, body").stop().animate({
                scrollTop: $(this).offset().top - 50
            }, 500);
        }
    });
    $('body').addClass('loaded');
};

function copyText(txt) {
    prompt("ctrl+C를 눌러 복사하세요.", txt);
}

function sideToggle() {
    $('body').toggleClass('open');
}

function ScrollTop() {
    $("html, body").stop().animate({
        scrollTop: 0
    }, 500);
}

function ScrollBottom() {
    $("html, body").stop().animate({
        scrollTop: $(document).height() - $(window).height()
    }, 500);
}
