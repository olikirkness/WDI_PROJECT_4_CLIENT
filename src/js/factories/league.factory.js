angular
.module('LeagueApp')
.factory('League', League);

League.$inject = ['$resource', 'API'];
function League($resource, API){
  return $resource(`${API}/leagues/:id`, {id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
