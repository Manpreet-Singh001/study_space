import React, { useEffect, useRef } from "react";
import p5 from "p5";

const s = (sketch) => {
  let fish, fish_left;
  let fish3, fish3_right;
  let fishes = [];
  let MAX_SPEED = 10;

  let ORIGIN;

  sketch.preload = () => {
    fish = sketch.loadImage("/fish.gif");
    fish_left = sketch.loadImage("/fish_left.gif");
    fish3 = sketch.loadImage("/fish3.gif");
    fish3_right = sketch.loadImage("/fish3_right.gif");
  };

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.angleMode(sketch.DEGREES);

    ORIGIN = sketch.createVector(sketch.width, 0);

    for (let i = 0; i < 5; i++) {
      fishes.push(
        new boid(
          sketch.createVector(
            sketch.random(sketch.width),
            sketch.random(sketch.height)
          ),
          [fish, fish_left]
        )
      );
    }
    for (let i = 0; i < 80; i++) {
      fishes.push(
        new boid(
          sketch.createVector(
            sketch.random(sketch.width),
            sketch.random(sketch.height)
          ),
          [fish3, fish3_right]
        )
      );
    }
  };

  sketch.draw = () => {
    sketch.background(sketch.color(14, 90, 161));

    // spawn bubbles randomly
    // sketch.circle(
    //   sketch.random(sketch.width),
    //   sketch.random(sketch.height),
    //   sketch.random(10, 15)
    // );

    for (const fish of fishes) {
      avoidOthersAndMatchNeighbors(fish);
      fish.show();
      keepWithinBounds(fish);
    }
  };

  // needs a position, direction, speed
  function boid(pos, imgs) {
    this.pos = pos;
    this.vel = sketch.createVector(
      sketch.random(7, 8) * getOne(),
      sketch.random(7, 8) * getOne()
    );
    this.angle = 0;
    this.imgs = imgs;

    // draw a triangle based on pos
    this.show = () => {
      this.vel.limit(MAX_SPEED);
      // this.pos.add(this.dest);
      this.angle = ORIGIN.angleBetween(
        p5.Vector.sub(this.pos, p5.Vector.add(this.pos, this.vel))
      );
      rotate_and_draw_image(
        this.imgs,
        this.pos.x,
        this.pos.y,
        this.imgs[0].width / 2,
        this.imgs[0].height / 2,
        this.angle
      );
      this.pos.add(
        p5.Vector.normalize(this.vel).mult(
          (sketch.deltaTime / 50) * this.vel.mag()
        )
      );
    };
  }

  function rotate_and_draw_image(
    imgs,
    img_x,
    img_y,
    img_width,
    img_height,
    img_angle
  ) {
    let img = imgs[0];
    if (Math.abs(img_angle) > 90) {
      img = imgs[1];
      img_angle -= 180;
    }
    sketch.push();
    sketch.imageMode(sketch.CENTER);
    sketch.translate(img_x + img_width / 2, img_y + img_width / 2);

    sketch.rotate(img_angle);
    sketch.image(img, 0, 0, img_width, img_height);
    sketch.rotate(img_angle);
    sketch.translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
    sketch.imageMode(sketch.CORNER);
    sketch.pop();
  }

  function flyTowardsCenter(boid) {
    const centeringFactor = 0.05; // adjust velocity by this %

    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    for (let otherBoid of fishes) {
      if (Math.abs(boid.pos.dist(otherBoid.pos)) < 80) {
        centerX += otherBoid.pos.x;
        centerY += otherBoid.pos.y;
        numNeighbors += 1;
      }
    }

    if (numNeighbors) {
      centerX = centerX / numNeighbors;
      centerY = centerY / numNeighbors;

      boid.dest.x += (centerX - boid.pos.x) * centeringFactor;
      boid.dest.y += (centerY - boid.pos.y) * centeringFactor;
    }
  }

  function keepWithinBounds(boid) {
    const margin = 200;
    const turnFactor = sketch.random(4, 8);
    let angle = 80;

    if (boid.pos.x < margin) {
      boid.vel.x = Math.abs(boid.vel.x) * sketch.cos(angle) * turnFactor;
    }
    if (boid.pos.x + margin > sketch.width) {
      boid.vel.x = -1 * Math.abs(boid.vel.x) * sketch.cos(angle) * turnFactor;
    }
    if (boid.pos.y < margin) {
      boid.vel.y = Math.abs(boid.vel.y) * sketch.cos(angle) * turnFactor;
    }
    if (boid.pos.y + margin > sketch.height) {
      boid.vel.y = -1 * Math.abs(boid.vel.y) * sketch.cos(angle) * turnFactor;
    }
  }

  function avoidOthersAndMatchNeighbors(boid) {
    let avoidDis = 25;
    let viewDis = 80;
    let comDis = 170;
    let steerAway = sketch.createVector(0, 0);

    let matchVel = sketch.createVector(0, 0);
    let matched = 1;

    let com = sketch.createVector(0, 0);
    let comMatched = 1;
    // check for nearby boids
    for (const fish of fishes) {
      if (fish !== boid && Math.abs(fish.pos.dist(boid.pos)) < avoidDis) {
        steerAway.add(p5.Vector.sub(boid.pos, fish.pos));
      }
      if (fish !== boid && Math.abs(fish.pos.dist(boid.pos)) < viewDis) {
        matchVel.add(fish.vel);
        matched++;
      }
      // steer towards center of mass
      if (Math.abs(fish.pos.dist(boid.pos)) < comDis) {
        com.add(fish.pos);
        comMatched++;
      }
    }
    boid.vel.add(steerAway.mult(MAX_SPEED / (10 * 2)));
    boid.vel.add(matchVel.div(matched).mult(MAX_SPEED / 100));
    boid.vel.add(
      p5.Vector.sub(com.div(comMatched), boid.pos).mult(MAX_SPEED / (1000 * 7))
    );
  }

  function getOne() {
    return sketch.random([-1, 1]);
  }
};

function Boid(props) {
  const ref = useRef(null);

  useEffect(() => {
    const myP5 = new p5(s);
  }, []);

  return <div ref={ref}></div>;
}

export default Boid;
