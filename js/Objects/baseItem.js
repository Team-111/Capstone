export default class BaseItem {
  constructor(name, hudText, mesh, isCollectable) {
    this.name = name;
    this.hudText = hudText;
    this.mesh = mesh;
    this.isCollectable = isCollectable;
  }
  makeInvisible() {
    this.mesh.visible = false;
  }

}
