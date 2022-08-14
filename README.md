[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/beipack/cache-backpack/blob/master/LICENSE.md)
## Why
```
// Const assertion is useful, but lack type enforcement
const prodConfig = {
  environment: 'typo', 
  language: 'en',
} as const 

// Trying to type it will lead to us losing the benefits of the const assertion. 
interface Config {
  environment: 'dev' | 'staging' | 'prod'
  language: 'en' | 'zh'
}
const prodConfig: Config = {
  environment: 'prod', 
  language: 'en',
} as const;

// hovering over prodConfig.environment will resolve to 'dev' | 'staging' | 'prod' instead of just 'prod'
```


## Usage
```
npm install const-with-typing
```

```
import { makeAConstCreator } from 'const-with-typing'

// Define the shape of your constant
interface Config {
  environment: 'dev' | 'staging' | 'prod'
  language: 'en' | 'zh'
}

// Pass in as a type parameter
const createConfig = makeAConstCreator<Config>()


// Now we can create constants that has the type enforcement of Configuration
const qaConfig = createConfig({
  environment: 'qa', // should throw error
  language: 'en',
} as const)

const prodConfig = createConfig({ // prodConfig is a constant with narrowest type infered, similar to the direct usage of 'as const'
  environment: 'prod',
  language: 'en',
} as const)

// Now if we hover over prodConfig.environment it should resolve to just 'prod'
```
