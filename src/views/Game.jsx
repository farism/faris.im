import React from 'react'
import * as THREE from 'three'
import cx from 'classnames'
import { MazeGenerator } from 'maze-es6-solver'
import PF from 'pathfinding'
import Mousetrap from 'mousetrap'

import styles from '../styles/game.scss'
import OrbitControls from '../vendor/OrbitControls'
import Modal, { EASY } from './Modal'
import Controls from './Controls'

OrbitControls(THREE)

const createMap = difficulty => {
  let start = [0, 0]
  let end = [0, 0]
  const maze = new MazeGenerator(difficulty + 1, difficulty).run()
  const matrix = maze.map((row, i) =>
    row.map((col, j) => {
      if (col === 'E') {
        start = [i, j]
      } else if (col === 'G') {
        end = [i, j]
      }

      return col === '=' ? 1 : 0
    })
  )
  const grid = new PF.Grid(matrix)
  const pf = new PF.AStarFinder()
  const solution = pf.findPath(start[1], start[0], end[1], end[0], grid)

  return {
    start,
    end,
    maze,
    matrix,
    solution,
  }
}

const createFrustrum = () => {
  const frustumSize = 5
  const aspect = window.innerWidth / window.innerHeight

  return [
    -(frustumSize * aspect) / 2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    -frustumSize / 2,
  ]
}

const creatFloor = cubes => {
  const box = new THREE.Box3().setFromObject(cubes)
  const floor = new THREE.GridHelper(500, 500, 0x444444, 0x444444)
  const center = box.getCenter()
  floor.position.set(center.x / 2, -0.5, center.z / 2 + 0.5)

  return floor
}

const createPlayer = () => {
  const geometry = new THREE.BoxGeometry(1, 0.5, 1)

  const material = new THREE.MeshLambertMaterial({
    color: 0xff6600,
    overdraw: 0.5,
  })

  const player = new THREE.Mesh(geometry, material)
  player.position.set(0, -0.25, 2)

  return player
}

const createCube = (height = 1, opacity = 1, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(1, height, 1)

  const material = new THREE.MeshLambertMaterial({
    color,
    opacity,
    transparent: true,
    overdraw: 0.5,
  })

  return new THREE.Mesh(geometry, material)
}

const createWalls = matrix => {
  const group = new THREE.Group()

  matrix
    .reduce((acc, row, i) => {
      const walls = row.reduce((acc, col, j) => {
        if (matrix[i][j] === 1) {
          const cube = createCube()

          cube.position.x = i
          cube.position.z = j

          acc.push(cube)
        }

        return acc
      }, [])

      return acc.concat(walls)
    }, [])
    .forEach(cube => group.add(cube))

  return group
}

const createSolution = solution => {
  const group = new THREE.Group()

  solution.forEach(position => {
    const cube = createCube(0.1, 0, 0x00ff00)
    cube.position.x = position[1]
    cube.position.z = position[0]
    group.add(cube)
  })

  group.position.y = 0.45

  return group
}

const createLight = () => {
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.x = Math.random() - 0.5
  light.position.z = Math.random() - 0.5
  light.position.y = 5
  light.position.normalize()

  return light
}

const createCamera = () => {
  const frustum = createFrustrum()

  return new THREE.OrthographicCamera(...frustum, 0.1, 3000)
}

const createOrbit = (camera, renderer) => {
  const orbit = new THREE.OrbitControls(camera, renderer.domElement)
  orbit.enableRotate = false
  orbit.enableKeys = false
  orbit.minZoom = 0.25
  orbit.maxZoom = 20

  return orbit
}

const createScene = children => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  children.forEach(child => scene.add(child))

  return scene
}

const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    // antialias: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

