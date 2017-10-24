//自定义上拉加载更多
function CustomPullUpLoading(callback) {
	var loadObj = {
		isLoading : false,
		isNoMore : false,
		count : 0,
		obj : $("#MoreBlock"),
		setLoading : function() {
			this.isLoading = true;
			this.obj.html("加载中...");
		},
		setLoaded : function(isAddCount) {
			this.isLoading = false;
			if(isAddCount===true){
			    this.count++;
			}			
			this.obj.html("上拉加载更多");
		},
		setNoMore : function() {
			this.isLoading = false;
			this.isNoMore = true;
			this.obj.html("没有更多数据了");
		},
		init:function(){
		    this.isLoading=false;
		    this.isNoMore=false;
		    this.count=0;
		    this.obj.html("上拉加载更多");
		}
	};

	api.addEventListener({
		name : 'scrolltobottom',
		extra : {
			threshold : 0
		}
	}, function(ret, err) {
		callback(loadObj.isLoading, loadObj);
	});
	
	loadObj.obj.show();
	loadObj.init();
	
	return loadObj
};

//全局方法
var Fun = {
	showProgress : function(msg, title, isNoModal) {
		api.showProgress({
			modal : !(isNoModal===true),
			title : title || '',
			text : msg || ''
		});
	},
	hideProgress : function() {
		api.hideProgress();
	},
	alert : function(msg, title) {
		api.alert({
			title : title || '',
			msg : msg
		}, function(ret, err) {
			//coding...
		});
	},
	toast : function(msg) {
		api.toast({
			msg : msg,
			duration : 2000,
			location : 'middle',
			global : true
		});
	},
	ajaxErrCallBack : function(errObj) {
		var msg = errObj.msg;
		var errorCodeMsg;
		if (msg) {
			switch(parseInt(errObj.code)) {
				case 0:
					errorCodeMsg = "连接错误";
					break;
				case 1:
					errorCodeMsg = "超时";
					break;
				case 2:
					errorCodeMsg = "授权错误";
					break;
				case 3:
					errorCodeMsg = "数据类型错误";
					break;
				default:
					errorCodeMsg = "发生了错误";
					break;
			}
		};
		
		Fun.toast(msg);
		
//		if(errorCodeMsg){
//		    Fun.toast(errorCodeMsg);
//		}
//		
	},
	imageErrorHandle : function(imgSrc) {
		var tempImgSrc = imgSrc || "../image/nopic80x80.gif";
		$("img").error(function() {
			if (!$(this).attr("isreplace")) {
				//添加标识，避免死循环
				$(this).attr("isreplace", true).attr("src", tempImgSrc);
			}
		});
	},
	tap:function(){
	    window.api&&api.parseTapmode();
	}
};

