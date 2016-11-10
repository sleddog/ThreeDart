part of ThreeDart.Scenes;

/// The render pass renders a single scene.
class EntityPass implements RenderPass {

  /// The camera describing the view of the scene.
  Views.Camera _camera;

  /// The target defining the storage to render to.
  Views.Target _target;

  /// The default technique to render with.
  Techniques.Technique _tech;

  /// The children entities to render.
  List<Core.Entity> _children;

  /// Event emitted before an update for this pass.
  Core.Event _onPreUpdate;

  /// Event emitted after an update for this pass.
  Core.Event _onPostUpdate;

  /// Event emitted on an redner for this pass.
  Core.Event _onRender;

  /// Creates a new render pass.
  EntityPass({
      Views.Camera camera: null,
      Views.Target target: null,
      Techniques.Technique tech: null,
      List<Core.Entity> children: null
    }) {
    this.camera = camera;
    this.target = target;
    this.tech = tech;
    this._children = new List<Core.Entity>();
    if (children != null)  this._children.addAll(children);
    this._onPreUpdate = new Core.Event();
    this._onPostUpdate = new Core.Event();
    this._onRender = new Core.Event();
  }

  /// The camera describing the view of the scene.
  /// If null is set, the camera is set to a Perspective.
  Views.Camera get camera => this._camera;
  set camera(Views.Camera camera) => this._camera = camera ?? new Views.Perspective();

  /// The target defining the storage to render to.
  /// If null is set, the target is set to an FrontTarget.
  Views.Target get target => this._target;
  set target(Views.Target target) => this._target = target ?? new Views.FrontTarget();

  /// The default technique to render with.
  Techniques.Technique get tech => this._tech;
  set tech(Techniques.Technique tech) => this._tech = tech;

  /// The children entities to render.
  List<Core.Entity> get children => this._children;

  /// Event emitted before an update for this pass.
  Core.Event get onPreUpdate => this._onPreUpdate;

  /// Event emitted after an update for this pass.
  Core.Event get onPostUpdate => this._onPostUpdate;

  /// Event emitted on an redner for this pass.
  Core.Event get onRender => this._onRender;

  /// Render the scene with the given [state].
  void render(Core.RenderState state) {
    Core.StateEventArgs args = new Core.StateEventArgs(this, state);
    this._onPreUpdate.emit(args);

    state.pushTechnique(this._tech);
    this._target.bind(state);
    this._camera.bind(state);

    if (this._tech != null) this._tech.update(state);
    for (Core.Entity child in this._children) {
      child.update(state);
    }
    this._onPostUpdate.emit(args);

    for (Core.Entity child in this._children) {
      child.render(state);
    }
    this._onRender.emit(args);

    this._camera.unbind(state);
    this._target.unbind(state);
    state.popTechnique();
  }
}
