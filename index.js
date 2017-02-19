// Experimental ECS JS engine

// game loop
var main = require('main'),
  // Entity class
  ecs = require('ecs'),

  // built-in systems
  //systems = require('systems'),

  // keypoller and keymap
  keyPoller = require('key_poller'),
  keys = require('keys');

module.export = {
  'main': main,
  'ecs': ecs,
  'keyPoller': keyPoller,
  'keys': keys
};