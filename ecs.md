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

