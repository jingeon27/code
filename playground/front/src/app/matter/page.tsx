'use client'

import Matter from "matter-js";
import React, { useEffect, useRef } from "react";

const MatterDemo: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Matter.js 엔진과 월드 생성
    const engine = Matter.Engine.create();
    const world = engine.world;

    // 2. 렌더 설정
    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false, // 물체를 색상과 함께 렌더링
        background: "#f8f9fa",
      },
    });

    // 3. 지정된 물체들 생성
    const ground = Matter.Bodies.rectangle(400, 580, 810, 40, {
      isStatic: true, // 고정된 물체
      render: { fillStyle: "green" },
    });

    const boxA = Matter.Bodies.rectangle(200, 200, 80, 80, {
      restitution: 0.5, // 반발력
      render: { fillStyle: "blue" },
    });

    const boxB = Matter.Bodies.rectangle(400, 50, 60, 100, {
      restitution: 0.8,
      render: { fillStyle: "red" },
    });

    const circle = Matter.Bodies.circle(600, 100, 50, {
      restitution: 0.9,
      render: { fillStyle: "orange" },
    });

    const polygon = Matter.Bodies.polygon(300, 0, 5, 40, {
      restitution: 0.7,
      render: { fillStyle: "purple" },
    });

    // 4. 월드에 물체 추가
    Matter.World.add(world, [ground, boxA, boxB, circle, polygon]);

    // 5. 엔진 실행 및 렌더링
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // 6. 마우스 드래그 기능 추가 (선택적)
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);

    // 7. 클린업
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default MatterDemo;
