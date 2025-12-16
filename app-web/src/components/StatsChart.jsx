import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function StatsChart({ data, title, color, unit = '' }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    const width = containerRef.current.clientWidth;
    const height = 350;
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2,
      height / 2, height / -2,
      1, 1000
    );
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Matériaux
    const axesMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0xeeeeee });

    // Graph dimensions
    const padding = 100;
    const paddingBottom = 60;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding - paddingBottom;
    const stepX = graphWidth / (data.length - 1);

    const maxValue = Math.max(...data.map(d => d.value));

    // Axe X
    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-graphWidth / 2, -graphHeight / 2, 0),
      new THREE.Vector3(graphWidth / 2, -graphHeight / 2, 0)
    ]);
    scene.add(new THREE.Line(xAxisGeometry, axesMaterial));

    // Axe Y
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-graphWidth / 2, -graphHeight / 2, 0),
      new THREE.Vector3(-graphWidth / 2, graphHeight / 2, 0)
    ]);
    scene.add(new THREE.Line(yAxisGeometry, axesMaterial));

    // Graduations Y et grille
    const numGraduations = 5;
    data.forEach((d, i) => {});
    for (let i = 0; i <= numGraduations; i++) {
      const value = Math.round((maxValue / numGraduations) * i);
      const y = -graphHeight / 2 + (i / numGraduations) * graphHeight;

      // Graduation
      const gradGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-graphWidth / 2 - 8, y, 0),
        new THREE.Vector3(-graphWidth / 2, y, 0)
      ]);
      scene.add(new THREE.Line(gradGeometry, axesMaterial));

      // Ligne de grille
      const gridGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-graphWidth / 2, y, 0),
        new THREE.Vector3(graphWidth / 2, y, 0)
      ]);
      scene.add(new THREE.Line(gridGeometry, gridMaterial));

      // Texte de graduation
      const canvas = document.createElement('canvas');
      canvas.width = 120;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#444444';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), 110, 25);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(-graphWidth / 2 - 60, y, 0);
      sprite.scale.set(60, 25, 1);
      scene.add(sprite);
    }

    // Ligne du graphique
    const points = data.map((d, i) => {
      const x = -graphWidth / 2 + i * stepX;
      const y = -graphHeight / 2 + (d.value / maxValue) * graphHeight;
      return new THREE.Vector3(x, y, 0);
    });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ color });
    scene.add(new THREE.Line(lineGeometry, lineMaterial));

    // Points et labels
    const pointsGroup = new THREE.Group();
    const pointGeometry = new THREE.CircleGeometry(7, 32);

    data.forEach((d, i) => {
      const x = -graphWidth / 2 + i * stepX;
      const y = -graphHeight / 2 + (d.value / maxValue) * graphHeight;

      // Point
      const pointMaterial = new THREE.MeshBasicMaterial({ color });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, 1);
      pointsGroup.add(point);

      // Valeur
      const canvasVal = document.createElement('canvas');
      canvasVal.width = 100;
      canvasVal.height = 50;
      const ctxVal = canvasVal.getContext('2d');
      ctxVal.fillStyle = color;
      ctxVal.font = 'bold 22px Arial';
      ctxVal.textAlign = 'center';
      ctxVal.textBaseline = 'middle';
      ctxVal.fillText(d.value.toString(), 50, 25);

      const valTexture = new THREE.CanvasTexture(canvasVal);
      valTexture.needsUpdate = true;
      const valSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: valTexture }));
      valSprite.position.set(x, y + 30, 1);
      valSprite.scale.set(50, 25, 1);
      scene.add(valSprite);

      // Label X
      const canvasLabel = document.createElement('canvas');
      canvasLabel.width = 150;
      canvasLabel.height = 50;
      const ctxLabel = canvasLabel.getContext('2d');
      ctxLabel.fillStyle = '#444444';
      ctxLabel.font = 'bold 18px Arial';
      ctxLabel.textAlign = 'center';
      ctxLabel.textBaseline = 'middle';
      ctxLabel.fillText(d.label, 75, 25);

      const labelTexture = new THREE.CanvasTexture(canvasLabel);
      labelTexture.needsUpdate = true;
      const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture }));
      labelSprite.position.set(x, -graphHeight / 2 - 35, 0);
      labelSprite.scale.set(75, 30, 1);
      scene.add(labelSprite);
    });

    scene.add(pointsGroup);

    // Animation
    const animate = () => {
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [data, color]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {unit && <span className="text-sm text-gray-500 font-semibold">{unit}</span>}
      </div>
      <div ref={containerRef} className="w-full" style={{ minHeight: '350px' }} />
    </div>
  );
}

export default StatsChart;
