angular
.module('LeagueApp')
.factory('Match', Match);

Match.$inject = ['$resource', 'API'];
function Match($resource, API){
  return $resource(`${API}/matches/:id`, {id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
