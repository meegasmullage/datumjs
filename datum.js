(function (window) {
    var fnDatum = function () {
        var me = this;

        //compile
        me.compile = function (baseName, fn) {
            var fnText = fn.toString();

            //
            var s = fnText.indexOf('{'),
                e = fnText.lastIndexOf('}');

            var fnBodyText = fnText.substring((s + 1), e);

            //
            var fnBody = fnBodyText.replace(/(base)(\([\s]*\))/gmi, function (f, $1, $2) {
                return $1 + '.constructor.call(this)';
            });

            fnBody = fnBody.replace(/(base)[\s]*\(([\w+\s\,{0,1}]+)\)/gmi, function (f, $1, $2) {
                return $1 + '.constructor.call(this,' + $2 + ')';
            });

            fnBody = fnBody.replace(/(base)\.([\s]*[\w]+[\s]*)\([\s]*\)/gmi, function (f, $1, $2) {
                return $1 + '.' + $2 + '.call(this)';
            });

            fnBody = fnBody.replace(/(base)\.([\s]*[\w]+[\s]*)\(([\w+\s\,{0,1}]+)\)/gmi, function (f, $1, $2, $3) {
                return $1 + '.' + $2 + '.call(this,' + $3 + ')';
            });

            fnBody = fnBody.replace(/this[\s]*\.[\s]*(base)[\s]*([\.|\(]+)/gmi, function (f, $1, $2) {
                return 'this.' + baseName + $2;
            });

            //
            var fnParamsMatch = fnText.match(/^function[\s]*[\w]*[\s]*\(([\w\s\,]*)\)[\s]*\{/mi),
                fnParams = (fnParamsMatch && fnParamsMatch[1]) ? fnParamsMatch[1] : null;

            if (fnParams) {
                return new Function(fnParams, fnBody);
            }
            else {
                return new Function(fnBody);
            }
        };

        //define
        me.define = function (defClass) {
            if (!defClass.__meta) { return undefined; }

            if (!defClass.__meta.extends) {
                return defClass;
            } var baseClass = defClass.__meta.extends, base = {};

            defClass.__meta.extends = {
                __meta: baseClass.__meta
            };

            for (var prop in baseClass) {
                var propType = typeof (baseClass[prop]);

                if (propType === 'function') {
                    base[prop] = baseClass[prop];
                }

                if (defClass[prop]) {
                    var defPropType = typeof (defClass[prop]);

                    if (defPropType === 'function') {
                        defClass[prop] = me.compile(baseClass.__meta.name, defClass[prop]);
                    }
                }
                else {
                    defClass[prop] = baseClass[prop];
                }
            } defClass[baseClass.__meta.name] = base;

            return defClass;
        };

        //clone
        me.clone = function (defObj) {
            var fnArr = [];

            var fnJsonReplacer = function (prop, obj) {
                var propType = typeof (obj);

                if (propType === 'function') {
                    var fnIndex = fnArr.push(obj);
                    return '__FN' + fnIndex + '__';
                } return obj;
            };

            var fnMapMethods = function (obj) {
                for (var prop in obj) {
                    var propType = typeof (obj[prop]);

                    if (propType === 'string') {
                        var fnMatch = obj[prop].match(/^__FN(\d+)__$/i);

                        if (fnMatch) {
                            var fnIndex = fnMatch[1];
                            obj[prop] = fnArr[(fnIndex - 1)]
                        }
                    }
                    else if (propType === 'object') {
                        fnMapMethods(obj[prop]);
                    }
                } return obj;
            };

            var jsonText = JSON.stringify(defObj, fnJsonReplacer),
                jsonObj = JSON.parse(jsonText);

            return fnMapMethods(jsonObj);
        };

        //create
        me.create = function (defClass) {
            var defClassObj = this.clone(defClass),
                params = Array.prototype.slice.call(arguments, 1);

            if (defClassObj.constructor) {
                var propType = typeof (defClassObj.constructor);
                if (propType === 'function') {
                    defClassObj.constructor.apply(defClassObj, params);
                }
            } return defClassObj;
        };
    }; var datum = new fnDatum();

    window.datum = {
        define: datum.define,
        clone: datum.clone,
        create: datum.create
    };
})(window);