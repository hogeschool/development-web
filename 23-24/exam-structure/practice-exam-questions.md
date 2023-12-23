# Introduction
This file contains a repository of all the questions that can be asked in the theory exam. The theory exam will consist of a small selection of these questions, and nothing else.

For each question, paste the code that implements the answer in the ```...``` block.

Deliver a copy of this file, renamed STUDENT-NUMBER.practice-exam-questions.md, with a ✅ for positive answers and an ❌ for negative answers.

## General knowledge about web dev and HTTP
- write a .rest file that performs the following operations:
  - GET the users from 100 to 200 with a paginated endpoint
  - POST a new user with an api token in the bearer token header
  - DELETE a user with an api token in the bearer token header

```
...
```

## ASP .Net
(counts for two questions)
- create a UserController controller that supports the following methods
  - GET the users between the `from` and `to` parameters
  - POST a new user
  - DELETE a user
  - all operations perform no operation
  - define a UserDiskStorage service that implements the methods for the controller in the previous question by saving and reading everything from disk
    - implement an IUserStorage inteface and use it in the UserController

```
...
```

- create an OrdersController controller that supports the following methods
  - GET all Orders within a given range of dates
  - GET all Orders belonging to a given user
  - GET all Orders made on a Monday
  - all operations are based on a static list of mocked Orders

```
...
```

- create a CustomersController controller that supports the following methods
  - GET all Customers with at least one active Contract (define a contract StartDate and EndDate)
  - GET all Customers managed by a given Salesperson
  - GET all Customers with a total contract value >= 1 million
  - all operations are based on a static list of mocked Customers and Contracts

```
...
```

- middlewares and filters
  - define a middleware that rejects all requests that do not have a certain bearer token
  - get the bearer token from the appsettings via options

```
...
```

## Typescript
- write a recursive function that adds all numbers in a given range

```
...
```

- write a function that adds all the numbers in an array

```
...
```

- write a function that converts a Student object to a Person object (define all relevant types)

```
...
```

- write a function that groups an `Immutable.List` of Person into an Immutable.Map by Age

```
...
```

- write a function that filters an `Immutable.List` of Person by `Age >= 18`

```
...
```

- write a function that transforms an `Immutable.List` of Person into an `Immutable.List` of their age with `map`

```
...
```


## React
- write a stateful Counter class component that accepts the initial value and the increment of the counter via `props`:

```
...
```

- write a stateful Counter functional component that accepts the initial value and the increment of the counter via `props`:

```
...
```

- write a stateless (controlled) functional Counter component that accepts the current value, increment, and `setValue` via props:

```
...
```

- write a stateful `People` component that maintains a `Map<Person["Id"], Person>` as state. Write a functional `Person` component that manages rendering and modifying each person in the map:

```
...
```


- write a stateful `Person` component that maintains a `Person` as state. Write a functional `Address` component that manages rendering and modifying the address of a given person (define type `Person` as containing an `Address` as a field):

```
...
```
