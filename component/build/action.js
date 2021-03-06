(function(){
/*===================filePath:[cssloader_placeholder]======================*/
var importStyle = function (){
  var RE_NON_WORD = /\W/g;
  var doc = document;
  var head = document.getElementsByTagName('head')[0] ||
      document.documentElement;
  var styleNode;
  /**
   * import css string to docuemnt
   * @param  {[type]} cssText [description]
   * @param  {[type]} id      [description]
   * @return {[type]}         [description]
   */
  return function(cssText, id) {
    if (id) {
      // Convert id to valid string
      id = id.replace(RE_NON_WORD, '-');

      // Don't add multiple times
      if (doc.getElementById(id)) return;
    }

    var element;

    // Don't share styleNode when id is spectied
    if (!styleNode || id) {
      element = doc.createElement('style');
      id && (element.id = id);

      // Adds to DOM first to avoid the css hack invalid
      head.appendChild(element);
    } else {
      element = styleNode;
    }

   
    element.appendChild(doc.createTextNode(cssText));

    if (!id) {
      styleNode = element;
    }
  }
}();
/*===================filePath:[src/main/action/action.css]======================*/
importStyle('.mo-pop-action{padding: 20px;background-color: rgba(255,255,255,0.9);}\
[class*="mo-btn-"]{margin: 15px 0;padding: 8px 15px;font-weight: bold;border-radius: 5px; }\
.mo-pop-action .mo-pop-foot > div:last-child{margin-bottom: 0;} \
.mo-btn-strong{background: #d00;color: #fff;}\
.mo-btn-normal{background: #ddd;color: #333;}\
.mo-btn-weak{background: #888;color: #fff;}\
.mo-pop-action{border-radius: 0;}');
/*===================filePath:[src/main/motion/motion.js]======================*/
/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-06-13
 * @description tg核心功能
 * @example
		var tab1 = new mo.Tab({
			target: $('#slide01 li')
		}); 
 * @name mo
 * @namespace
 */
(function(){

	(function(){
		
		if(window.Motion) {
			return;
		}

		var Motion = /** @lends mo */{
			/**
			 * tg版本号
			 * @type {string}
			 */
			version: '1.1',

			/**
			 * 命令空间管理 eg. Motion.add('mo.Slide:mo.Tab', function(){})
			 * @param {string} name 
			 * @param {object} obj 
			 */

			add: function(name, obj){
				var target = window;
				var me = arguments.callee;
				var parent = null;
				var isMatch = /^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(name);
				var objNS = RegExp.$1.split('.');
				var parentNS = RegExp.$2.split('.');
				var name = objNS.pop();
				var isClass = /[A-Z]/.test(name.substr(0,1));
				var constructor = function(){
					var mainFn = arguments.callee.prototype.init;
					if (typeof(mainFn) == 'function' && arguments.callee.caller != me) {
						mainFn && mainFn.apply(this, arguments);
					}
				};

				for(var i = 0; i < objNS.length; i++) {
					var p = objNS[i];
					target = target[p] || (target[p] = {});
				}

				if (parentNS[0] != '') {
					parent = window;
					for (var i = 0; i < parentNS.length; i ++) {
						parent = parent[parentNS[i]];
						if(!parent) {
							parent = null;
							break;
						}
					}
				}


				if(isClass && typeof(obj) == 'function') {
					if(parent) {
						constructor.prototype = new parent();
						constructor.prototype.superClass = parent;
					} 
					target[name] = constructor;
					constructor.prototype.constructor = constructor;
					obj.call(target[name].prototype);
				} else {
					target[name] = obj;
				}

			}

		};

		window.Motion = window.mo = Motion;
	})();

})();
/*===================filePath:[src/main/base/base.js]======================*/
/**
 * @version 1.0
 * @date 2014-06-15
 * @description mo
 * @name mo
 * @namespace
*/

/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-06-18
 * @description 基础类
 * @name mo.Base
 * @class
*/
(function(){
	
	
	Motion.add('mo.Base', function() {
		/**
		 * public 作用域
		 * @alias mo.Base#
		 * @ignore
		 */
		var _public = this;
		/**
		 * public static作用域
		 * @alias mo.Base.
		 * @ignore
		 */
		var _static = this.constructor;
		/**
		 * private static作用域
		 * @alias mo.Base~
		 * @ignore
		 */
		var _self = {};
		/**
		 * 构造函数
		 */
		_public.constructor = function() {
			// private作用域
			var _private = {};
		};


		/**
		 * 绑定事件
		 */
		
		_public.on = function(name, fn) {
			box = Zepto(this);
			return box.on.apply(box, arguments);
		};


		/**
		 * 绑定事件
		 */
		_public.off = function(name, fn) {
			box = Zepto(this);
			return box.off.apply(box, arguments);
		};

		/**
		 * 触发事件
		 */
		_public.trigger = function(name, data) {
			var box = Zepto(this);
			return box.triggerHandler.apply(box, arguments);
		};

		

	});

})();
/*===================filePath:[src/main/overlay/overlay.css]======================*/
importStyle('.mo-pop-wrap{z-index: 1000;}\
.mo-pop{border-radius: 3px; -webkit-box-sizing: border-box;box-sizing: border-box;padding:10px; background-color: #fff;text-align: center;font-size: 14px;}');
/*===================filePath:[src/main/overlay/overlay.js]======================*/
/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-10-02
 * @description 基础浮层
 * @extends mo.Base
 * @name mo.Overlay
 * @requires lib/zepto.js
 * @requires src/base.js
 * @param {boolean} [config.mask=true] 是否有蒙板
 * @param {boolean} [config.autoOpen=true] 是否自动打开对话框
 * @param {array} [ config.pos=&#91;'middle'&#93; ] 设置overlay打开位置
 * @param {string} [config.className='pop***'] 自定义class方便控制样式
 * @param {boolean} [config.buttons=['normal']] 操作按钮，如自定义文本{'text': '放弃'}
 * @param {object} [config.start= {'opacity': 0,'-webkit-transform': 'rotateX(-90deg)','-webkit-transform-origin': '50% 0'}] 打开弹窗时起始状态
 * @param {object} [config.end={'opacity': 1,'-webkit-transform': 'rotateX(0)','-webkit-transform-origin': '50% 0'}] 打开弹窗时结束状态
 * @param {number} [config.duration=150] 动画时间，可设为0关闭动画
 * @param {string} [config.content=''] overlay内容
 * @param {string|number} [config.width='300'] overlay宽度
 * @param {string|number} [config.height='auto'] overlay高度
 * @param {string} [config.tpl='$_private.tpl.base'] 弹窗模板
 * @example
		var overlay1 = new mo.Overlay('数据提交成功！');
 * @see overlay/demo1.html 普通浮层
 * @see overlay/demo2.html 自定义效果
 * @see overlay/demo3.html 自定义位置
 * @class
*/
(function(){
	
	

	Motion.add('mo.Overlay:mo.Base', function() {

		/**
		 * public 作用域
		 * @alias mo.Overlay#
		 * @ignore
		 */
		var _public = this;

		var _private = {};

		/**
		 * public static作用域
		 * @alias mo.Overlay.
		 * @ignore
		 */
		// var _static = arguments.callee;
		var _static = this.constructor;

		var win = window.top;
		var doc = Zepto(win.document);
		

		win = Zepto(win);		

		// 查找模板中相应元素的标识
		_private.CLOSE = 'mo-pop-close';
		_private.BODY = 'mo-pop-body';
		_private.FOOT = 'mo-pop-foot';

		// 模板
		_private.tpl = '\
			<div class="mo-pop">\
				<button class="mo-pop-close" type="button" title="关闭弹出层">关闭</button>\
				<div class="mo-pop-body"></div>\
				<div class="mo-pop-foot"></div>\
			</div>';
		

		// 插件默认配置
		_static.config = {
			mask: true, // 是否有蒙板
			autoOpen: true, // 是否自动打开overlay
			hasClose: false, // 是否有关闭按钮
			hasFoot: true, // 是否有底部
			effect: true, // 是否启用过渡效果
			offset:[0, 0], // 设置位置偏移
			valign: 'middle', // 设置overlay坐标
			className: 'pop' + parseInt(1000*Math.random()), // 自定义class方便控制样式
			// destroy: true, // 关闭后是否将DOM移除
			//bind: //绑定某个元素


			// 设置初始状态
			start: {
				'opacity': 0,
				// 'transform': 'rotateX(90deg)',
				'-webkit-transform': 'rotateX(-90deg)',
				'-webkit-transform-origin': '50% 0'
			},

			// 设置结束状态
			end: {
				'opacity': 1,
				// 'transform': 'rotateX(0)'
				'-webkit-transform': 'rotateX(0)',
				'-webkit-transform-origin': '50% 0'
			},

			duration : 800,
			easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
			
			content: '', // overlay内容

			width: 300,
			height: 'auto',
			
			tpl: _private.tpl
		};


		/***
		 * 初始化
		 * @description 参数处理
		 */
		_public.init = function(config){
			if(typeof config == 'string') {
				config = {content: config};
			}
			this.config = Zepto.extend({}, _static.config, config); // 参数接收

			var self = this;
			var config = self.config;

			// 参数处理
				// 如果弹窗位置是follow某元素
				// if(!Zepto.isArray(config.pos)){
				// 	var followElem = Zepto(config.pos);
				// 	if(followElem.length > 0) {
				// 		config.pos = followElem;
				// 		config.follow = true;
				// 	} else {
				// 		config.pos = _static.config.pos;
				// 	}
				// }

			// 自定义事件绑定
			self.event && self.on(self.event);
			config.event && self.on(config.event);


			// 创建结构
			_private.create.call(self);


			// 填充内容
			_private.fill.call(self);
	
			// 绑定事件
			_private.attach.call(self);

			// 设置样式获取样式
			_private.render.call(self);


			/**
			 * @event mo.Overlay#init
			 * @property {object} event 开始初始化
			 */
			self.trigger('init'); 

			if(self.config.autoOpen) {
				window.setTimeout(function(){
					self.open();
				}, 0);
			}

		};

		// 创建结构
		_private.create = function(){
			var body = doc.find('body');
			/**
			 * @alias mo.Overlay#
			 * @ignore
			 */
			var self = this;

			var config = self.config;

			// 是否为页面中特制模板
			var isCustom = Zepto.type(self.config.tpl) !== 'string';

			// 创建overlay
			/**
			 * 存储弹窗dom引用(dom.box, dom.head, dom.body, dom.foot. dom.close)
			 * @type {Object}
			 */
			self.dom = {} // 存储弹窗dom引用


			// 创建wrap
			self.dom.wrap = Zepto('<div class="mo-pop-wrap"></div>').prependTo(body);

			self.dom.wrap.css({
				'display': 'block',
				'position': 'fixed',
				'top': 0,
				'left': 0,
				'pointer-events': 'none',
				'width': win.width() + 'px',
				'height': win.height() + 'px',
				'overflow': 'hidden',
				'perspective': '1000px',
				'-webkit-perspective': '1000px',
				'-webkit-backface-visibility': 'hidden;'
			});


			// 添加蒙板
			self.dom.mask = Zepto('<div class="mo-pop-mask"></div>').prependTo(self.dom.wrap);
			self.dom.mask.css({
				'display': 'none',
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'width': '100%',
				'height': '9999px',
				'background': '#000',
				'opacity': 0.5,
				'pointer-events': 'auto',
				'zIndex': 999
			});

			self.dom.box = Zepto(self.config.tpl).clone().prependTo(self.dom.wrap);
			self.dom.box.addClass(config.className);

			// for 屏幕阅读器
			self.dom.box.attr('role', 'dialog');
			self.dom.box.attr('aria-label', config.title);

			self.dom.head = self.dom.box.find('.' + _private.HEAD);
			self.dom.close = self.dom.box.find('.' + _private.CLOSE);
			self.dom.body = self.dom.box.find('.' + _private.BODY);
			self.dom.foot = self.dom.box.find('.' + _private.FOOT);

			// 检测前缀
			self.cssPrefix = '';
			self.propPrefix = '';
			var vendors = {'webkit': 'webkit', 'Moz': 'moz', 'ms': 'ms'};
			var testElem = document.createElement('div');
			for(var key in vendors) {
				if (testElem.style[key + 'Transform'] !== undefined) {
					self.cssPrefix = '-' + vendors[key] + '-';
					self.propPrefix = key;
					break;
				}
			}

		};

		// 填充overlay内容
		_private.fill = function(){
			var self = this;
			var config = self.config;

			_private.fillHead.call(self, config.title); 
			_private.fillBody.call(self, config.content); 
			// _private.fillFoot.call(self, config.buttons); 
		};

		// 填充头部
		_private.fillHead = function(title){
			var config = this.config;
			var tpl = this.dom.head.html();
			var html = '';

			if(tpl) {
				html = _static.parseTPL({'title': title}, tpl);
			}
			this.dom.head.html(html);
		}

		// 填充主体
		_private.fillBody = function(content){
			var self = this;
			var config = self.config;

			// 判断内容类型
			var regURL = /^http:\/\/[\w-./?%&=\u4e00-\u9fa5]+$/i; //非严格检测
			var contentType = config.contentType;
			if(contentType === undefined && content !== '') {
				if(typeof content === 'object' && Zepto(content).length > 0) {
					contentType = 'element';
				} else if(typeof content === 'string') {
					contentType = regURL.test(content) ? 'url' : 'string';
				}
			}
			if(contentType === 'element'){
				Zepto(content).clone().appendTo(self.dom.body).show();
				return;
			}

			// 填充内容
			if(contentType === 'url') {
				content = '<iframe src="'+ content+'" frameborder="0" style="width:100%;height:100%;overflow:hidden;"></iframe>';
				self.dom.body.html(content);
			} else {
				self.dom.body.html(content);
			}

			self.contentType = contentType;

		};

		// 绑定事件
		_private.attach = function(){
			var self = this;
			var config = self.config;

			// 缩放窗口
			win.on('resize', function(){
				window.clearTimeout(self.resizeTimer);
				self.resizeTimer = window.setTimeout(function(){
					_private.updatePos.call(self);
					self.dom.box.css(self._startProp);
					if(self.opened) self.dom.box.css(self._endProp);
					self.dom.wrap.css({'width': win.width(), 'height': win.height()});
				}, 50);
			});

			// 关闭按钮
			self.dom.close.on('touchend', function(e){
				_public.close.call(self);
				e.stopPropagation();
			});

			self.dom.mask.on('touchmove', function(e){
				e.stopPropagation();
				e.preventDefault();
			});

			self.dom.box.on('touchmove', function(e){
				e.stopPropagation();
				e.preventDefault();
			});

			self.dom.mask.on('touchstart', function(){
				self.dom.box.css('opacity', 0.8);
			});			

			self.dom.mask.on('touchend', function(){
				self.dom.box.css('opacity', 1);
			});

		};


		// 计算pop开始与结束的位置
		_private.updatePos = function(){
			var self = this;
			var config = self.config;
			var startPos = {};
			var endPos = {}; 

			// 如果是绝对定位，则需要加上scrollTop && scrollLeft
			var leftPlus = 0, topPlus = 0;
			// if(!config.fixed) {
			// 	leftPlus = doc.scrollLeft();
			// 	topPlus = doc.scrollTop();
			// }

			// 如果是相对元素定位	
			if(config.follow === true) {
				var elemOffset = config.pos.offset();
				var iframeX = 0, iframeY = 0;
				if(window.frameElement) {
					var iframeOffset = Zepto(window.frameElement).offset();
					iframeX = iframeOffset.left;
					iframeY = iframeOffset.top;
				}
				endPos.left = elemOffset.left + iframeX;
				endPos.top = elemOffset.top + iframeY + config.pos.outerHeight();
			} 
			// 如果是相对页面定位
			else {
				startPos.left = endPos.left = (win.width() - self.dom.box[0].offsetWidth)/2;
				var boxHeight = self.dom.box[0].offsetHeight;
				switch (config.valign) { 
					case 'top':
						startPos.top = 0;
						endPos.top = 0;
						break; 
					case 'bottom':
						startPos.top = win.height();
						endPos.top = win.height() - boxHeight;
						break; 
					case 'middle':
						startPos.top = - boxHeight;
						endPos.top = (win.height() - boxHeight)/2;
						break; 
				} 
				startPos.left += leftPlus;
				startPos.top += topPlus;
				endPos.left += leftPlus;
				endPos.top += topPlus;
			}



			// 计算偏移值
			startPos.left += config.offset[0];
			startPos.top += config.offset[1];	
			endPos.left += config.offset[0];
			endPos.top += config.offset[1];	

			if(config.effect) {
				self._startProp = Zepto.extend({}, startPos, config.start);
				self._endProp = Zepto.extend({}, endPos, config.end);
				// console.dir(config.end);
				// self._startProp[self.cssPrefix + 'transform'] = 

			}

			

			
			//self.dom.box.css('left', 0)
		};


		/**
		 * 打开浮层
		 */
		_public.open = function(){

			var self = this;
			var config = self.config;

			self.dom.box.css('display', 'block');

			_private.updatePos.call(self);
			/**
			 * @event mo.Overlay#beforeopen:初始化完成
			 * @property {object} event 事件对象
			 */
			if(self.trigger('beforeopen') === false) {
				return;
			}

			window.setTimeout(function(){ 

				self.dom.box.animate(self._endProp, config.duration , config.easing , function(){
					/**
					 * @event mo.Overlay#open:关闭窗口时
					 * @property {object} event 事件对象
					 */
					self.trigger('open');
					

				});	
			},0);
			
			self.opened = true;
			if(self.opened && config.mask) {
				self.dom.mask.fadeIn(0);
			}
		};

		
		/**
		 * 关闭弹窗
		 */
		_public.close = function(){
			var self = this;
			var config = self.config;

			/**
			 * @event mo.Overlay#beforeclose:初始化完成
			 * @property {object} event 事件对象
			 */
			if(self.trigger('beforeclose') === false) {
				return;
			}

			// self.dom.box.css('border', 0);
			self.dom.box.animate(self._startProp, config.duration, config.easing, function(){			
				self.opened = false;
				self.dom.wrap.remove();

				/**
				 * @event mo.Overlay#close:关闭窗口时
				 * @property {object} event 事件对象
				 */
				self.trigger('close');
				

			});	
			
				

		};

		// 设置样式获取样式
		_private.render = function(){
			var self = this;
			var config = self.config;

			if(!config.hasHead) {
				self.dom.head.remove();
			}
			if(!config.hasClose) {
				self.dom.close.remove();
			}
			if(!config.hasFoot) {
				self.dom.foot.remove();
			}

			self.dom.box.css({
				'position': 'fixed', 
				'top': -1000, 
				'left':0, 
				'width': config.width, 
				'height': config.height,
				'pointer-events': 'auto',
				'overflow': 'visible',
				'zIndex': 1000
			});

			//self.dom.body.css('height', config.height);
			
			// 初始化起始点


			_private.updatePos.call(self);

			self.dom.box.css(self._startProp);

			
			self.dom.box.hide();
			
			// if(self.bind) {}


							
		};

		// 解析模板
		_static.parseTPL = function(data, tpl){
			for(var key in data) {
				tpl = tpl.replace('{' + key + '}', data[key]);
			}
			return tpl;
		};



	});
})();
/*===================filePath:[src/main/action/action.js]======================*/
/**
 * @author Brucewan
 * @version 1.0
 * @date 2014-10-04
 * @description 对话框
 * @extends mo.Overlay
 * @name mo.Action
 * @requires lib/zepto.js
 * @requires src/base.js
 * @param {boolean} [config.mask=true] 是否有蒙板
 * @param {boolean} [config.autoOpen=true] 是否自动打开对话框
 * @param {array} [ config.pos=&#91;'middle'&#93; ] 设置action打开位置
 * @param {string} [config.className='pop***'] 自定义class方便控制样式
 * @param {boolean} [config.buttons=['normal']] 操作按钮，如自定义文本{'text': '放弃'}
 * @param {object} [config.start= {}] 打开弹窗时起始状态
 * @param {object} [config.end={}] 打开弹窗时结束状态
 * @param {number} [config.duration=150] 动画时间，可设为0关闭动画
 * @param {string} [config.content=''] action内容
 * @param {string|number} [config.width='100%'] action宽度
 * @param {string|number} [config.height='auto'] overlay高度
 * @param {string} [config.type='alert'] action类型，[alert, success, error, none可选]
 * @param {string} [config.tpl=''] 弹窗模板
 * @example
		var action1 = new mo.Action('数据提交成功！');
 * @see action/demo1.html 普通ActionSheet
 * @see action/demo2.html 自定义buttons
 * @see action/demo3.html 自定义buttons高级使用
 * @class
*/
(function(){
	
	
	
	Motion.add('mo.Action:mo.Overlay', function() {

		/**
		 * public 作用域
		 * @alias mo.Action#
		 * @ignore
		 */
		var _public = this;

		var _private = {};

		/**
		 * public static作用域
		 * @alias mo.Action.
		 * @ignore
		 */
		var _static = this.constructor;

		// 插件默认配置
		_static.config = {
			tpl: '\
			<div class="mo-pop mo-pop-action">\
				<button class="mo-pop-close" type="button" title="关闭弹出层">关闭</button>\
				<div class="mo-pop-body"></div>\
				<div class="mo-pop-foot"></div>\
			</div>',
			type: 'alert',
			buttons: ['确定', '取消'],
			valign: 'bottom',
			// 设置初始状态
			start: {
			},

			// 设置结束状态
			end: {
			},
			width: '100%'
		};

		// 模板
		_private.tpl = {
			button: '<div class="{class}"><span>{text}</span></div>'
		};

		// 默认按钮类型
		_private.buttonType = {
			'normal': {
				'text': '确定',
				'className': 'mo-btn-normal',
				'callback': function(){
					_public.close.call(this);
				}
			},
			'strong': {
				'text': '确定',
				'className': 'mo-btn-strong',
				'callback': function(){
					_public.close.call(this);
				}
			},
			'weak': {
				'text': '取消',
				'className': 'mo-btn-weak',
				'callback': function(){
					_public.close.call(this);
				}
			}
		};


		/***
		 * 初始化
		 * @description 参数处理
		 */
		_public.init = function(config){
			if(typeof config == 'string') {
				config = {content: config};
			}
			this.config = Zepto.extend(true, {}, _static.config, config); // 参数接收
			var self = this;	
			var config = self.config;

			_private.handleConfig.call(self);

			// 初始化父类
			self.superClass.call(self, config);



			_private.fillFoot.call(self);

			

		};

		_private.handleConfig = function(){

		};


		_private.fillFoot = function(){
			var self =this;
			var config = self.config;
			var buttons = config.buttons;
			// 填充按钮		
			self.buttons = [];
			self.dom.foot.empty();
			if (self.dom.foot.length > 0) {
				for (var i =  0; i < buttons.length; i++) {
					var domButton;
					var button =buttons[i];

					// 如果只是传入按钮类型
					if (typeof button === 'string') {
						var buttonType = 'normal';
						if(i == buttons.length - 1) {
							buttonType = 'weak';
						}
						if(i == 0) {
							buttonType = 'strong';
						}
						button = Zepto.extend({}, _private.buttonType[buttonType], {text: button});
						
					}

					if (button) {
						// 取nomal作为默认值
						button = Zepto.extend({}, _private.buttonType['normal'], button);
						domButton = Zepto(_private.tpl.button.replace('{class}', button.className).replace('{text}', button.text));
						domButton[0].moInfo = button;

						domButton.on('touchend', function(e){
							this.moInfo.callback.call(self);
							e.preventDefault();
						});
						
						self.buttons.push(domButton.appendTo(self.dom.foot));
					}

				}
			}	
		}


	});
})();
})();