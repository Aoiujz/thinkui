;(function(){
	$.fn.placeholder = function(color){
		return this.each(function(){
			var self = $(this);
			//设置默认颜色值
			var _color = color || $(this).css('color');
			//获取提示文本值
			var _value = self.attr('placeholder');
			//移除placeholder属性
			this.removeAttribute('placeholder');
			//创建提示信息元素
			var _holder = $('<b style="font-weight: 200;">'+_value+'</b>');
			//给提示元素绑定当前元素默认样式
			var css = self.css(['color','font-family','font-weight','font-style','font-size']);
			css.opacity=.6;
			_holder.css(css);
			//创建HTML元素并将当前节点插入进去
			var _parent = $('<span style="display:inline-block;"></span>');
			self.after(_parent).appendTo(_parent);
			//设置必须样式
			var _pos = _parent.css('position');
			if(_pos == "" || _pos=="static"){
				_parent.css('position','relative');
			}
			//计算提示元素相对label元素的坐标值
			var _mt = self.offset().top - _parent.offset().top;
			var _ml = self.offset().left - _parent.offset().left + parseInt(self.css('padding-left')) + parseInt(self.css('border-left-width'));
			//检测元素是否存在值
			self.val() != '' && _holder.hide();
			//附加提示文本元素样式
			_holder.css({
				'position' : 'absolute',
				'color' : _color,
				'line-height' : self.outerHeight()+'px',
				'left' : _ml,
				'top' : _mt
			});
			//将提示元素添加到父元素中
			_parent.append(_holder);
			//元素获取焦点时隐藏提示信息
			self.keydown(function(){
				_holder.hide();
			});
			//元素失去焦点如果值为空则显示提示信息
			self.blur(function(){
				self.val() == '' && _holder.show();
			});
			//点击提示文本元素响应当前元素获取焦点事件
			$(_holder).click(function(){
				self.focus();
			});
		});
	}
})(jQuery);