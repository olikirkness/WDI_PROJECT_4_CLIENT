angular
.module('LeagueApp')
.factory('Challenge', Challenge);

Challenge.$inject = ['$resource', 'API'];
function Challenge($resource, API){
  return $resource(`${API}/challenges/:id`, {id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
