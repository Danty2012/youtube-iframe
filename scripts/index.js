/**
	 * @class oppaVideo
	 * @properties config
	 * @methods createVideo, destroyVideo
	 * 
	**/
	var oppaVideo = {
		config: {
				iframe: '',
				iframeStyle: '',
				btnCreate: '',
				btnDestroy: '',
				fnCreate: '',
				containerStyle: 'position: fixed; top:0; left:0; background: #000;',
				btnDestroyStyle: 'display: block; position: fixed; z-index: 10; top: 0; height: 100px; width: 120px; right: 0; background: #fff',
				fullScreen: ''
		},

		/**
		 * @method createVideo
		 * @params btnCreate, idVideo, container, btnDestroy, config
		 *
		**/
		createVideo : function(btnCreate, idVideo, container, btnDestroy, config){
			var	doc = document, 
				iframeYt = doc.createElement('iframe'),
				elBtnDestroy = doc.createElement('a'),
				container = doc.getElementById(container),
				elDestroy,
				screenHeight = window.innerHeight,
				screenWidth = window.innerWidth,
				fullScreenHeight = window.screen.height,
				fullScreenWidth = window.screen.width,
				config = config,
				btnDestroyStyle = config.btnDestroyStyle || oppaVideo.config.btnDestroyStyle;

			iframeYt.id = 'ytplayer';
			iframeYt.type = 'text/html'
			iframeYt.src = "https://www.youtube.com/embed/"+idVideo+"?controls=0&html5=1&autoplay=1";
			iframeYt.frameborder = 0;
			iframeYt.allowfullscreen = "";	

			elBtnDestroy.href = '';
			elBtnDestroy.onclick = 'return false';
			elBtnDestroy.textContent = 'remover video';
			elBtnDestroy.id = btnDestroy;

			oppaVideo.config.iframe = iframeYt.id;
			oppaVideo.config.btnCreate = btnCreate.id;
			oppaVideo.config.btnDestroy = elBtnDestroy.id;
			oppaVideo.config.fnCreate = btnCreate.onclick;

			btnCreate.setAttribute('disabled', 'disabled');
			btnCreate.setAttribute('onclick', 'return false');
			btnCreate.setAttribute('class', 'activeVideo')
			container.appendChild(iframeYt);
			container.appendChild(elBtnDestroy);

			elBtnDestroy.setAttribute('style', btnDestroyStyle);
			container.setAttribute('style', oppaVideo.config.containerStyle);

			//Begin: fullscreen
			if(config.fullScreen){
				//Begin: style
				container.style.height = fullScreenWidth + 'px';
				container.style.width = '100%';

				iframeYt.style.border = 'none';
				iframeYt.style.height = fullScreenHeight + 'px';
				iframeYt.style.width = fullScreenWidth + 'px';
				//End: style

				if (container.requestFullscreen) {
				  container.requestFullscreen();
				} else if (container.msRequestFullscreen) {
				  container.msRequestFullscreen();
				} else if (container.mozRequestFullScreen) {
				  container.mozRequestFullScreen();
				} else if (container.webkitRequestFullscreen) {
				  container.webkitRequestFullscreen();
				}
			} else {
				//Begin: style
				container.setAttribute('style', containerStyle);
				iframeYt.setAttribute('style', iframeStyle);
				//End: style
			}
			//End: fullscreen
			
			/**
			 * listener para a remoção do iframe de video
			**/
			elBtnDestroy.addEventListener("click", oppaVideo.destroyVideo, false);
		},
		/**
		 * @method destroyVideo
		**/
		destroyVideo: function(){
			var doc = document,
				child = doc.getElementById(oppaVideo.config.iframe),
				btn = doc.getElementById(oppaVideo.config.btnDestroy);
			
			btn.parentNode.removeChild(btn);
			child.parentNode.removeChild(child);

			doc.getElementById(oppaVideo.config.btnCreate).setAttribute('disabled', 'disabled');
			doc.getElementById(oppaVideo.config.btnCreate).setAttribute('onclick', 'return false');
		}
	};


/**
 * listener para a criação do iframe de video
**/
document.getElementById('createVideo').addEventListener('click', function(){
		oppaVideo.createVideo(this, 'IVHW4wx6R9A', 'containerVideo', 'removeVideo', 
			{
				fullScreen: true
			});
		}, false );


document.getElementById('createVideo2').addEventListener('click', function(){
		oppaVideo.createVideo(this, 'IVHW4wx6R9A', 'containerVideo', 'removeVideo', 
			{
				fullScreen: false,
				containerStyle: 'width: 400px; height: 300px; display: block; position: relative; margin: 0 auto;',
				iframeStyle: 'width: 400px; height: 300px; display: block; position: relative',
				btnDestroyStyle: 'display: block; position: absolute; z-index: 10; top: 0; height: 70px; width: 50px; right: 0; background: #fff'
			});
		}, false );
