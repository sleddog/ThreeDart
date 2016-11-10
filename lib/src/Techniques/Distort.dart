part of ThreeDart.Techniques;

/// A technique for a cover pass with a distored image based off depth.
class Distort extends Technique {
  Shaders.Distort _shader;

  /// TODO: Need to allow the color texture to also be a Cube texture.
  Textures.Texture2D _colorTxt;
  Textures.Texture2D _bumpTxt;
  Math.Matrix3 _colorTxt2DMat;
  Math.Matrix3 _bumpTxt2DMat;
  Math.Matrix4 _bumpMat;

  /// Creates a new distort cover technique with the given initial values.
  Distort({Textures.Texture2D colorTxt: null,
           Textures.Texture2D bumpTxt: null,
           Math.Matrix3 colorTxt2DMat: null,
           Math.Matrix3 bumpTxt2DMat: null,
           Math.Matrix4 bumpMat: null}) {
    this._shader = null;
    this.colorTexture = colorTxt;
    this.bumpTexture = bumpTxt;
    this.colorTexture2DMatrix = colorTxt2DMat;
    this.bumpTexture2DMatrix = bumpTxt2DMat;
    this.bumpMatrix = bumpMat;
  }

  /// The color texture.
  Textures.Texture2D get colorTexture => this._colorTxt;
  set colorTexture(Textures.Texture2D txt) => this._colorTxt = txt;

  /// The bump texture.
  Textures.Texture2D get bumpTexture => this._bumpTxt;
  set bumpTexture(Textures.Texture2D txt) => this._bumpTxt = txt;

  /// The color texture modification matrix.
  Math.Matrix3 get colorTexture2DMatrix => this._colorTxt2DMat;
  set colorTexture2DMatrix(Math.Matrix3 mat) => this._colorTxt2DMat = mat ?? new Math.Matrix3.identity();

  /// The bump texture modification matrix.
  Math.Matrix3 get bumpTexture2DMatrix => this._bumpTxt2DMat;
  set bumpTexture2DMatrix(Math.Matrix3 mat) => this._bumpTxt2DMat = mat ?? new Math.Matrix3.identity();

  /// The matrix to modify the bump normal with.
  Math.Matrix4 get bumpMatrix => this._bumpMat;
  set bumpMatrix(Math.Matrix4 mat) => this._bumpMat = mat ?? new Math.Matrix4.identity();

  /// Updates this technique for the given state.
  void update(Core.RenderState state) {
    // Do Nothing
  }

  /// Checks if the texture is in the list and if not, sets it's index and adds it to the list.
  void _addToTextureList(List<Textures.Texture> textures, Textures.Texture txt) {
    if (txt != null) {
      if (!textures.contains(txt)) {
        txt.index = textures.length;
        textures.add(txt);
      }
    }
  }

  /// Renders this technique for the given state and entity.
  void render(Core.RenderState state, Core.Entity obj) {
    if (this._shader == null)
      this._shader = new Shaders.Distort.cached(state);

    if (obj.cacheNeedsUpdate) {
      obj.cache = obj.shape.build(new Data.WebGLBufferBuilder(state.gl), Data.VertexType.Pos|Data.VertexType.Txt2D)
        ..findAttribute(Data.VertexType.Pos).attr = this._shader.posAttr.loc
        ..findAttribute(Data.VertexType.Txt2D).attr = this._shader.txtAttr.loc;
    }

    List<Textures.Texture> textures = new List<Textures.Texture>();
    this._addToTextureList(textures, this._colorTxt);
    this._addToTextureList(textures, this._bumpTxt);
    for (int i = 0; i < textures.length; i++) {
      textures[i].bind(state);
    }
    this._shader
      ..bind(state)
      ..colorTexture = this._colorTxt
      ..bumpTexture = this._bumpTxt
      ..projectViewObjectMatrix = state.projectionViewObjectMatrix
      ..colorTextureMatrix = this._colorTxt2DMat
      ..bumpTextureMatrix = this._bumpTxt2DMat
      ..bumpMatrix = this._bumpMat;

    if (obj.cache is Data.BufferStore) {
      (obj.cache as Data.BufferStore)
        ..bind(state)
        ..render(state)
        ..unbind(state);
    } else obj.clearCache();
    this._shader.unbind(state);

    for (int i = 0; i < textures.length; i++) {
      textures[i].unbind(state);
    }
  }
}
