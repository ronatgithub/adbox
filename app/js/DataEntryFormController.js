 'use strict';

// Data entry Form to collect Information and save to database
// using angular-formly with Bootstrap Template
// http://docs.angular-formly.com/v6.16.0/docs/getting-started
// https://scotch.io/tutorials/easy-angularjs-forms-with-angular-formly
// https://github.com/formly-js/angular-formly-templates-bootstrap

angular.module('app.DataEntryFormController', []) // module name, this needs to be injected into app.js as dependency

.controller('AdBoxFormController', function AdBoxFormController($scope, Database, sharedProperties) {
  var db = new Database('test_v1'); // set database name
  var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
  vm.user = {}; // is the model which holds the form field data

  vm.userFields = [
    {
      key: 'ad_size',
      type: 'select',
      templateOptions: {label: 'Ad Group', valueProp: 'value', required: true,
        options: [{name: 'Premium', value: 4}, {name: 'Premium Plus', value: 6}, {name: 'Standart', value: 2}, {name: 'Basic', value: 1}]
      }
    },
    {
      key: 'car_make',
      type: 'input',
      templateOptions: {label: 'Car Make', required: true}
    },
    {
      key: 'car_model',
      type: 'input',
      templateOptions: {label: 'Car Model', required: true}
    },
    {
      key: 'model_trim',
      type: 'input',
      templateOptions: {label: 'Model Trim', required: true, description: 'Specific Type of Car Model'}
    },
    {
      key: 'year',
      type: 'input',
      templateOptions: {label: 'Year Of Registration', required: true}
    },
    {
      key: 'transmission',
      type: 'radio',
      templateOptions: {label: 'Transmission Type', valueProp: 'name', required: true,
        options: [{name: 'Automatic'}, {name: 'Manual'}]
      }
    },
    {
      key: 'fuel_type',
      type: 'radio',
      templateOptions: {label: 'Fuel Type', valueProp: 'name', required: true,
        options: [{name: 'Diesel'}, {name: 'Petrol'}]
      }
    },
    {
      key: 'selling_price',
      type: 'input',
      templateOptions: {label: 'Selling Price', required: true}
    },
    {
      key: 'sale_location',
      type: 'select',
      templateOptions: {label: 'Sale Location', valueProp: 'name', required: true, description: 'Where can the car by viewed?',
        options: [{name: 'Coast'}, {name: 'Central'}, {name: 'Eastern'}, {name: 'Nairobi Area'}, {name: 'Nyanza'}, {name: 'Rift Valley'}, {name: 'Western'}]
      }
    },
    {
      key: 'seller_name',
      type: 'input',
      templateOptions: {label: 'Your Name', required: true}
    },
    {
      key: 'seller_phone',
      type: 'input',
      templateOptions: {label: 'Your Mobile Number', required: true},
      hideExpression: '!model.seller_name'
    }

  ];
  
  vm.onSubmit = onSubmit;
  
  
	function onSubmit() { console.log('form data to be submitted (vm.user):', vm.user);
    
	    db.create({ // db.create because of pouch factory i use. check the factory to see options
	      _id: new Date().toISOString(),
	      ad_size: vm.user.ad_size,
	      car_make: vm.user.car_make,
	      car_model: vm.user.car_model,
	      model_trim: vm.user.model_trim,
	      year: vm.user.year,
	      transmission: vm.user.transmission,
	      fuel_type: vm.user.fuel_type,
	      selling_price: vm.user.selling_price,
	      sale_location: vm.user.sale_location,
	      seller_name: vm.user.seller_name,
	      seller_phone: vm.user.seller_phone
	    });
	}
});