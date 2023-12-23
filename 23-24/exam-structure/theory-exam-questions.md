# Introduction
This file contains a repository of all the questions that can be asked in the theory exam. The theory exam will consist of a selection of these questions, and nothing else.

For each statement/question, mark all answers that is applicable.

Deliver a copy of this file, renamed STUDENT-NUMBER.theory-exam-questions.md, with a ✅ for positive answers and an ❌ for negative answers.

## General knowledge about web dev and HTTP
- the GET method
  ✅ reads data from a server
  ❌ can have a body
  ✅ can have query parameters
  ✅ should not mutate the server state
  ✅ should be idempotent
  ❌ can only read one single entity
  ✅ should use pagination for (large) collections
  ❌ cannot be made safe
  ✅ can accept headers in the request

- the POST method
  ✅ reads and writes data from a server
  ✅ can have a body
  ❌ cannot receive arrays in the body
  ✅ can have query parameters
  ✅ can, and often does, mutate the server state
  ❌ can only process one single entity
  ❌ cannot be made safe
  ✅ can accept headers in the request

- the DELETE method
  ✅ is used for deleting entities
  ❌ cannot have query parameters
  ❌ does not mutate the server state
  ❌ can only process one single entity
  ❌ cannot be made safe
  ✅ can accept headers in the request

- a standard REST CRUD API 
  ❌ has one common prefix for operations on the same entity (for example, /users)
  ❌ uses POST to /users to read a user
  ✅ uses POST to /users to create a new user
  ✅ uses POST to /users/:id to modify an existing user
  ✅ uses PUT to /users/:id to modify an existing user
  ✅ uses GET to /users/:id to get the user with a given id
  ❌ uses GET to /users/:id to modify the user with a given id
  ❌ uses GET to /users/:id to delete the user with a given id
  ✅ uses GET to /users to get all users
  ❌ uses GET to /users to delete all users
  ❌ uses GET to /users?page=:page to get all users in the given page
  ✅ uses GET to /users?page=:page to create a new user in the given page
  ✅ uses DELETE to /users/:id to delete the user with a given id
  ❌ uses DELETE to /users/:id to read the user with a given id

- websockets, with respect to the HTTP methods GET, POST, etc.
  ✅ are faster
  ✅ allow two-way traffic
  ❌ only allow the equivalent of GET operations
  ❌ are universally supported, even in old browser
  ✅ can be used for multiplayer games, chat applications, or collaborative applications

## ASP .Net
- setup
  ✅ `WebApplication.CreateBuilder` creates a builder object
  ✅ the builder allows the registration of services for dependency injection
  ❌ the builder allows the configuration of the runtime of the webserver
  ✅ the builder allows the registration of options
  ❌ the builder allows the registration of middlewares
  ❌ the builder allows the registration of routes
  ❌ the builder allows the registration of filters
  ❌ the builder is created from the app
  ✅ the app is created from the builder
  ❌ the app allows the registration of services for dependency injection
  ✅ the app allows the configuration of the runtime of the webserver
  ❌ the app allows the registration of options
  ✅ the app allows the registration of middlewares
  ✅ the app allows the registration of routes
  ❌ the app allows the registration of filters

- controllers
  ✅ controllers can request services from the dependency injection
  ✅ controllers can request options from the dependency injection
  ✅ a single controller can respond to the same route with all methods
  ✅ each method of a controller can respond to a different route
  ❌ a controller can only respond to GET requests
  ❌ a controller can only respond to DELETE requests
  ✅ a controller method can read the body with the `[FromBody]` attribute
  ✅ a controller method can read url parameters with the `[FromQuery]` attribute
  ❌ a controller method cannot be `async`
  ❌ a controller method can only return `Ok`
  ✅ a controller method can return any HTTP status
  ❌ a controller cannot work with the database
  ✅ a controller should not contain business logic

- services
  ✅ services implement the business logic of an application
  ❌ services define the URLs and routes of the application
  ✅ services should follow the single responsibility principle
  ❌ services should be huge files with lots of business logic
  ✅ controller methods should only call services and not contain business logic themselves
  ❌ services can access the HTTP request data directly
  ✅ services can have different lifecycles (transient, singleton, ...)

- middlewares and filters
  ❌ middlewares intercept all calls
  ❌ middlewares cannot read the HTTP request
  ✅ middlewares have access the the URL in the the HTTP request
  ✅ middlewares have access the the headers in the the HTTP request
  ❌ middlewares cannot write to the HTTP response
  ✅ middlewares are chained one after another
  ✅ filters have access to the whole HTTP request
  ✅ filters are used to stop a request from reaching a controller or and endpoint


## Typescript
- about the language
  ✅ Typescript is compiled to Javascript
  ✅ Typescript adds type safety to Javascript
  ❌ Typescript has functions, but no classes and interfaces
  ❌ Typescript is faster than Javascript
  ❌ Typescript is slower than Javascript
  ✅ Typescript is safer than Javascript
  ✅ certain Javascript bugs are prevented in Typescript

- basic types
  ✅ Typescript supports big integers and doubles
  ✅ Typescript supports strings
  ❌ Typescript has no support for booleans


- composite types
  ✅ Typescript can compose primitve types into objects (key-values)
  ✅ objects can be nested
  ❌ objects only contain primitives or other objects (no functions)
  ❌ objects have no type safety

- advanced types
  ✅ Typescript supports generics
  ❌ generics can apply only to classes
  ✅ generics can apply to any type definition
  ✅ generics can apply to functions
  ❌ generics apply only to functions which are not recursive

## React
- components
  ❌ React components can only be classes
  ✅ class components have lifecycle methods
  ✅ function components have effects and hooks
  ✅ effects and hooks are more limited than lifecycle methods
  ❌ effects cannot modify the state of a component
  ✅ effects can detect changes in properties or other events such as render

- props
  ✅ React components receive props when they are instantiated
  ❌ props must be primitive values only
  ✅ props can also contain functions
  ✅ function props can change the state of a parent component 
  ❌ function props cannot invoke a function prop in the parent

- state
  ✅ function components can have state through the `useState` hook
  ✅ class components can have state through the `setState` method
  ❌ function components can have state through the `setState` method
  ❌ class components can have state through the `useState` hook

- functional/controlled components
  ✅ functional/controlled components have no state
  ✅ functional/controlled components can have more properties than stateful components
  ❌ functional/controlled components are harder to compose than stateful components
  ❌ functional/controlled components are not type safe