const checkMove = (x, y, map) => {
  const row = map.matrix[x]
  const col = row && row[y]

  return col !== 1
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      won: false,
      difficulty: EASY,
    }

    this.container = React.createRef()
    this.map = createMap(this.state.difficulty)
    this.player = createPlayer()
    this.walls = createWalls(this.map.matrix)
    this.solution = createSolution(this.map.solution)
    this.floor = creatFloor(this.walls)
    this.camera = createCamera()
    this.ambient = new THREE.AmbientLight(0x33333)
    this.light1 = createLight()
    this.light2 = createLight()
    this.scene = createScene([
      this.ambient,
      this.light1,
      this.light2,
      this.floor,
      this.player,
      this.walls,
      this.solution,
    ])
    this.renderer = createRenderer()
    this.orbit = createOrbit(this.camera, this.renderer)

    window.addEventListener('resize', this.onResize)
    this.orbit.addEventListener('change', this.animate)
    Mousetrap.bind(
      ['w', 's', 'a', 'd', 'up', 'down', 'left', 'right'],
      this.move
    )
    Mousetrap.bind(['esc'], () => this.setState({ won: false }))
  }

  componentDidMount() {
    this.container.current.appendChild(this.renderer.domElement)
    this.resetCamera()
    this.animate()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    Mousetrap.unbind(
      ['w', 's', 'a', 'd', 'up', 'down', 'left', 'right'],
      this.move
    )
    Mousetrap.unbind(['esc'])
  }

  move = e => {
    if (this.state.won) {
      return
    }

    const { camera, player, map } = this

    if (e.key === 'w' || e.key === 'ArrowUp') {
      const z = player.position.z + 1

      if (checkMove(player.position.x, z, map)) {
        player.position.z = z
        camera.position.z = player.position.z - 50
      }
    }

    if (e.key === 's' || e.key === 'ArrowDown') {
      const z = player.position.z - 1

      if (checkMove(player.position.x, z, map)) {
        player.position.z = z
        camera.position.z = player.position.z - 50
      }
    }

    if (e.key === 'a' || e.key === 'ArrowLeft') {
      const x = player.position.x + 1

      if (checkMove(x, player.position.z, map)) {
        player.position.x = x
        camera.position.x = player.position.x - 50
      }
    }

    if (e.key === 'd' || e.key === 'ArrowRight') {
      const x = player.position.x - 1

      if (checkMove(x, player.position.z, map)) {
        player.position.x = x
        camera.position.x = player.position.x - 50
      }
    }

    this.checkWin()
    this.resetCamera()
    this.animate()
  }

  showSolution = () => {
    this.solution.children.forEach(child => (child.material.opacity = 0.5))
    this.animate()
  }

  checkWin = () => {
    if (
      !this.state.won &&
      this.player.position.x == this.map.end[0] &&
      this.player.position.z === this.map.end[1]
    ) {
      this.setState({ won: true })
    }
  }

  onResize = () => {
    const frustum = createFrustrum()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.left = frustum[0]
    this.camera.right = frustum[1]
    this.camera.top = frustum[2]
    this.camera.bottom = frustum[3]
    this.camera.updateProjectionMatrix()
    this.animate()
  }

  resetCamera = () => {
    this.orbit.target = this.player.position.clone()
    this.orbit.object = this.camera
    this.camera.position.x = this.player.position.x - 50
    this.camera.position.z = this.player.position.z - 50
    this.camera.position.y = 50
    this.camera.lookAt(this.player.position)
    this.camera.updateProjectionMatrix()
  }

  reset = () => {
    this.setState({ won: false })
    this.scene.remove(this.walls)
    this.scene.remove(this.solution)
    this.player.position.set(0, -0.25, 2)
    this.map = createMap(this.state.difficulty)
    this.walls = createWalls(this.map.matrix)
    this.solution = createSolution(this.map.solution)
    this.scene.add(this.walls)
    this.scene.add(this.solution)
    this.resetCamera()
    this.animate()
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        className={cx(styles['game'], {
          [styles['transitioning']]: this.props.isTransitioning,
        })}
      >
        <div ref={this.container} id="game" />
        <Modal
          value={this.state.difficulty}
          onChange={difficulty => this.setState({ difficulty })}
          onReset={this.reset}
          isVisible={this.state.won}
        />
        <Controls onGodmode={this.showSolution} />
      </div>
    )
  }
}
