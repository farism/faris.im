import React from 'react'
import { withRouter } from 'react-router'
import * as THREE from 'three'
import { TweenLite, TimelineLite, Power2, Back } from 'gsap/TweenMax'
import { MazeGenerator } from 'maze-es6-solver'

import styles from '../styles/scene.scss'

const ROTATE_SPEED = 0.5
const ZOOM_SPEED = 0.5

const pages = {
  about: {
    faces: [0, 1],
    color: 0xffb3ba, //red
    rotation: [0, -Math.PI / 2],
  },
  articles: {
    faces: [2, 3],
    color: 0xffdfba, // orange
    rotation: [0, Math.PI / 2],
  },
  projects: {
    faces: [4, 5],
    color: 0xffffba, // yellow
    rotation: [Math.PI / 2, 0],
  },
  resume: {
    faces: [6, 7],
    color: 0xbaffc9, // green
    rotation: [-Math.PI / 2, 0],
  },
  home: {
    faces: [8, 9],
    color: 0xbae1ff, // blue
    rotation: [0, 0],
  },
  game: {
    faces: [10, 11],
    color: 0x000000, // game
    rotation: [0, Math.PI],
  },
}

const createShadow = () => {
  const geometry = new THREE.PlaneBufferGeometry(100, 100)
  geometry.rotateX(-Math.PI / 2)

  const material = new THREE.MeshBasicMaterial({
    color: 0xbbbbbb,
  })

  return new THREE.Mesh(geometry, material)
}

const createCube = () => {
  const geometry = new THREE.BoxGeometry(100, 100, 100)

  Object.keys(pages).forEach(page => {
    pages[page].faces.forEach(face => {
      geometry.faces[face].color.setHex(pages[page].color)
    })
  })

  const cube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors })
  )

  const indicator = createGameIndicator()
  indicator.position.set(25, 25, -51)

  const group = new THREE.Group()
  group.add(cube)
  group.add(indicator)

  return group
}

const createGameIndicator = () => {
  const indicator = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  )

  return indicator
}

const createGlass = () => {
  const geometry = new THREE.BoxGeometry(110, 110, 110)
  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    transparent: true,
    opacity: 0.15,
  })

  geometry.faces.forEach(face => face.color.setHex(0xffffff))

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

const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: window.devicePixelRation < 2,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

const rotateX = (x, targets) =>
  targets.map(target =>
    TweenLite.to(target, ROTATE_SPEED, { x, ease: Back.easeOut })
  )

const rotateY = (y, targets) =>
  targets.map(target =>
    TweenLite.to(target, ROTATE_SPEED, { y, ease: Back.easeOut })
  )

class Scene extends React.Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.timeline = null

    const shadow = createShadow()
    const cube = createCube()
    const glass = createGlass()
    const camera = createCamera()
    const scene = createScene([shadow, cube, glass, camera])
    const renderer = createRenderer()

    cube.position.y = 100
    glass.position.y = 100
    camera.position.y = 100
    camera.position.z = 300

    this.state = {
      shadow,
      cube,
      glass,
      camera,
      scene,
      renderer,
    }

    window.addEventListener('resize', this.onResize)
  }

  componentDidMount() {
    this.container.current.appendChild(this.state.renderer.domElement)
    this.transition()
    this.animate()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.location.pathname !== this.props.location.pathname
  }

  componentDidUpdate() {
    this.transition()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.state.renderer.setSize(window.innerWidth, window.innerHeight)
    this.state.camera.aspect = window.innerWidth / window.innerHeight
    this.state.camera.updateProjectionMatrix()
    this.animate();
  }

  transition = () => {
    const page = this.props.location.pathname.replace('/', '')

    if (!pages[page]) {
      return
    }

    const { cube, glass, shadow, camera } = this.state
    const rotationX = pages[page].rotation[0]
    const rotationY = pages[page].rotation[1]

    const rotate = [
      rotateX(rotationX, [cube.rotation, glass.rotation]),
      rotateY(rotationY, [cube.rotation, glass.rotation, shadow.rotation]),
    ]
    const zoomOut = TweenLite.to(
      camera.position,
      ((300 - camera.position.z) / 300) * ZOOM_SPEED,
      { z: 300, ease: Power2.easeOut }
    )
    const zoomIn = TweenLite.to(camera.position, ZOOM_SPEED, {
      z: 51,
      ease: Power2.easeOut,
    })

    if (this.timeline) {
      this.timeline.eventCallback('onComplete', null)
      this.timeline.clear()
    }

    this.props.onTransitionBegin()

    this.timeline = new TimelineLite({
      onUpdate: this.animate,
      onComplete: this.props.onTransitionComplete,
    })
      .add(zoomOut)
      .add(rotate)
      .add(zoomIn)
  }

  animate = () => {
    this.state.renderer.render(this.state.scene, this.state.camera)
  }

  render() {
    return <div ref={this.container} className={styles['scene']} id="scene" />
  }
}

export default withRouter(Scene)
