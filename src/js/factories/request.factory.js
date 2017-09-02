angular
.module('LeagueApp')
.factory('Request', Request);

Request.$inject = ['$resource', 'API'];
function Request($resource, API){
  return $resource(`${API}/requests/:id`, {id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
