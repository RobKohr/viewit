/* 
Viewit is a system to easily load the views for an express driven site based upon paths.
*/

var ejs = require('ejs');
var fs = require('fs');
var app = null;


exports.init = function(params){
    app = params.app;
}

var modules = {};
exports.modules = modules;

exports.add = function(module){    
    var paths = module.getPaths();
    var module_root = module.package.name.replace('viewit-', '');
    modules[module_root] = module;
    var path = '/'+module_root+'/*';
    app.get(path+'/json', start, loadController, jsonView)
    app.post(path+'/json', start, postHandler, loadController, jsonView)

    app.get(path, start, loadController, contentView)
    app.post(path, start, postHandler, loadController, contentView)
}

start = function(req, res, next){
    res.data = {};
    res.data.data = res.data;
    res.data.errors = [];
    res.data.notices = [];
    res.request = req.body;
    res.data.path = getPath(req);
    res.data.view_path = getViewPath(req);
    req.connection.setTimeout(1000);
    next();
}

loadController = function(req, res, next){
    res.data.bla=bla
    next();
}

postHandler = function(req, res, next){

}

contentView = function(req, res, next){
    res.send('hello');
}

jsonView = function(req, res){
    delete res.data.data;//remove circular reference
    res.send(JSON.stringify(res.data));
}


///subfunctions

var getPath = function(req){
    console.log(req);
    var url = req._parsedUrl.pathname.split('/');
    if(url[1])
	var path = [url[1]];
    else
	var path = ['home'];
    if((typeof(url[2])!='undefined')&&(url[2]!='json'))
	path[1] = url[2];
    else
	path[1] = 'index';
    return path;
}

var getViewPath = function(req){
    return getPath(req).join('/');
}


/*
var form = require('./form');

var compiled_templates = {};
var renderTemplate = function(filename, data){
    var str = fs.readFileSync(__dirname + '/node_modules/' + filename + '.ejs', 'utf8');
    return ejs.render(str, data);
}


exports.contentView = function(req, res, next){
    var path = res.data.view_path;
    res.data.form = form;//form library;
    res.data.body = renderTemplate(path, res.data);
    res.render('templates/layout', res.data);
}


//data is the object of data that is passed to the view
setData = function(req, res, next){
    if(typeof(res.data)=='undefined'){
	res.data = {};
	res.data.data = res.data;//yeay recursion.
    }
    res.data.viewPath = getViewPath(req, res);
    return next();

}

var getController = function(req, res){
   
}

var html = function(req, res){
    res.render(getPath(req), { title: 'Express' });
}

exports.setApp = function(a){

}

var controllers = {};
exports.setControllers = function(Cs){
    for(var i in Cs){
	controllers[i] = Cs[i];
    }
}
*/