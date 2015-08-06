 'use strict';

// Data entry Form to collect Information and save to database
// using angular-formly with Bootstrap Template
// http://docs.angular-formly.com/v6.16.0/docs/getting-started
// https://scotch.io/tutorials/easy-angularjs-forms-with-angular-formly
// https://github.com/formly-js/angular-formly-templates-bootstrap

angular.module('app.DataEntryFormController', []) // module name, this needs to be injected into app.js as dependency

.controller('AdBoxFormController', function AdBoxFormController($scope, Database, sharedProperties) {
  var db = new Database('test_v1'); // set database name
  var vm = this; // vm stands for 'View Model' --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
  vm.user = {}; // is the model which holds the form field data

  vm.userFields = [
  {
    className: 'col-xs-12',
      key: 'ad_size',
      type: 'select',
      defaultValue: 4,
      templateOptions: {label: 'Ad Group', type: 'select', valueProp: 'value', required: true, options: [{name: 'Premium', value: 4}, {name: 'Premium Plus', value: 6}, {name: 'Standart', value: 2}, {name: 'Basic', value: 1}]}
  },
  {
    className: 'row',
    'fieldGroup': [
      {
      className: 'col-xs-4',
        key: 'car_make',
        type: 'select',
        wrapper: 'loading',
        templateOptions:{
          label: 'Car Make',
          options: [],
          valueProp: 'make_display',
          labelProp: 'make_display',
          required: true,
          placeholder: 'Select Car Make here'
        },
        controller: /* @ngInject */ function($scope, jsonService) {
          $scope.to.loading = jsonService.getJSON('getMakes').then(function(response){console.log(response.data.Makes);
            $scope.to.options = response.data.Makes;
            // note, the line above is shorthand for:
            // $scope.options.templateOptions.options = data;
            return response;
          });
        }
      },
      {
        className: 'col-xs-4',
        key: 'car_model',
        type: 'select',
        wrapper: 'loading',
        templateOptions: {
          label: 'Car Model',
          options: [],
          valueProp: 'model_name',
          labelProp: 'model_name',
          required: true,
          placeholder: 'Select Car Make here'
        },
        expressionProperties: {'templateOptions.disabled': '!model.car_make'},
        controller: /* @ngInject */ function($scope, jsonService) {
		    $scope.$watch('model.car_make', function (newValue, oldValue, theScope) {
		      if(newValue !== oldValue) {
		        // logic to reload this select's options asynchronusly based on state's value (newValue)
		        console.log('new value is different from old value');
		        if($scope.model[$scope.options.key] && oldValue) {
		          // reset this select
		          $scope.model[$scope.options.key] = '';
		        } 
		        // Reload options
                $scope.to.loading = jsonService.getJSON('getModels&make=' + newValue).then(function (res) {console.log(res);
                  $scope.to.options = res.data.Models;
                });
		      }
		    });
        
        }
      },
      //{
      //className: 'col-xs-4',
      //key: 'car_model',
      //type: 'input',
      //templateOptions: {label: 'Car Model', type: 'text', required: true},
      //expressionProperties: {'templateOptions.disabled': '!model.car_make'}
      //},
      {
      className: 'col-xs-4',
      key: 'model_trim',
      type: 'input',
      templateOptions: {label: 'Model Trim', type: 'text', required: true},
      expressionProperties: {'templateOptions.disabled': '!model.car_model'}
      }
    ]
  },
  {
    className: 'row',
    'fieldGroup': [
      {
      className: 'col-xs-4',
      key: 'year',
      type: 'input',
      templateOptions: {label: 'Year Of Registration', type: 'number', required: true},
      //expressionProperties: {'templateOptions.disabled': '!model.car_model'}
      },
      {
      className: 'col-xs-4',
      key: 'transmission',
      type: 'radio',
      templateOptions: {label: 'Transmission Type', type: 'radio', valueProp: 'name', required: true, options: [{name: 'Automatic'}, {name: 'Manual'}]},
      //expressionProperties: {'templateOptions.disabled': '!model.car_model'}
      },
      {
      className: 'col-xs-4',
      key: 'fuel_type',
      type: 'radio',
      templateOptions: {label: 'Engine Fuel Type', type: 'radio', valueProp: 'name', required: true, options: [{name: 'Diesel'}, {name: 'Petrol'}]},
      //expressionProperties: {'templateOptions.disabled': '!model.car_model'}
      }
    ]
  },
  {
    className: 'row',
    'fieldGroup': [
      {
      className: 'col-xs-6',
      key: 'selling_price',
      type: 'input',
      templateOptions: {label: 'Selling Price', addonLeft: {"class": "glyphicon glyphicon-piggy-bank"}, type: 'number', required: true}
      },
      {
      className: 'col-xs-6',
      key: 'sale_location',
      type: 'select',
      templateOptions: {label: 'Sale Location', addonLeft: {"class": "glyphicon glyphicon-map-marker"}, type: 'select', valueProp: 'name', required: true, description: 'Where can the car by viewed?', options: [{name: 'Coast'}, {name: 'Central'}, {name: 'Eastern'}, {name: 'Nairobi Area'}, {name: 'Nyanza'}, {name: 'Rift Valley'}, {name: 'Western'}]}
      }
    ]
  },
  {
    className: 'col-xs-12',
      key: 'extra_text',
      type: 'textarea',
      templateOptions: {label: 'Text Description', type: 'text', placeholder: 'any extra text goes here', rows: 4, cols: 15, required: true},
      // to disable form fields
      //expressionProperties: {'templateOptions.disabled': function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}}
      // to hide form fields
      hideExpression: function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}
  },
  {
    className: 'row',
    'fieldGroup': [
      {
      className: 'col-xs-4',
      key: 'media1',
      type: 'upload-file',
      templateOptions: {label: 'Photo Large (385x205)', required: true},
      // to disable form fields
      //expressionProperties: {'templateOptions.disabled': function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}}
      // to hide form fields
      hideExpression: function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}
      },
      {
      className: 'col-xs-4',
      key: 'media2',
      type: 'upload-file',
      templateOptions: {label: 'Photo Small (185x100)', required: true},
      // to disable form fields
      //expressionProperties: {'templateOptions.disabled': function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}}
      // to hide form fields
      hideExpression: function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 2) {return false;} if(scope.model.ad_size === 4) {return true;} if(scope.model.ad_size === 6) {return false;} return true;}
      },
      {
      className: 'col-xs-4',
      key: 'media3',
      type: 'upload-file',
      templateOptions: {label: 'Photo Small (185x100)', required: true},
      // to disable form fields
      //expressionProperties: {'templateOptions.disabled': function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 4) {return false;} if(scope.model.ad_size === 6) {return false;} return true;}}
      // to hide form fields
      hideExpression: function($viewValue, $modelValue, scope) {if(scope.model.ad_size === 2) {return false;} if(scope.model.ad_size === 4) {return true;} if(scope.model.ad_size === 6) {return false;} return true;}
      }
    ]
  },
  {
    className: 'row',
    'fieldGroup': [
      {
      className: 'col-xs-4',
      key: 'seller_name',
      type: 'input',
      templateOptions: {label: 'Your Name', type: 'text', required: true}
      },
      {
      className: 'col-xs-4',
      key: 'seller_phone',
      type: 'input',
      templateOptions: {label: 'Your Mobile Number', type: 'tel', required: true},
      //hideExpression: '!model.seller_name'
      },
      {
      className: 'col-xs-4',
      key: 'seller_email',
      type: 'input',
      templateOptions: {label: 'Your Email', type: 'email', required: true}
      }
    ]
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
	      seller_phone: vm.user.seller_phone,
	      seller_email: vm.user.seller_email,
	      extra_text: vm.user.extra_text,
	      _attachments: sharedProperties.dataObj
	    });
	}
});