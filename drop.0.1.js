/* drop.js 
 * 
 * Simple drop-dowm menus
*/

;(function($, window, document, undefined){
  $.fn.drop = function(options)
  {
    _this = this;
    options = $.extend({}, dropDefaults, options);
    return function(all){
      all.each(function(){
        $this = $(this);
        $this.addClass('drop');

        //If list is displayed veritcally, add extra left padding to all sub-menus
        if($this.hasClass('vertical'))
        {
          $('li', $this).find('ul').addClass('nested sub-menu');
        } else {
          $('li ul', $this).addClass('nested').find('ul').addClass('sub-menu');
        }
        if(options.trigger === 'hover')
        {
          $('li', $this).on('mouseenter', function(event){
            _show(event);
          })
          .on('mouseleave', function(event){
            _hide(event);
          });
        } 
        else if(options.trigger === 'click')
        {
          $('li',$this).on('click', function(event){
            event.stopPropagation();
            event.preventDefault();
            $target = $(event.currentTarget);
            $sub = $target.children('ul').first();
            if($sub.is(':visible'))
            {
              _hide(event, $target, $sub);
            } else {
              _show(event, $target, $sub);
            }
          });
        }
      });
      options.initCallback.call();
    }(_this);

    function _show(event, target, sub){
      $target = target || $(event.currentTarget);
      $sub = sub || $target.children('ul').first();
      switch(options.animation)
      {
        case 'slide':
          $sub.stop(false, true).delay(options.delayIn).animate({height: 'toggle'}, options.speedIn, options.easing, options.showCallback);
          break;
        case 'fade':
          $sub.stop(false, true).delay(options.delayIn).animate({opacity: 'toggle'}, options.speedIn, options.easing, options.showCallback);
          break;
        case 'grow':
          $sub.stop(false, true).delay(options.delayIn).show(options.speedIn, options.easing, options.showCallback);
          break;
        case 'none':
          $sub.delay(options.delayIn).show(0, options.showCallback);
          break;
        default:
          $sub.delay(options.delayIn).show(0, options.showCallback);
          break;
      }
      options.showCallback.call();
    }

    function _hide(event, target, sub)
    {
      $target = target || $(event.currentTarget);
      $sub = sub || $target.children('ul').first();
      switch(options.animation)
      {
        case 'slide':
          $sub.stop(true, true).delay(options.delayOut).animate({height: 'toggle'}, options.speedIn, options.easing, options.hideCallback);
          break;
        case 'fade':
          $sub.stop(true, true).delay(options.delayOut).animate({opacity: 'toggle'}, options.speedIn, options.easing, options.hideCallback);
          break;
        case 'grow':
          $sub.stop(true, true).delay(options.delayOut).hide(options.speedOut, options.easing, options.hideCallback);
          break;
        case 'none':
          $sub.delay(options.delayOut).hide(0, options.hideCallback);
          break;
        default:
          $sub.delay(options.delayOut).hide(0, options.hideCallback);
          break;
      }
      options.hideCallback.call();
    }
  };

  var dropDefaults = {
    trigger: "hover",
    animation: 'slide', /* none, slide, fade, grow */
    easing: 'swing', /* swing, linear, bounce */
    speedIn: 400,
    speedOut: 400,
    delayIn: 0,
    delayOut: 0,
    initCallback: function(){},
    showCallback: function(){},
    hideCallback: function(){}
  };

})(jQuery, window, document);