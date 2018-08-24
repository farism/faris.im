import React from 'react'
import * as THREE from 'three'
import anime from 'animejs'

import styles from '../styles/scene.scss'

const createShadow = () => {
  const geometry = new THREE.PlaneBufferGeometry(100, 100)
  geometry.rotateX(-Math.PI / 2)

  const material = new THREE.MeshBasicMaterial({
    color: 0xbbbbbb,
    overdraw: 0.5,
  })

  return new THREE.Mesh(geometry, material)
}

const createCube = () => {
  const geometry = new THREE.BoxGeometry(100, 100, 100)

  for (var i = 0; i < geometry.faces.length; i += 2) {
    const hex = Math.random() * 0xffffff

    geometry.faces[i].color.setHex(hex)
    geometry.faces[i + 1].color.setHex(hex)
  }

  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5,
  })

  return new THREE.Mesh(geometry, material)
}

const createGlass = () => {
  const geometry = new THREE.BoxGeometry(110, 110, 110)

  geometry.faces.forEach(face => face.color.setHex(0x000000))

  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5,
    transparent: true,
    opacity: 0.15,
  })

  return new THREE.Mesh(geometry, material)
}

const createCamera = () => {
  return new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
}

const createScene = children => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)
  children.forEach(child => scene.add(child))

  return scene
}

const createRenderer = children => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.shadow = createShadow()
    this.cube = createCube()
    this.cube2 = createGlass()
    this.camera = createCamera()
    this.scene = createScene([this.shadow, this.cube, this.camera])
    this.renderer = createRenderer()
    this.container = React.createRef()

    this.cube.position.y = 100
    this.cube2.position.y = 100
    this.camera.position.y = 100
    this.camera.position.z = 51

    setTimeout(() => {
      anime({
        targets: this.camera.position,
        z: 300,
        easing: 'easeOutQuad',
        duration: 500,
        complete: () => {
          anime({
            targets: [this.shadow.rotation, this.cube.rotation],
            y: Math.PI / 2,
            duration: 1000,
            elasticity: 500,
          })
          anime({
            targets: [this.cube.rotation],
            x: Math.PI / 2,
            duration: 1000,
            elasticity: 500,
            complete: () => {
              anime({
                targets: this.camera.position,
                z: 51,
                easing: 'easeOutQuad',
                duration: 500,
                delay: 100,
              })
            },
          })
        },
      })
    }, 1000)

    window.addEventListener('resize', this.onResize)
  }

  componentDidMount() {
    this.container.current.appendChild(this.renderer.domElement)
    this.animate()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return <div ref={this.container} className={styles['scene']} id="scene" />
  }
}
