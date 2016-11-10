part of ThreeDart.Textures;

/// A 2D texture.
class Texture2D extends Texture {
  WebGL.Texture _texture;
  bool _bound;
  bool _loaded;
  int _width;
  int _height;
  int _actualWidth;
  int _actualHeight;

  /// Creates a new 2D texture.
  Texture2D({int index: 0, WebGL.Texture texture: null}):
    super._(index) {
    this._texture = texture;
    this._bound   = false;
    this._loaded  = false;
    this._width   = 0;
    this._height  = 0;
    this._actualWidth  = 0;
    this._actualHeight = 0;
  }

  /// Creates a new 2D image from the given [width] and [height].
  factory Texture2D.fromSize(WebGL.RenderingContext gl, int width, int height, {bool wrapEdges: false}) {
    int maxSize = gl.getParameter(WebGL.MAX_TEXTURE_SIZE);
    int aWidth  = Math.nearestPower(width);
    int aHeight = Math.nearestPower(height);
    maxSize = Math.nearestPower(maxSize);
    aWidth  = math.min(aWidth, maxSize);
    aHeight = math.min(aHeight, maxSize);

    WebGL.Texture texture = gl.createTexture();
    gl.bindTexture(WebGL.TEXTURE_2D, texture);
    if (wrapEdges) {
      gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.REPEAT);
      gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_T, WebGL.REPEAT);
    } else {
      gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE);
      gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_T, WebGL.CLAMP_TO_EDGE);
    }
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.LINEAR);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MAG_FILTER, WebGL.LINEAR);
    gl.texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, aWidth, aHeight, 0, WebGL.RGBA, WebGL.UNSIGNED_BYTE, null);
    gl.bindTexture(WebGL.TEXTURE_2D, null);

    Texture2D result = new Texture2D(texture: texture);
    result._width  = width;
    result._height = height;
    result._actualWidth  = aWidth;
    result._actualHeight = aHeight;
    result._loaded = true;
    return result;
  }

  /// The internal texture instance.
  WebGL.Texture get texture => this._texture;

  /// The loaded state of the texture.
  bool get loaded => this._loaded;

  /// Ths width of the image in pixels as requested or loaded from file.
  int get width => this._width;

  /// Ths height of the image in pixels as requested or loaded from file.
  int get height => this._height;

  /// The width of the image in pixels allowed by this machine's architecture.
  int get actualWidth => this._actualWidth;

  /// The height of the image in pixels allowed by this machine's architecture.
  int get actualHeight => this._actualHeight;

  /// This replaces the internals of this texture with the given [txt].
  void replace(Texture2D txt) {
    if (txt == null) {
      this._texture = null;
      this._loaded  = false;
      this._width   = 0;
      this._height  = 0;
      this._actualWidth  = 0;
      this._actualHeight = 0;
    } else {
      this._texture = txt._texture;
      this._bound   = txt._bound;
      this._loaded  = txt._loaded;
      this._width   = txt._width;
      this._height  = txt._height;
      this._actualWidth  = txt._actualWidth;
      this._actualHeight = txt._actualHeight;
    }
  }

  /// Binds some data to the given [state].
  void bind(Core.RenderState state) {
    if (!this._bound && this._loaded) {
      this._bound = true;
      state.gl.activeTexture(WebGL.TEXTURE0+this.index);
      state.gl.bindTexture(WebGL.TEXTURE_2D, this._texture);
    }
  }

  /// Unbinds the bound data from the given [state].
  void unbind(Core.RenderState state) {
    if (this._bound) {
      this._bound = false;
      state.gl.activeTexture(WebGL.TEXTURE0+this.index);
      state.gl.bindTexture(WebGL.TEXTURE_2D, null);
    }
  }
}
