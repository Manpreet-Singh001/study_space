import React, { useEffect, useRef } from "react";
import p5 from "p5";

const s = (sketch) => {
  let fish, fish_left;
  let fish3, fish3_right;
  let fishes = [];

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
          sketch.createVector(-1, 0),
          [fish, fish_left]
        )
      );
    }
    for (let i = 0; i < 40; i++) {
      fishes.push(
        new boid(
          sketch.createVector(
            sketch.random(sketch.width),
            sketch.random(sketch.height)
          ),
          sketch.createVector(-1, 0),
          [fish3, fish3_right]
        )
      );
    }
  };

  sketch.draw = () => {
    sketch.background(sketch.color(14, 90, 161));
    for (let i = 0; i < fishes.length; i++) {
      keepWithinBounds(fishes[i]);
      flyTowardsCenter(fishes[i]);
      avoidOthers(fishes[i]);
      fishes[i].show();

      // fishes[i].pos.add(fishes[i].dest);
    }
  };

  // needs a position, direction, speed
  function boid(pos, speed, imgs) {
    this.pos = pos;
    this.dest = sketch.createVector(1, 0);
    this.speed = speed;
    this.angle = 0;
    this.imgs = imgs;

    // draw a triangle based on pos
    this.show = () => {
      // this.pos.add(this.dest);
      if (this.pos.dist(this.dest) > 20) {
        this.angle = ORIGIN.angleBetween(
          p5.Vector.sub(this.pos, p5.Vector.add(this.pos, this.dest))
        );
        rotate_and_draw_image(
          this.imgs,
          this.pos.x,
          this.pos.y,
          this.imgs[0].width / 2,
          this.imgs[0].height / 2,
          this.angle
        );
      } else {
        rotate_and_draw_image(
          this.imgs,
          this.pos.x,
          this.pos.y,
          this.imgs[0].width / 2,
          this.imgs[0] / 2,
          this.angle
        );
      }
      this.pos.add(this.dest.normalize().mult((sketch.deltaTime / 50) * 5));
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
    const turnFactor = 1;

    if (boid.pos.x < margin) {
      boid.dest.x += turnFactor;
    }
    if (boid.pos.x > sketch.width - margin) {
      boid.dest.x -= turnFactor;
    }
    if (boid.pos.y < margin) {
      boid.dest.y += turnFactor;
    }
    if (boid.pos.y > sketch.height - margin) {
      boid.dest.y -= turnFactor;
    }
  }

  function avoidOthers(boid) {
    const minDistance = 80; // The distance to stay away from other boids
    const avoidFactor = 0.019; // Adjust velocity by this %
    let moveX = 0;
    let moveY = 0;
    for (let otherBoid of fishes) {
      if (otherBoid !== boid) {
        if (Math.abs(otherBoid.pos.dist(boid.pos)) < minDistance) {
          moveX += boid.pos.x - otherBoid.pos.x;
          moveY += boid.pos.y - otherBoid.pos.y;
        }
      }
    }

    boid.dest.x += moveX * avoidFactor;
    boid.dest.y += moveY * avoidFactor;
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
