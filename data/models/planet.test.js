import { Planet } from './planet'

const requiredParams = { name: "test name" }
describe('Planet model construction', () => {
  it('should require name parameter', () => {
    let errors = new Planet({}).validateSync()
    expect(errors['name']).toBeTruthy()
    errors = new Planet().validateSync()
    expect(errors['name']).toBeTruthy()
    errors = new Planet({ name: "test name" }).validateSync()
    expect(errors).toBeUndefined()
  })

  it('should have default M class', () => expect(new Planet({ ...requiredParams }).classification).toBe("M"))
  it('should accept classification', () => expect(new Planet({ ...requiredParams, classification: "A" }).classification).toBe("A"))

  it('should have default 100 radius', () => expect(new Planet({ ...requiredParams }).radius).toBe(100))
  it('should accept radius', () => expect(new Planet({ ...requiredParams, radius: 12345 }).radius).toBe(12345))
  it('should refuse negative radius', () => {
    let errors = new Planet({ ...requiredParams, radius: -1 }).validateSync().errors
    expect(errors['radius']).toBeTruthy()
    errors = new Planet({ ...requiredParams, radius: 0 }).validateSync()
    expect(errors).toBeUndefined()
  })

  it('should have default 0,0,0 coords', () => expect(new Planet({ ...requiredParams }).coords).toEqual({ x: 0, y: 0, z: 0 }))
  it('should accept coords', () => expect(new Planet({ ...requiredParams, coords: { x: 1, y: 2, z: 3 } }).coords).toEqual({ x: 1, y: 2, z: 3 }))
  it('should accept part coords', () => {
    let planet = new Planet({ ...requiredParams, coords: { x: 10 } })
    let errors = planet.validateSync()
    expect(errors).toBeUndefined()
    expect(planet.coords).toEqual({ x: 10, y: 0, z: 0 })
  })

  it('should have default 0,0,0 rotation', () => expect(new Planet({ ...requiredParams }).rotation).toEqual({ x: 0, y: 0, z: 0 }))
  it('should accept rotation', () => expect(new Planet({ ...requiredParams, rotation: { x: 1, y: 2, z: 3 } }).rotation).toEqual({ x: 1, y: 2, z: 3 }))
  it('should accept part rotation', () => {
    let planet = new Planet({ ...requiredParams, rotation: { x: 10 } })
    let errors = planet.validateSync()
    expect(errors).toBeUndefined()
    expect(planet.rotation).toEqual({ x: 10, y: 0, z: 0 })
  })

})
describe('Planet model saving', () => {
  it('should not save with errors')
  it('should save successfully')
  it('should set created_at and updated_at on save')
  it('should change updated_at on re-save but not created_at')
})