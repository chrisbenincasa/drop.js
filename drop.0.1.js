/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

jQuery.extend( jQuery.easing,
{
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * 0.5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  }
});

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