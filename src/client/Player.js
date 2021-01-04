// Generated by CoffeeScript 2.5.1
var Player;

import TWEEN from "@tweenjs/tween.js";

import {
  Mesh
} from '@babylonjs/core/Meshes/mesh';

import '@babylonjs/core/Meshes/Builders/boxBuilder';

Player = class Player {
  constructor(noa) {
    var _this, animate, dat, h, mesh, w;
    _this = this;
    this.noa = noa;
    this.player = this.noa.playerEntity;
    this.scene = this.noa.rendering.getScene();
    dat = noa.entities.getPositionData(this.player);
    w = dat.width;
    h = dat.height;
    mesh = Mesh.CreateBox('player-mesh', 0, this.scene);
    mesh.scaling.x = w;
    mesh.scaling.z = w;
    mesh.scaling.y = h;
    this.noa.entities.addComponent(this.player, this.noa.entities.names.mesh, {
      mesh: mesh,
      offset: [0, h / 2, 0]
    });
    this.body = this.noa.physics.bodies[0];
    setInterval(function() {
      _this.resetForces();
    });
    // @noa.inputs.down.on 'fire',()->
    // 	if _this.noa.targetedBlock
    // 		_this.noa.setBlock 0, _this.noa.targetedBlock.position
    // 	return
    // @noa.inputs.down.on 'alt-fire',()->
    // 	if _this.noa.targetedBlock
    // 		_this.noa.addBlock grassID, _this.noa.targetedBlock.adjacent
    // 	return
    // @noa.inputs.bind 'alt-fire', 'E'
    this.noa.on('tick', function(dt) {
      var scroll;
      scroll = _this.noa.inputs.state.scrolly;
      if (scroll !== 0) {
        _this.noa.camera.zoomDistance += scroll > 0 ? 1 : -1;
        if (_this.noa.camera.zoomDistance < 0) {
          _this.noa.camera.zoomDistance = 0;
        }
        if (_this.noa.camera.zoomDistance > 10) {
          _this.noa.camera.zoomDistance = 10;
        }
      }
    });
    animate = function(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    };
    requestAnimationFrame(animate);
    return;
  }

  updatePosition(x, y, z) {
    var _this, data_from, data_to, pos, tw;
    _this = this;
    pos = this.noa.entities.getPosition(this.player);
    data_from = {
      x: pos[0],
      y: pos[1],
      z: pos[2]
    };
    data_to = {
      x: -x,
      y,
      z
    };
    tw = new TWEEN.Tween(data_from).to(data_to, 100).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
      // console.log [data_from.x,data_from.y,data_from.z]
      _this.noa.entities.setPosition(_this.player, [data_from.x, data_from.y, data_from.z]);
    }).start();
  }

  resetForces() {
    this.body.velocity[0] = 0;
    this.body.velocity[1] = 0;
    this.body.velocity[2] = 0;
    this.body._forces[0] = 0;
    this.body._forces[1] = 0;
    this.body._forces[2] = 0;
    this.body._impulses[0] = 0;
    this.body._impulses[1] = 0;
    this.body._impulses[2] = 0;
    this.body.gravityMultiplier = 0;
  }

};

export {
  Player
};
