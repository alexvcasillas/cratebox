!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.typeStore={})}(this,function(t){"use strict";var e=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},r={string:{name:"string",checker:function(t){return"string"==typeof t}},number:{name:"number",checker:function(t){return"number"==typeof t}},boolean:{name:"boolean",checker:function(t){return"boolean"==typeof t}},null:{name:"null",checker:function(t){return null===typeof t}},undefined:{name:"undefined",checker:function(t){return void 0===t}},date:{name:"date",checker:function(t){return t instanceof Date}}},n={_isDispatched:!0},i={descriptions:new Map,state:new Map,listeners:new Map,describeStore:function(t){if(this.descriptions.has(t.identifier))throw new Error("You can't describe a new store with the same identifier as a previously described one.");this.descriptions.set(t.identifier,e({},t.model))},getStoreDescriptions:function(){return this.descriptions},getStoreDescription:function(t){if(!this.descriptions.has(t))throw new Error("You're trying to get a store description that doesn't exists.");return this.descriptions.get(t)},getGlobalState:function(){return this.state},getState:function(t){var e=this.state.get(t).currentState;return this.state.get(t)._data.slice(e,e+1)[0]},dispatch:function(t){var r=t.identifier,i=t.model,s=this.getStoreDescription(r);Object.keys(i).forEach(function(t){if(!s[t].checker(i[t]))throw new Error('Type "'+typeof i[t]+'" cannot be setted to the property '+t+' described as a "'+s[t].name+'"')});var o,a,c=this.state.get(r);void 0!==c?(a=Object.assign({},c._data.slice(-1)[0],i),o=c._data.concat([a])):(o=[i],a=i);var u=o.length-1;this.state.set(r,e({},n,{currentState:u,_data:o})),this.listeners.has(r)&&this.listeners.get(r)(a)},travelForwards:function(t){var r=this.state.get(t),n=r.currentState+1;n>=r._data.length||(this.state.set(t,e({},r,{currentState:n})),this.listeners.get(t)(this.getState(t)))},travelBackwards:function(t){var r=this.state.get(t),n=r.currentState-1;n<0||(this.state.set(t,e({},r,{currentState:n})),this.listeners.get(t)(this.getState(t)))},travelTo:function(t,e){},subscribe:function(t,e){if(void 0===t)throw new Error("The subscription method needs a store to subscribe to");if("function"!=typeof e)throw new Error("Subscribe listener is expected to be a function.");if(!this.descriptions.has(t))throw new Error("You're tyring to subscribe changes for a non-existent store.");if(this.listeners.has(t))throw new Error("You're trying to set a listener to a store that already has a listener attached to it.");this.listeners.set(t,e)}};t.types=r,t.typeStore=i,Object.defineProperty(t,"__esModule",{value:!0})});
