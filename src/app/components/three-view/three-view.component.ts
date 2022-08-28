import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

function createLine(): THREE.Line {
  const material = new THREE.LineBasicMaterial( { color: 0xff00ff } );
  
  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );
  
  const geometry = new THREE.BufferGeometry().setFromPoints( points );    
  const line = new THREE.Line( geometry, material );

  return line;
}

function createScene(): THREE.Scene {
  return new THREE.Scene();
}

function createCamera(width: number, height: number): THREE.Camera {
  const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 500 );
  camera.position.set( 0, 0, 100 );
  camera.lookAt( 0, 0, 0 );
  return camera;
}

function createRenderer(canvas: HTMLCanvasElement, width: number, height: number): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize( width, height );
  return renderer;
}

@Component({
  selector: 'app-three-view',
  templateUrl: './three-view.component.html',
  styleUrls: ['./three-view.component.css']
})
export class ThreeViewComponent implements AfterViewInit {

  @ViewChild('canvas', {static: false}) canvasRef!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.Camera;
  renderer!: THREE.WebGLRenderer;

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  get width(): number {
    return window.innerWidth;
  }

  get height(): number {
    return window.innerHeight;
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initThree();
    this.initScene();
    this.drawScene();
  }

  initThree() {
    this.renderer = createRenderer(this.canvas, this.width, this.height);
    this.camera   = createCamera(this.width, this.height);    
    this.scene    = createScene();
  }

  initScene() {
    this.scene.add(createLine());
  }

  drawScene() {
    this.renderer.render(this.scene, this.camera);
  }
}
