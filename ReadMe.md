# DatumJs
Lightweight library which enables object oriented programming with JavaScript

## How to use
Simply include [datum.js](https://github.com/meegasmullage/datumjs/blob/master/datum.min.js) in to your project. [samples](https://github.com/meegasmullage/datumjs/tree/master/Samples)

## Features
- Support multi-level inheritance
- Enables to access base class via **this.base** property


## Methods
- **define**: *define a class*
```javascript
var Mobile = datum.define({
    //Meta data of the class
    __meta: {
        name: 'Mobile' // Name of the class
    },

    //properties
    manufacturer: '',
    operatingSystem: '',
    model: '',
    cost: '',

    //Constructor
    constructor: function (manufacturer, operatingSystem, model, cost) {
        this.manufacturer = manufacturer;
        this.operatingSystem = operatingSystem;
        this.model = model;
        this.cost = cost;
    },

    //Methods  
    getModel: function () {
        return this.model;
    },
    sendText: function(receiver, text){
        console.log('Text sent to ' + receiver);
    }
});
```
- **create**: *Create an instance of a defined class*
```javascript
var mobile = datum.create(Mobile, "Nokia", "Win8", "Lumia", 10000);
```
- **clone**: *Clone an object*
```javascript
var mobileClone = datum.clone(mobile);
```

## Inheritance
```javaScript
//Android
var Android = datum.define({
    //Meta data of the class
    __meta: {
        name: 'Android', // Name of the class
        extends: Mobile // Base class object
    },

    //Constructor
    constructor: function (manufacturer, operatingSystem, model, cost) {
        this.base(manufacturer, operatingSystem, model, cost);
    },

    //Methods
    getModel: function () {
        return "This is Android Mobile - " + this.model;
    }    
});
```
## Browsers support
- Internet Explorer 8+
- Firefox 3.1+
- Safari 4+
- Chrome 3+
