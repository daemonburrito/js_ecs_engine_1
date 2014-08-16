# ECS plan

## Performance Hack

Use new JS data types (buffers, uint32array) to address entities).

## Entities
* Player

## Components
* Movement
* Input
* Position

## Systems
* Render
* Position

## Input

Create a "keypoller" object which keeps state and can be asked what key is currently pressed in a System.

The keypoller is responsible for setting up a listener (on document) or destroying it. A system will ask the keypoller object like:

```
keypoller.is_pressed(32)
```

## `Object.observe()`

We can use `Object.observe()` (or shim) to let systems know when a component that they're interested in has been added, and then remove code that iterates through all entities. It will be an implicit "SystemManager".
