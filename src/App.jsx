import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { TextGeometry, FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

function App() {
  const refContainer = useRef(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(0, 1, 2);
    scene.add(pointLight);

    // Use the ref as a mount point for the renderer
    refContainer.current.innerHTML = "";
    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    // Create a gradient background
    const gradientPlaneGeometry = new THREE.PlaneGeometry(75, 75*window.innerHeight / window.innerWidth);
    const gradientPlaneMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x110033) }, // Light blue
        color2: { value: new THREE.Color(0x4488aa) }  // Green
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const gradientPlane = new THREE.Mesh(gradientPlaneGeometry, gradientPlaneMaterial);
    gradientPlane.position.z = -10; // Move the gradient plane back
    scene.add(gradientPlane);

    const geometry = new THREE.BoxGeometry(1.5, 2, 0.1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xaa2200,
      metalness: 0.5,
      roughness: 0.5,
    });
    const book1 = new THREE.Mesh(geometry, material);
    const group1 = new THREE.Group();
    scene.add(group1);
    book1.position.set(-0.75, 0, 0)
    group1.add(book1);
    group1.rotation.y = Math.PI/2
    const book2 = new THREE.Mesh(geometry, material);
    const group2 = new THREE.Group();
    scene.add(group2);
    book2.position.set(0.75, 0, 0)
    group2.add(book2);
    group2.rotation.y = -Math.PI/2

    const pageometry = new THREE.BoxGeometry(1.3, 1.8, 0.01);
    const paper = new THREE.MeshStandardMaterial({
      color: 0xede1d1,
      metalness: 0.5,
      roughness: 0.5,
    });
    const page1 = new THREE.Mesh(pageometry, paper);
    page1.position.set(0.65, 0, 0.05);
    const pages1 = new THREE.Group();
    pages1.add(page1)
    scene.add(pages1);
    pages1.rotation.y = -Math.PI/2
    const page2 = new THREE.Mesh(pageometry, paper);
    page2.position.set(-0.65, 0, 0.05);
    const pages2 = new THREE.Group();
    pages2.add(page2)
    scene.add(pages2);
    pages2.rotation.y = Math.PI/2

    const page3 = new THREE.Mesh(pageometry, paper);
    page3.position.set(0.65, 0, 0.05);
    const pages3 = new THREE.Group();
    pages3.add(page3)
    scene.add(pages3);
    pages3.rotation.y = -Math.PI/2

    const page4 = new THREE.Mesh(pageometry, paper);
    page4.position.set(0.65, 0, 0.05);
    const pages4 = new THREE.Group();
    pages4.add(page4)
    scene.add(pages4);
    pages4.rotation.y = -Math.PI/2

    const page5 = new THREE.Mesh(pageometry, paper);
    page5.position.set(0.65, 0, 0.05);
    const pages5 = new THREE.Group();
    pages5.add(page5)
    scene.add(pages5);
    pages5.rotation.y = -Math.PI/2
    
    const page6 = new THREE.Mesh(pageometry, paper);
    page6.position.set(0.65, 0, 0.05);
    const pages6 = new THREE.Group();
    pages6.add(page6)
    scene.add(pages6);
    pages6.rotation.y = -Math.PI/2

    const newText = (font, page, str, x, y, z) => {
      let textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
      let textGeometry = new TextGeometry(str, {
        font: font,
        size: 0.19,
        depth: 0.0001,
      });
      let textMesh = new THREE.Mesh(textGeometry, textMaterial);

      page.add(textMesh);
      textMesh.position.set(x, y, z);
    }

    camera.position.z = 5;
    var slide = 0

    var animating = true

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (animating){
          slide-=1
        }
      } else if (event.key === "ArrowRight") {
        if (animating){
          slide+=1
        }
      }
    };
    const onClick = () => {
      if (animating){
        slide+=1
      }
    }
    renderer.domElement.addEventListener('mousedown', onClick)
    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    const pgeo = new THREE.CircleGeometry(0.01, 32)
    var parts = new THREE.Group()
    scene.add(parts)

    const light = new THREE.PointLight(0xffffff, 10);
    light.position.set(0, 11, 2);
    scene.add(light);
    const blackHoleGeo = new THREE.SphereGeometry(1, 32, 32); // Radius 1, 32 width segments, 32 height segments
    const planetGeo = new THREE.SphereGeometry(0.5, 32, 32); // Radius 1, 32 width segments, 32 height segments
    const blackHoleMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const planetMat1 = new THREE.MeshStandardMaterial({
      color: 0x478be7,
      metalness: 0.5,
      roughness: 0.5,
    });
    const planetMat2 = new THREE.MeshStandardMaterial({
      color: 0x877882,
      metalness: 0.5,
      roughness: 0.5,
    });
    const planetMat3 = new THREE.MeshStandardMaterial({
      color: 0x228c22,
      metalness: 0.5,
      roughness: 0.5,
    });
    const blackHole = new THREE.Mesh(blackHoleGeo, blackHoleMat);
    scene.add(blackHole);
    blackHole.position.set(0, 10, 0)

    const planet1 = new THREE.Mesh(planetGeo, planetMat1);
    const sphere1 = new THREE.Group();
    sphere1.add(planet1);
    scene.add(sphere1)
    sphere1.position.set(0, 10, 0)
    planet1.position.set(2, 0, 0)

    const planet2 = new THREE.Mesh(planetGeo, planetMat2);
    const sphere2 = new THREE.Group();
    sphere2.add(planet2);
    scene.add(sphere2)
    sphere2.position.set(0, 10, 0)
    planet2.position.set(2, 0, 0)
    sphere2.rotation.y = 2*Math.PI/3

    const planet3 = new THREE.Mesh(planetGeo, planetMat3);
    const sphere3 = new THREE.Group();
    sphere3.add(planet3);
    scene.add(sphere3)
    sphere3.position.set(0, 10, 0)
    planet3.position.set(2, 0, 0)
    sphere3.rotation.y = 4*Math.PI/3

    const orbit = function () {
      requestAnimationFrame(orbit);
      sphere1.rotation.y+=0.00005
      sphere2.rotation.y+=0.00005
      sphere3.rotation.y+=0.00005
    }

    var runOnce = true
    const animate = function () {
      requestAnimationFrame(animate);
      if (slide==0){
        if (runOnce){
          animating=false
          runOnce = false
          const loader = new FontLoader();
          loader.load('src/fonts/EB Garamond_Regular.json', (font) => {
            newText(font, pages3, 'Brief', 0.425, 0.4, 0.055)
            newText(font, pages3, 'Answers', 0.225, 0.1, 0.055)
            newText(font, pages3, 'to the Big', 0.175, -0.2, 0.055)
            newText(font, pages3, 'Questions', 0.15, -0.5, 0.055)
          });
        }
        group1.rotation.y -= 0.01;
        group2.rotation.y += 0.01;
        pages1.rotation.y += 0.01;
        pages2.rotation.y -= 0.01;
        pages3.rotation.y += 0.01;
        pages4.rotation.y += 0.01;
        pages5.rotation.y += 0.01;
        pages6.rotation.y += 0.01;

        group1.rotation.x -= 0.005;
        group2.rotation.x -= 0.005;
        pages1.rotation.x -= 0.005;
        pages2.rotation.x -= 0.005;
        pages3.rotation.x -= 0.005;
        pages4.rotation.x -= 0.005;
        pages5.rotation.x -= 0.005;
        pages6.rotation.x -= 0.005;
        if (group1.rotation.y<=Math.PI/4-0.01){
          slide=1
          runOnce = true
          animating = true
        }
      }
      if (slide==2){
        if (runOnce){
          animating = false
          runOnce = false
          const loader = new FontLoader();
          loader.load('src/fonts/EB Garamond_Regular.json', (font) => {
            newText(font, pages4, 'Nonfiction', 0.1, 0.25, 0.055)
            newText(font, pages4, 'or', 0.6, -0.05, 0.055)
            newText(font, pages4, 'Fiction?', 0.3, -0.35, 0.055)
          });
        }
        pages3.rotation.y -= 0.02;
        if (pages3.rotation.y<=-3*Math.PI/4+0.01){
          scene.remove(pages3)
          slide=3
          runOnce = true
          animating = true
        }
      }
      if (slide==4){
        if (runOnce){
          animating = false
          runOnce = false
          const loader = new FontLoader();
          loader.load('src/fonts/EB Garamond_Regular.json', (font) => {
            newText(font, pages5, 'Is time', 0.3, 0.25, 0.055)
            newText(font, pages5, 'travel', 0.36, -0.05, 0.055)
            newText(font, pages5, 'possible?', 0.2, -0.35, 0.055)
          });
        }
        pages4.rotation.y -= 0.02;
        if (pages4.rotation.y<=-3*Math.PI/4+0.01){
          scene.remove(pages4)
          slide=5
          runOnce = true
          animating = true
        }
      }
      if (slide==6){
        if (runOnce){
          animating = false
          runOnce = false
          const loader = new FontLoader();
          loader.load('src/fonts/EB Garamond_Regular.json', (font) => {
            newText(font, pages6, 'Why do', 0.3, 0.25, 0.055)
            newText(font, pages6, 'we', 0.55, -0.05, 0.055)
            newText(font, pages6, 'read?', 0.45, -0.35, 0.055)
          });
        }
        pages5.rotation.y -= 0.02;
        if (pages5.rotation.y<=-3*Math.PI/4+0.01){
          scene.remove(pages5)
          slide=7
          runOnce = true
          animating = true
        }
      }
      if (slide==8){
        if (runOnce){
          animating = false
          runOnce = false
        }
        pages6.rotation.y -= 0.02;
        if (pages6.rotation.y<=-3*Math.PI/4+0.01){
          scene.remove(pages6)
          slide=9
          runOnce = true
          animating = true
        }
      }
      if (slide>8){
        for (let i=0; i<parts.children.length; i++){
          let p = parts.children.at(i)
          if (p.material.opacity<=1){
            p.material.opacity+=0.01
          }
          p.position.y+=0.01
          p.position.x+=Math.sin(p.position.y*10+i)*0.005
        }
        if (Math.random()>0.8){
          let pmat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.5,
            roughness: 0.5,
            opacity: 0,
            transparent: true
          });
          let part = new THREE.Mesh(pgeo, pmat)
          parts.add(part)
          part.position.set(Math.random()-0.5, 0, 1)
        }
      }
      if (slide==10){
        if (runOnce){
          animating = false
          runOnce = false
        }
        orbit()
        camera.position.y += 0.1;
        if (camera.position.y>=11){
          slide=11
          runOnce = true
          animating = true
        }
      }
      if (slide==12){
        if (runOnce){
          animating = false
          runOnce = false
        }
        camera.position.y -= 0.1;
        camera.position.z += 0.1;
        if (camera.position.y<=5){
          slide=13
          runOnce = true
          animating = true
        }
      }
      if (slide==14){
        if (runOnce){
          animating = false
          runOnce = false
          let isDragging = false;
          let previousMousePosition = { x: 0, y: 0 };
          function onMouseDown(event) {
            isDragging = true;
          }
          function onMouseMove(event) {
            if (isDragging) {
              const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y,
              };
              // Rotate the scene based on mouse movement
              const rotationSpeed = 0.005;
              scene.rotation.y += deltaMove.x * rotationSpeed;
              scene.rotation.x += deltaMove.y * rotationSpeed;
            }
            previousMousePosition = { x: event.clientX, y: event.clientY };
          }
          function onMouseUp() {
            isDragging = false;
          }
          // Add event listeners
          renderer.domElement.addEventListener('mousedown', onMouseDown);
          renderer.domElement.addEventListener('mousemove', onMouseMove);
          renderer.domElement.addEventListener('mouseup', onMouseUp);
        }
        camera.position.z += 0.1;
        if (camera.position.z>=30){
          slide=15
          runOnce = true
          animating = true
        }
      }
      if (slide==16){
        slide=15
      }
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <>
      <div ref={refContainer}></div>
    </>
  );
}

export default App;
