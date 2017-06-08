#Overview

This repo contains 2 projects with feature parity, one based on React v15 and one based 
on Angular 4. Aside from RxJS, there are no additional libraries outside the framework 
itself and no clutter. The Angular app was generated with the 
[Angular CLI](https://github.com/angular/angular-cli) and the React app was generated 
with [create-react-app](https://github.com/facebookincubator/create-react-app). 
Performance Results were calculated for each using optimized production builds of each.

The purpose of these 2 projects is to compare Angular and React rendering performance in 
scenarios where there are many DOM elements updating extremely quickly, which is a common 
in industries consuming real-time data feeds.
 
Each app instantiates a preset number of simple components (configured through 
`initialQuantity` property in [app.component.ts](./ang/src/app/app.component.ts) and
 [App.js](./react/src/App.js)). Each component kicks off an RxJS Observable data stream 
 that publishes every 50ms. Each component contains 2 bindings that update on each tick, 
 where the first binding represents the timeInterval from the previous update to the 
 current and the 2nd binding contains the updated data it received from the Observable. 

# Procedure
1. Prepare a fresh Chrome: Disable any relevant extensions, clear caches, close all other
 tabs/windows, etc.
1. Run `npm install` from both Angular and React app project roots.
1. Set the `initialQuantity` property in both [app.component.ts](./ang/src/app/app.component.ts) 
and [App.js](./react/src/App.js)) to the desired number of controls you'd like to test.
1. Run production optimized builds of both apps from each project root `npm run build`
1. Serve up the generated assets using your favorite http-server for each project (one 
project at a time). I use `npm install -g serve` `serve -s build`
1. We are focused on update speed and not initial load so wait until the DOM loads and
 then run the Performance Test from Chrome Developer Tools for your test duration.
1. For each test run, record the exact scripting time and total test duration.
1. Make sure to start fresh for each test, close the page, clear the cache, clear the 
performance profiler.

#Results

tldr: Angular consistently outperforms React in its ability to quickly deliver real-time 
data updates to the UI. We currently include results both stats and screenshots for 20
 test runs found under test-results](./test-results) 


2 tests were performed on both Angular with 0 Tests were performed, the results for each test were 



- Chrome Dev Tools t

- RxJS timeInterval() - Visual Representation of Thoroughput

Due to the single-threaded nature of JavaScript, the RxJS timeInterval (1st binding) is a 
simple visual representation of how quickly each framework can process a data update 
given a consistent number of microtasks on the event loop - the closer it is to the 
publisher's 50ms rate, the better. While 


The Chrome Dev Tools "Performance" Panel allows further introspection into the sl

## 100 components, 50ms updates
### React (left) vs. Angular (right) 
![Angular vs React Performance 100 components, 50ms updates](./100-components-ng-vs-react-perf.png)

## 1000 components, 50ms updates

### Angular
![Angular Performance 1000 components, 50ms updates](./ng-perf-1000-components.png)

### React
![React Performance 1000 components, 50ms updates](./react-perf-1000-components.png)



###Environment:
- macOS Sierra (10.12.5)
- Chrome 58.0.3029.110 (64-bit)
- MacBook Pro (Retina, Mid 2012) 2.6 GHz i7
- 512gb SSD
- 16 GB DDR3
- nVidia GeForce GT 650M 1024 MB