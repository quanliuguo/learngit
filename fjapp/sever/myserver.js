var express = require("express");
var fs = require("fs")
var app = express()
var bodyParser = require("body-parser")
var jwt = require("jsonwebtoken"); //cnpm i jsonwebtoken --save-dev
// var fileJson='./data/data01.json'
var fileJson = './data/newdata0726.json'
var userJson = './data/user.json'
// var shopCarJson = './data/shopCar.json'
let secret = "char";
var expiresIn = 50000;
let index;
//跨域
//跨域问题(cors)
/*app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});*/
app.use("*", function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});

//静态资源
//app.use(express.static("./public/jquery"));
//app.use(express.static("./public/css"));
app.use(express.static("./public/img"));
app.use(express.static("./public/video"));


//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
	extended: false
}); //1.1接收前台用post传递过来的字符串

//主页
app.get("/", function (req, res) {
	//console.log("__dirname:",__dirname);
	res.send("这是主页");
	//res.sendFile(__dirname+"/"+filePage);//
});
//生成随机数
app.get("/getRandom", function (req, res) {
	let obj = req.query;
	let random = Number.parseInt(Math.random() * 10000);
	obj.checkNum = random;
	res.send({
		obj
	})
});
//a2: addGet
app.get("/addGet", function (req, res) {
	var obj = req.query;
	console.log("addGet obj:", obj);
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {

			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			console.log("get添加：", obj)
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});


app.get("/addgetparams/user/:user/age/:age", (req, res) => {
	var obj = req.params;
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			console.log("get添加：", obj)
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})

})
//a4: addPost
app.post("/addPost", bodyParser.json(), function (req, res) {
	var obj = req.body;
	console.log("addPost obj:", obj);
	//res.send({s:0});
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});
//这是post 方式存储已经注册的账号
app.post("/addpostUser", bodyParser.json(), function (req, res) {
	var obj = req.body;
	console.log("addPost obj:", obj);
	//res.send({s:0});
	fs.readFile(userJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			obj.shopCar=[];
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			fs.writeFile(userJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});
//添加购物车
app.post("/addShopcar", bodyParser.json(), function (req, res) {
	var obj = req.body;
	let token = obj.token;
	let info = obj.info;
	jwt.verify(token, secret, function (err, decoded) {
		if (err) {
			console.log("err:", err.message);
			res.send({error:2});
		} else {
			let admin = decoded._admin;
			fs.readFile(userJson, function (err, data) {
				if (err) {
					res.send({
						err: 1
					});
				} else {
					let str = data.toString();
					let arr = JSON.parse(str);		
								////比对用户名
					let theUser=arr.find((v,i)=>{
						return v.admin===admin
					})
					//理论上讲，是一定能找到的
					let theGood=theUser.shopCar.find((v,i)=>{
						return v.newId===info.newId;
					})
					console.log("这件商品已经在购物车中吗？",theGood)
					if(theGood){//如果在
						theGood.num+=info.num;
						console.log("新的num 是",theGood.num)
					}else{//如果是新添加的
						console.log("id没有匹配的，说明是新数据")
						theUser.shopCar.push(info)
					}
					//对象处理完毕
					let str2 = JSON.stringify(arr);
					fs.writeFile(userJson, str2, function (err) {
						if (err) {
							res.send({
								s: 2
							})
						} else {
							res.send({
								s: 0
							})
						}
					})
				}

			}) //读完了

		}
	})

});
//更新某用户的购物车
app.post("/replaceShopcar", bodyParser.json(), function (req, res) {
	var obj = req.body;
	// console.log("参数:",obj)
	let token = obj.token;
	let shopCar = obj.shopCar;
	jwt.verify(token, secret, function (err, decoded) {
		if (err) {
			console.log("err:", err.message);
			res.send({error:2});
		} else {
			let admin = decoded._admin;
			fs.readFile(userJson, function (err, data) {
				if (err) {
					res.send({
						err: 1
					});
				} else {
					let str = data.toString();
					let arr = JSON.parse(str);		
								////比对用户名
					let theUser=arr.find((v,i)=>{
						return v.admin===admin
					})
					//理论上讲，是一定能找到的
					let newshopCar=shopCar.slice(0);
					// console.log("是否还是同一个数组",newshopCar==shopCar,newshopCar)
					console.log("theUser",theUser.shopCar)
					theUser.shopCar=newshopCar;

					
					//对象处理完毕
					let str2 = JSON.stringify(arr);
					fs.writeFile(userJson, str2, function (err) {
						if (err) {
							res.send({
								s: 2
							})
						} else {
							res.send({
								s: 0
							})
						}
					})
				}

			}) //读完了

		}
	})

});
//添加购物车
app.post("/addShopcar", bodyParser.json(), function (req, res) {
	var obj = req.body;
	let token = obj.token;
	let info = obj.info;
	jwt.verify(token, secret, function (err, decoded) {
		if (err) {
			console.log("err:", err.message);
			res.send({error:2});
		} else {
			let admin = decoded._admin;
			fs.readFile(userJson, function (err, data) {
				if (err) {
					res.send({
						err: 1
					});
				} else {
					let str = data.toString();
					let arr = JSON.parse(str);		
								////比对用户名
					let theUser=arr.find((v,i)=>{
						return v.admin===admin
					})
					//理论上讲，是一定能找到的
					let theGood=theUser.shopCar.find((v,i)=>{
						return v.newId===info.newId;
					})
					console.log("这件商品已经在购物车中吗？",theGood)
					if(theGood){//如果在
						theGood.num+=info.num;
						console.log("新的num 是",theGood.num)
					}else{//如果是新添加的
						console.log("id没有匹配的，说明是新数据")
						theUser.shopCar.push(info)
					}
					//对象处理完毕
					let str2 = JSON.stringify(arr);
					fs.writeFile(userJson, str2, function (err) {
						if (err) {
							res.send({
								s: 2
							})
						} else {
							res.send({
								s: 0
							})
						}
					})
				}

			}) //读完了

		}
	})

});
//这是post 方式判断是否可以登录
app.post("/matchUser", bodyParser.json(), function (req, res) {
	var obj = req.body;
	console.log("addPost obj:", obj);
	//res.send({s:0});
	fs.readFile(userJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			let f = arr.some((a, b, c) => {
				if (a.admin === obj._admin) {
					// console.log("=====",this.)
					return a.password === obj._pwd
				}
			})
			if (f) {
				let token = jwt.sign(obj, secret, {
					expiresIn: expiresIn
				});
				res.send({
					s: 1,
					token
				})
			} else {
				res.send({
					s: 0
				})
			}
		}
	})
});
app.post("/addPostStr", urlencodedParser, function (req, res) {
	var obj = req.body;
	console.log("addPost obj:", obj);
	//res.send({s:0});
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});