//全局值
var Global = {
	url : {
		liveData : "http://www.310tv.com/data/client/programs.txt",
		changeData : "http://www.310tv.com/data/client/change.txt",
		
        programData:"http://m.310tv.com/ClientApi/Programs/GetProgramInfo.aspx",
		newsListData:"http://m.310tv.com/ClientApi/News/GetNewsList.aspx",
		newsData:"http://m.310tv.com/ClientApi/News/GetNewsInfo.aspx",
		newsPageListData:"http://m.310tv.com/ClientApi/News/GetNewsPageList.aspx",
	    videoListData:"http://m.310tv.com/ClientApi/Video/GetVideoList.aspx",
	    videoData:"http://m.310tv.com/ClientApi/Video/GetVideoInfo.aspx",
	    videoPageListData:"http://m.310tv.com/ClientApi/Video/GetVideoPageList.aspx"
		
		//本地测试地址
//      changeData:"http://192.168.15.27:8011/data/client/change.txt",
//		programData:"http://192.168.15.27:8013/ClientApi/Programs/GetProgramInfo.aspx",
//		newsListData:"http://192.168.15.27:8013/ClientApi/News/GetNewsList.aspx",
//		newsData:"http://192.168.15.27:8013/ClientApi/News/GetNewsInfo.aspx",
//		newsPageListData:"http://192.168.15.27:8013/ClientApi/News/GetNewsPageList.aspx",
//	    videoListData:"http://192.168.15.27:8013/ClientApi/Video/GetVideoList.aspx",
//	    videoData:"http://192.168.15.27:8013/ClientApi/Video/GetVideoInfo.aspx",
//	    videoPageListData:"http://192.168.15.27:8013/ClientApi/Video/GetVideoPageList.aspx"
        
        //线上测试地址
//      changeData : "http://m.310tv.com:1112/data/client/change.txt",
//      programData:"http://m.310tv.com:1113/ClientApi/Programs/GetProgramInfo.aspx",
//		newsListData:"http://m.310tv.com:1113/ClientApi/News/GetNewsList.aspx",
//		newsData:"http://m.310tv.com:1113/ClientApi/News/GetNewsInfo.aspx",
//		newsPageListData:"http://m.310tv.com:1113/ClientApi/News/GetNewsPageList.aspx",
//	    videoListData:"http://m.310tv.com:1113/ClientApi/Video/GetVideoList.aspx",
//	    videoData:"http://m.310tv.com:1113/ClientApi/Video/GetVideoInfo.aspx",
//	    videoPageListData:"http://m.310tv.com:1113/ClientApi/Video/GetVideoPageList.aspx"
	},
	keys : {
		sportsTypeKey : 'sportsType',
		liveStatusKey : 'liveStatus',
		matchListKey : 'matchList',
		attentionListKey : 'attentionList',
		newsListKey: 'newsList',
		videoListKey:'videoList'
	},
	setSportsType : function(val) {
		api.setPrefs({
			key : Global.keys.sportsTypeKey,
			value : val
		});
	},
	getSportsType : function() {
		return api.getPrefs({
			key : Global.keys.sportsTypeKey,
			sync : true
		});
	},
	setLiveStatus : function(val) {
		api.setPrefs({
			key : Global.keys.liveStatusKey,
			value : val
		});
	},
	getLiveStatus : function(val) {
		return api.getPrefs({
			key : Global.keys.liveStatusKey,
			sync : true
		});
	},
	setMatchList : function(val) {
		api.setPrefs({
			key : Global.keys.matchListKey,
			value : val
		});
	},
	getMatchList : function() {
		try {
			return JSON.parse(api.getPrefs({
				key : Global.keys.matchListKey,
				sync : true
			}));
		} catch(e) {
			return [];
		}
	},
	getAttentionIds : function() {
		try {
			return JSON.parse(api.getPrefs({
				key : Global.keys.attentionListKey,
				sync : true
			}));
		} catch(e) {
			return [];
		}
	},
	isExistAttentionId : function(programsId) {
		var isExist = false;
		if (programsId > 0) {
			var attenArray = Global.getAttentionIds();
			if (attenArray.indexOf(programsId) > -1) {
				isExist = true;
			}
		}

		return isExist;
	},
	addAttentionId : function(programsId) {
		if (programsId > 0) {
			if (!Global.isExistAttentionId(programsId)) {
				var attenArray = Global.getAttentionIds();
				attenArray.push(programsId);

				api.setPrefs({
					key : Global.keys.attentionListKey,
					value : attenArray
				});
			}
		}
	},
	removeAttentionId : function(programsId) {
		if (programsId > 0) {
			var attenArray = Global.getAttentionIds();
			var existIndex = attenArray.indexOf(programsId);
			if (existIndex > -1) {
				attenArray.splice(existIndex, 1);

				api.setPrefs({
					key : Global.keys.attentionListKey,
					value : attenArray
				});
			}
		}
	},
	setNewsList : function(val) {
		api.setPrefs({
			key : Global.keys.newsListKey,
			value : val
		});
	},
	getNewsList : function() {
		try {
			return JSON.parse(api.getPrefs({
				key : Global.keys.newsListKey,
				sync : true
			}));
		} catch(e) {
			return [];
		}
	},
	setVideoList : function(val) {
		api.setPrefs({
			key : Global.keys.videoListKey,
			value : val
		});
	},
	getVideoList : function() {
		try {
			return JSON.parse(api.getPrefs({
				key : Global.keys.videoListKey,
				sync : true
			}));
		} catch(e) {
			return [];
		}
	}
}

//格式化赛事状态
function FormatMatchStatus(status) {
	var statusStr = "";
	switch(parseInt(status)) {
		case 0:
			statusStr = "未开始";
			break;
		case 1:
		//上
		case 2:
		//中
		case 3:
		//下
		case 4:
			//加时
			statusStr = "直播中";
			break;
		case -1:
			statusStr = "已结束";
			break;
		case -10:
		case -99:
			statusStr = "取消";
			break;
		case -11:
			statusStr = "待定";
			break;
		case -12:
			statusStr = "腰斩";
			break;
		case -13:
			statusStr = "中断";
			break;
		case -14:
			statusStr = "推迟";
			break;
	};

	return statusStr;
}
