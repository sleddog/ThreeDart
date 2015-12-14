part of ThreeDart.Views;

class Perspective implements Camara {

  static Math.Matrix4 _lookMat = null;

  Movers.Mover _mover;

  double _fov;
  double _near;
  double _far;

  Perspective() {
    this._fov = PI/3.0;
    this._near = 1.0;
    this._far = -1.0;
  }

  double get fov => this._fov;
  set fov(double fov) => this._fov = fov;

  double get near => this._near;
  set near(double near) => this._near = near;

  double get far => this._far;
  set far(double far) => this._far = far;

  Movers.Mover get mover => this._mover;
  set mover(Movers.Mover mover) => this._mover = mover;

  void bind(Core.RenderState state) {
    double aspect = state.gl.drawingBufferWidth / state.gl.drawingBufferHeight;
    state.projection.push(new Math.Matrix4.perspective(this._fov, aspect, this._near, this._far));

    if (_lookMat == null) {
      _lookMat = new Math.Matrix4.lookAtTarget(
        new Math.Point3(0.0, 0.0, 0.0),
        new Math.Vector3(0.0, 1.0, 0.0),
        new Math.Point3(0.0, 0.0, -2.5));
    }
    Math.Matrix4 look = _lookMat;
    if (mover != null) {
      Math.Matrix4 mat = mover.update(state, this);
      if (mat != null) look = look*mat;
    }
    state.view.push(look);
  }

  void unbind(Core.RenderState state) {
    state.projection.pop();
    state.view.pop();
  }
}