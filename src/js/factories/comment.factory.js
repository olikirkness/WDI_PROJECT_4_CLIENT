angular
.module('LeagueApp')
.factory('Comment', Comment);

Comment.$inject = ['$resource', 'API'];
function Comment($resource, API){
  return $resource(`${API}/comments/:id`, {id: '@_id'}, {
    'update': { method: 'PUT'}
  });
}