//a6
app.get("/getData", function (req, res) {
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 3
			});
		} else {
			var obj = {
				s: 0,
				data: data.toString()
			}
			setTimeout(function () {
				res.send(obj);
			}, 2000);
		}
	})
})
///获取购物车中的数据
app.get("/getShopcar", function (req, res) {
			let token = req.query.token;
			jwt.verify(token, secret, function (err, decoded) {
				if (err) {
					console.log("err:", err.message);
				} else {
					let admin = decoded._admin;
					fs.readFile(userJson, function (err, data) {
						if (err) {
							res.send({
								err: 3
							});
						} else {
							let str1 = data.toString();
							let arr = JSON.parse(str1);
							// if (arr.shopCar.length==0) {
							// 	let obj = {
							// 		s: 1,
							// 		arr: []
							// 	}
							// 	res.send(obj)
							// } else {
							// 	for (let item of arr) {
							// 		if (item.admin === admin) {

							// 			res.send({s:0,arr:item.shopCar})
							// 		} else {
							// 			res.send({s:0})
							// 		}
							// 	}
							// }
							//路由守卫限制只有在登录状态才可以访问购物车
							//所以此时userJson里一定有数据
							let theUser=arr.find((v,i)=>{
								return v.admin===admin
							})
							theShopcar=theUser.shopCar;
							res.send({s:0,shopCar:theShopcar})
						}
					})
				}
			})
})
			//拿到首页数据 数据存放在 
			app.get("/getHomedata", function (req, res) {
				fs.readFile(fileJson, function (err, data) {
					if (err) {
						res.send({
							err: 3
						});
					} else {
						console.log("typeof data:::::::", typeof data)
						let str = data.toString();
						var obj = {
							s: 0,
							data: str
						}

						res.send(obj);

					}
				})
			})
			//通过id查找
			app.post("/getDetail", bodyParser.json(), function (req, res) {
				var obj = req.body;
				console.log("要查找的id==>", obj)
				fs.readFile(fileJson, function (err, data) {
					if (err) {
						res.send({
							err: 3
						});
					} else {
						let str1 = data.toString()
						// console.log("typeof data:::::::",typeof str1,str1);
						dataObj = JSON.parse(str1)
						let furniture = dataObj.goodshow.furniture;
						let grocery = dataObj.goodshow.grocery;

						for (let v of furniture) {
							for (let vv of v.tableData) {
								if (vv.id == obj.id) {
									console.log("在furniture中找到")
									vv.kind = "家具"
									res.send({
										s: "在furniture中找到",
										info: vv
									})
									return;
								}
							}
						}
						for (let v of grocery) {
							for (let vv of v.tableData) {
								if (vv.id == obj.id) {
									console.log("在grocery中找到")
									vv.kind = "家居"
									res.send({
										s: "在grocery中找到",
										info: vv
									})
									return;
								}
							}
						}
						// var obj={
						// 	s:0,
						// 	data:str
						// }

						res.send({
							s: "找不到"
						});

					}
				})
			})
			//删除
			app.get("/delete", function (req, res) {
				var obj = req.query;
				fs.readFile(fileJson, function (err, data) {
					if (err) {
						res.send({
							err: 3
						});
					} else {
						var str = data.toString();
						var arr = JSON.parse(str);
						console.log("aaaaaaa", arr)
						for (var i = 0; i < arr.length; i++) {
							if (obj.id == arr[i].id) {
								arr.splice(i, 1)
							}
						}
						console.log("aaaaaaa:", arr)
						var obj1 = {
							s: 0,
							data: JSON.stringify(arr).toString()
						}
						var str2 = JSON.stringify(arr);
						res.send(obj1);
						fs.writeFile(fileJson, str2, function (err) {
							if (err) throw err;
						})
					}
				})

			})
			//启动app


			app.listen(81, function () {
				console.log("OK 81")
			})