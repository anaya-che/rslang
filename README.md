# rslang

# Stack

**1. React.js** - allows build encapsulated components that manage their own state.
**Pros:** 
- Pretty simple syntax
- Virtual Object Model Document
- Repeated use of components
- React developer browser tools
- Huge community
- Permanent support with issues resolving

**Cons:** 
- Focus on the user interface => necessary to integrate additional tools for routing i.e.
- Poor documentation

**2. SCSS** - facilitates you to write clean, easy and less CSS in a programming construct. It contains fewer codes so you can write CSS quicker. It is more stable, powerful, and elegant.
**Pros:** 
- Clear code  
- More possibilities
- Allows you to use variables
- Nested rules, mixins and inline imports, etc. 

**Cons:** 
- Difficult troubleshooting
- Code has to be compiled

**3. MobX** - is a standalone library for managing the state of an application, which we use in conjunction with react.
**Pros:** 
- It lets you define specific pieces of data as being "observable", then wraps those up and tracks any changes made to that data and automatically updates any other piece of code that is observing the data. 
- It encourages use of standard mutating code, like someObject.someField = someValue, and someArray.push(someValue), with the real update logic being hidden internal to MobX.
- Idiomatic MobX code keeps your data in nested form and maintain direct references from one object to another

**Cons:** 
- Hard to debug
- Documentation for mobx-react could be better

**4. Typescript** - is a strict syntactical superset of JavaScript and adds optional static typing to the language.
**Pros:** 
- Strict typing
- Structural typing
- Implicit typing
- Easier to debug
- Quicker development
- Increases overall performance

**Cons:** 
- More initial setup
- Overly complicated typing system
- Required compilation while JS doesn’t

**5. Chart.js** - is an easy way to include animated, interactive graphs on your website.
**Pros:** 
- 9 types of graphs and charts: Line, Linear with Areas, Bar, Doughnut and Pie, Radar, Polar, Bubble and Scatterplot (Scatter) and Mixed Chart Types. 
- All types of graphs can be customized and animated, and they are all responsive when working on the web. 
- The functionality can be extended through the use of plugins.

**Cons:** 
- Pure library approach that Chart.js represents does not provide data extraction utilities, integrations to different data sources, data collection, transformation (ETL), data warehousing, administration UIs, role management nor configurable interactive widgets, so, for more complex visualization you should prefer other tools.

**6. Axios** - promise based HTTP client for the browser and node.js.
**Pros:** 
- Compatible with some older browsers (ie. IE11)
- Provides Cancelling Request ⇒ that can also be done without Axios using AbortController)
- Very popular third-party library actively supported
- Wrapper / decorator pattern which offers nice and convenient interface

**Cons:** 
- Must be installed and imported (not native in JavaScript)
- Not the standard so it is important to manage the conflict possibilities
- Third-party libraries adds weight/load on the application or website (to be considered)

**7. Git** - distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
