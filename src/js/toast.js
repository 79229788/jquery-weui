+ function($) {
  "use strict";

  var indexId = 1;
  
  var show = function(html, className, id, mask) {
    className = className || "";
    hide();
    var maskId = id ? ('weui-toast-mask-' + id) : '';
    var toastId = id ? ('weui-toast-' + id) : '';
    if(mask) $("<div class='weui-mask_transparent weui-toast-mask' id='"+ maskId +"'></div>").appendTo(document.body);

    var tpl = '<div class="weui-toast ' + className + '" id="'+ toastId +'">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.show();
    dialog.addClass("weui-toast--visible");
  };

  var hide = function(id, callback) {
    var maskId = id ? ('#weui-toast-mask-' + id) : '';
    var toastId = id ? ('#weui-toast-' + id) : '';
    $(maskId || ".weui-mask_transparent").remove();
    $(toastId || ".weui-toast--visible").removeClass("weui-toast--visible").transitionEnd(function() {
      var $this = $(this);
      $this.remove();
      callback && callback($this);
    });
  }

  $.toast = function(text, style, callback) {
    var duration = 2500;
    if(typeof style === "function") {
      callback = style;
    }
    if(typeof style === "number") {
      duration = style;
      style = "text";
    }
    var id = indexId++;
    var className, iconClassName = 'weui-icon-success-no-circle';
    var mask = true;
    if(style === "cancel") {
      className = "weui-toast_cancel";
      iconClassName = 'weui-icon-cancel'
    } else if(style === "forbidden") {
      className = "weui-toast--forbidden";
      iconClassName = 'weui-icon-warn'
    } else if(!style || style === "text") {
      className = "weui-toast--text";
      mask = false;
    }
    show('<i class="' + iconClassName + ' weui-icon_toast"></i><p class="weui-toast_content">' + (text || "已经完成") + '</p>', className, id, mask);

    setTimeout(function() {
      hide(id, callback);
    }, duration);
  }

  $.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    html += '<i class="weui-loading weui-icon_toast"></i>';
    html += '</div>';
    html += '<p class="weui-toast_content">' + (text || "数据加载中") + '</p>';
    hide();
    show(html, 'weui_loading_toast', null, true);
  }

  $.hideLoading = function() {
    hide();
  }


}($);
