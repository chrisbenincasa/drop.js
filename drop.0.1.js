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
        $this = $(this),
        memory = {};

        if(options.customClass.length > 0)
        {
          $this.addClass(customClass);
        } else {
          $this.addClass('drop');
        }

        $('li', $this).each(function(index, ele){
          if(($(ele).index() + 1) % 2 == 0)
          {
            if(options.customEvenClass.length > 0) $(ele).addClass(customEvenClass);
            else $(ele).addClass('even');  
          } else {
            if(options.customOddClass.length > 0) $(ele).addClass(customOddClass);
            else $(ele).addClass('odd');
          }
        });

        /*height fix*/
        var listHeight = $(this).find('li:first-child').outerHeight();
        $(this).css('height', listHeight);

        //If list is displayed veritcally, add extra left padding to all sub-menus
        if($this.hasClass('vertical') || options.orientation == 'vertical')
        {
          $('li', $this).find('ul').addClass('nested sub-menu');
        } else {
          $('li ul', $this).addClass('nested').find('ul').addClass('sub-menu');
        }
        if(options.trigger === 'hover')
        {
          //Clear the memory after styles are reset
          //To-do: think of better solution
          $this.children('li').on('mouseleave', function(){
            setTimeout(function(){
              for(x in memory)
              {
                delete memory[x];
              }
            }, options.speedIn * 2);
          });

          $('li', $this).on('mouseenter', function(event){
            if(_hasSubMenu($(this)))
            {
              if(!memory[$(this)])
              {
                memory[$(this)] = $(this).clone();  
              }

              if(options.orientation === 'horizontal')
              {
                $(this).addClass('active_menu').css({
                  'border-bottom-left-radius' : '0px',
                  'border-bottom-right-radius': '0px'
                });
              } else {
                $(this).addClass('active_menu').css({
                  'border-top-left-radius' : '0px',
                  'border-top-right-radius': '0px'
                });
              }
              
              _show(event);
            }
            
          })
          .on('mouseleave', function(event){
            $currentLi = $(this);
            //console.log('out on ', $currentLi)
            _hide(event);
            setTimeout(function(){
              $currentLi.css({
                'border-bottom-left-radius': memory[$currentLi].css('border-bottom-left-radius'),
                'border-bottom-right-radius': memory[$currentLi].css('border-bottom-right-radius'),
                'border-top-left-radius': memory[$currentLi].css('border-top-left-radius'),
                'border-top-right-radius': memory[$currentLi].css('border-top-right-radius')
              });
              $currentLi.add($currentLi.find('li')).removeClass('active_menu');
            }, options.speedIn + 10);
            
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

    function _hasSubMenu(li)
    {
      return (li.children('ul').length > 0) ? true : false;
    }

    function _show(event, target, sub){
      $target = target || $(event.currentTarget);
      $sub = sub || $target.children('ul').first();
      switch(options.animation)
      {
        case 'slide':
          $sub.stop(false, true).delay(options.delayIn).animate({height: 'toggle'}, options.speedIn, options.easingIn, options.showCallback);
          break;
        case 'fade':
          $sub.stop(false, true).delay(options.delayIn).animate({opacity: 'toggle'}, options.speedIn, options.easingIn, options.showCallback);
          break;
        case 'grow':
          $sub.stop(false, true).delay(options.delayIn).show(options.speedIn, options.easingIn, options.showCallback);
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
          $sub.stop(true, true).delay(options.delayOut).animate({height: 'toggle'}, options.speedIn, options.easingOut, options.hideCallback);
          break;
        case 'fade':
          $sub.stop(true, true).delay(options.delayOut).animate({opacity: 'toggle'}, options.speedIn, options.easingOut, options.hideCallback);
          break;
        case 'grow':
          $sub.stop(true, true).delay(options.delayOut).hide(options.speedOut, options.easingOut, options.hideCallback);
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
    trigger         : "hover", /* experimental */
    animation       : 'slide', /* none, slide, fade, grow */
    speedIn         : 400,
    speedOut        : 400,
    easingIn        : 'swing',
    easingOut       : 'swing',
    delayIn         : 0,
    delayOut        : 0,
    customClass     : '',
    customEvenClass : '',
    customOddClass  : '',
    orientation     : 'horizontal',
    initCallback: function(){},
    showCallback: function(){},
    hideCallback: function(){}
  };

})(jQuery, window, document);