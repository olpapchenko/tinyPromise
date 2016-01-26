# tinyPromise
Tiny implementation of promises see: https://promisesaplus.com/

This Promise pattern implementation was created solely for academical reasons. This implementation does not pretend to completely implement all features described in original A+/promise proposal. But it implements all main features in less than 100 lines of code. This includes: 
<br/>
1) New promise can be either resolved or rejected. <br/>
2) All promises has `than` method that takes as argument two functions - first for resolution handling and second for rejection handling<br/>
3) `than` method returns new Promise in such a way using this Promise implementation we can omit the problem of the pyramid of doom.<br/> 
4) `than` handlers can return promise, next `then` in chain will be resolved wit the resolution value of the returned promise.<br/>
5) if promise was rejected it boobling until finding rejection handler.<br/>
6) there is convenient method `catch`.<br/>

This implemetation is simple(less than 100 lines), but it helps to understand how promise pattern can be implemented. This implementation do not pretend to be used in production environment. But it gives you idea of how promise pattern can be implemented.

# Bonus
can be used with `require.js` or `common.js`
