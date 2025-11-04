//Mobile
var Mobile = datum.define({
    //Meta data of the class
    __meta: {
        name: 'Mobile'
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

//Android
var Android = datum.define({
    //Meta data of the class
    __meta: {
        name: 'Android',
        extends: Mobile
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

//Blackberry
var Blackberry = datum.define({
    //Meta data of the class
    __meta: {
        name: 'Blackberry',
        extends: Mobile
    },

    //Constructor
    constructor: function (manufacturer, operatingSystem, model, cost) {
        this.base(manufacturer, operatingSystem, model, cost);
    },

    //Methods  
    getModel: function () {
        return "This is Android Blackberry - " + this.base.getModel();
    }
});

//Creating Object
var mobile = datum.create(Mobile, "Nokia", "Win8", "Lumia", 10000);

//Creating Object of Sublcass
var android = datum.create(Android, "Samsung", "Android", "Grand", 30000);
var blackberry = datum.create(Blackberry, "BlackB", "RIM", "Curve", 20000);

//Calling methods
console.log(mobile.getModel());
console.log(android.getModel());
console.log(blackberry.getModel());

mobile.sendText('Chloe', "Hello Chloe, How are you?");
android.sendText('Smith', "Hello Smith, How are you?");
blackberry.sendText('Brayan', "Hello Brayan, How are you?");