(function() {
    'use strict';
    /*jshint latedef: false */
    /*jshint validthis: true */
    /*jshint maxparams: 8 */ 

  angular.module('module.constant.resource',[])
  .constant('constantResource', constantResource());        

  function constantResource(){

    var path ='vlm';

    return {

      'url':{

        'example':{

          'path': path+'/urlExample/:example',
          'settings': {
            'actions':{ 
              'get':    {method:'GET'},
              'save':   {method:'POST'},
              'query':  {method:'GET', isArray:true},
              'put': {method:'PUT'},
              'delete': {method:'DELETE'} 
            },
            'paramDefaults':{
                electionId:'@example'
            }
          }
        
        },
      
        'login':{
        
          'path': path+'/login',
          'settings': {
            'actions':{
              'save': { method: 'POST'} 
            },

          }
        
        },

        'language':{
        
          'path': path+'/language/:language',
          'settings': {
            'actions':{
              'save': { method: 'POST'} 
            },
            'paramDefaults':{
                language:'@language'
            }

          }
        
        },

        'voterSearch':{
        
          'path': path+'/voters/:nationalId/track/:trackCode',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            },
            'paramDefaults':{
                nationalId:'@nationalId',
                trackCode:'@trackCode'
            }
            
          }
        
        },

        'exportResource':{
        
          'path': path+'/tracks/:trackCode/export',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            },
            'paramDefaults':{
                trackCode:'@trackCode'
            }
            
          }
        
        },

         'sendFinal':{
        
          'path': path+'/tracks/:trackCode/export/remote',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            },
            'paramDefaults':{
                trackCode:'@trackCode'
            }
            
          }
        
        },

        'voterList':{
        
          'path': path+'/tracks/:trackCode/voters',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            },
            'paramDefaults':{
                trackCode:'@trackCode'
            }
            
          }
        
        },

        'checkIn':{
        
          'path': path+'/voters/:nationalId/checkin/',
          'settings': {
            'actions':{
              'put': {method:'PUT'}
            },
            'paramDefaults':{
                nationalId:'@nationalId',
            }
            
          }
        
        },

        'dbstatus':{
        
          'path': path+'/dbstatus',
          'settings': {
            'actions':{
              'get': {method:'GET'}
            }
            
          }
        
        },
        
        'importVoterList':{
        
          'path': path+'/voters/import',
          'settings': {
            'actions':{
              'save': { 
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
              },
              'get': { 
                method: 'GET'
              } 
            },

          }
        
        },
      
        'validationLogin':{
        
          'path': path+'/login/validate',
          'settings': {
            'actions':{
              'save': { method: 'POST'} 
            },

          }
        
        },

        'reportVoters':{
        
          'path': path+'/reports/tracks/:trackCode',
          'settings': {
            'actions':{
              'gat': { method: 'GET'} 
            },
            'paramDefaults':{
                trackCode:'@trackCode',
            }

          }
        
        },

        'sendVoterTurnout':{
        
          'path': path+'/tracks/turnout',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            }

          }
        
        },

        'logoff':{
        
          'path': path+'/logoff',
          'settings': {
            'actions':{
              'get': { method: 'GET'} 
            }

          }
        
        }


      
      }

    };

  }

}(angular));