#Overview

This repo contains 2 projects with feature parity, one based on React v15 and one based on Angular 4. 
Aside from RxJS, there are no additional libraries outside the framework itself and no clutter. 
The Angular app was generated with the [Angular CLI](https://github.com/angular/angular-cli) and the 
React app was generated with [create-react-app](https://github.com/facebookincubator/create-react-app).
Performance Results were calculated for each using optimized production builds of each.

The purpose of these 2 projects is to compare Angular and React rendering performance in scenarios 
where there are many DOM elements updating extremely quickly, which is a common in industries 
consuming real-time data feeds.
 
Each app instantiates a preset number of simple components (defaults to 1000) and kicks off an 
RxJS Observable data stream that publishes every 50ms. Each component contains 2 bindings that 
update on each tick, where the first binding represents the timeInterval from the previous update to 
the current and the 2nd binding contains the updated data it received from the Observable. 

Due to the single-threaded nature of JavaScript, the RxJS timeInterval (1st binding) is a 
simple representation of how quickly each framework can process a data update given a consistent number 
of microtasks on the event loop - the closer it is to the publisher's 50ms rate, the better. 

   

#Results

Angular consistently outperforms React in its ability to render  

The Chrome Dev Tools "Performance" Panel allows further introspection into the sl

## 100 components, 50ms updates
### React (left) vs. Angular (right) 
![Angular vs React Performance 100 components, 50ms updates](./100-components-ng-vs-react-perf.png)

## 1000 components, 50ms updates

### Angular
![Angular Performance 1000 components, 50ms updates](./ng-perf-1000-components.png)

### React
![React Performance 1000 components, 50ms updates](./react-perf-1000-components.png)

