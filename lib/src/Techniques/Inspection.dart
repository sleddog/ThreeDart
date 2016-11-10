part of ThreeDart.Techniques;

/// The inspection rendering technique for checking shape components.
class Inspection extends Technique {
  Shaders.Inspection _shader;
  Math.Vector3 _lightVec;
  Math.Color3 _diffuse1;
  Math.Color3 _ambient1;
  Math.Color3 _diffuse2;
  Math.Color3 _ambient2;
  Math.Color3 _diffuse3;
  Math.Color3 _ambient3;
  Math.Color3 _diffuse4;
  Math.Color3 _ambient4;

  bool _showFilled;
  bool _showWireFrame;
  bool _showVertices;
  bool _showNormals;
  bool _showBinormals;
  bool _showTangentals;
  bool _showTxtCube;
  bool _showFaceCenters;
  bool _showFaceNormals;
  bool _showFaceBinormals;
  bool _showFaceTangentals;
  bool _showColorFill;
  bool _showTxt2DColor;
  bool _showWeight;
  bool _showAxis;
  bool _showAABB;
  bool _showBend;
  double _vectorScale;

  /// Creates a new inspection techinque.
  Inspection() {
    this._shader = null;
    this._lightVec = new Math.Vector3(0.0, 0.0, -1.0);
    this._diffuse1 = new Math.Color3(0.2, 0.3, 0.4);
    this._ambient1 = new Math.Color3(0.1, 0.2, 0.3);
    this._diffuse2 = new Math.Color3(0.7, 0.7, 0.7);
    this._ambient2 = new Math.Color3(0.3, 0.3, 0.3);
    this._diffuse3 = new Math.Color3(0.5, 0.5, 0.5);
    this._ambient3 = new Math.Color3(0.5, 0.5, 0.5);
    this._diffuse4 = new Math.Color3(1.0, 1.0, 1.0);
    this._ambient4 = new Math.Color3(0.8, 0.8, 0.8);

    this._showFilled         = false;
    this._showWireFrame      = false;
    this._showVertices       = false;
    this._showNormals        = false;
    this._showBinormals      = false;
    this._showTangentals     = false;
    this._showTxtCube        = false;
    this._showFaceCenters    = false;
    this._showFaceNormals    = false;
    this._showFaceBinormals  = false;
    this._showFaceTangentals = false;
    this._showColorFill      = false;
    this._showTxt2DColor     = false;
    this._showWeight         = false;
    this._showAxis           = false;
    this._showAABB           = false;
    this._showBend           = false;
    this._vectorScale        = 1.0;
  }

  /// Indicates if the filled shape should be showed.
  set showFilled(bool show) => this._showFilled = show;
  bool get showFilled => this._showFilled;

  /// Indicates if the wire frame of the shape should be showed.
  set showWireFrame(bool show) => this._showWireFrame = show;
  bool get showWireFrame => this._showWireFrame;

  /// Indicates if the vertices of the shape should be showed.
  set showVertices(bool show) => this._showVertices = show;
  bool get showVertices => this._showVertices;

  /// Indicates if the normals of the shape should be showed.
  set showNormals(bool show) => this._showNormals = show;
  bool get showNormals => this._showNormals;

  /// Indicates if the binormals of the shape should be showed.
  set showBinormals(bool show) => this._showBinormals = show;
  bool get showBinormals => this._showBinormals;

  /// Indicates if the tangentals of the shape should be showed.
  set showTangentals(bool show) => this._showTangentals = show;
  bool get showTangentals => this._showTangentals;

  /// Indicates if the texture cube vectors of the shape should be showed.
  set showTxtCube(bool show) => this._showTxtCube = show;
  bool get showTxtCube => this._showTxtCube;

  /// Indicates if the face center points of the shape should be showed.
  set showFaceCenters(bool show) => this._showFaceCenters = show;
  bool get showFaceCenters => this._showFaceCenters;

  /// Indicates if the face normals of the shape should be showed.
  set showFaceNormals(bool show) => this._showFaceNormals = show;
  bool get showFaceNormals => this._showFaceNormals;

  /// Indicates if the face binormals of the shape should be showed.
  set showFaceBinormals(bool show) => this._showFaceBinormals = show;
  bool get showFaceBinormals => this._showFaceBinormals;

  /// Indicates if the face tangentals of the shape should be showed.
  set showFaceTangentals(bool show) => this._showFaceTangentals = show;
  bool get showFaceTangentals => this._showFaceTangentals;

  /// Indicates if the colors of the shape should be showed.
  set showColorFill(bool show) => this._showColorFill = show;
  bool get showColorFill => this._showColorFill;

  /// Indicates if the texture 2D colors of the shape should be showed.
  set showTxt2DColor(bool show) => this._showTxt2DColor = show;
  bool get showTxt2DColor => this._showTxt2DColor;

  /// Indicates if the weights of the shape should be showed.
  set showWeight(bool show) => this._showWeight = show;
  bool get showWeight => this._showWeight;

  /// Indicates if the axis should be showed.
  set showAxis(bool show) => this._showAxis = show;
  bool get showAxis => this._showAxis;

  /// Indicates if the axlal alligned bounding box of the shape should be showed.
  set showAABB(bool show) => this._showAABB = show;
  bool get showAABB => this._showAABB;

  /// Indicates if the first bend should be showed.
  set showBend(bool show) => this._showBend = show;
  bool get showBend => this._showBend;

  /// The scalar to apply to vectors lengths.
  /// To make the vectors change length the cache also has to be cleared.
  set vectorScale(double scale) => this._vectorScale = scale;
  double get vectorScale => this._vectorScale;

  /// Updates this technique for the given state.
  void update(Core.RenderState state) {
    // Do Nothing
  }

  /// Renders the current [obj] with the current [state].
  void render(Core.RenderState state, Core.Entity obj) {
    if (this._shader == null)
      this._shader = new Shaders.Inspection.cached(state);

    if (obj.cacheNeedsUpdate) {
      obj.shape.calculateNormals();
      obj.shape.calculateBinormals();
      obj.shape.calculateCubeTextures();
      obj.cache = new Data.BufferStoreSet();
    }

    this._shader
      ..bind(state)
      ..weightScalar = this._vectorScale
      ..lightVector = this._lightVec
      ..viewMatrix = state.view.matrix
      ..viewObjectMatrix = state.viewObjectMatrix
      ..projectViewObjectMatrix = state.projectionViewObjectMatrix;

    if (obj.cache is Data.BufferStoreSet) {
      Data.BufferStoreSet store = obj.cache as Data.BufferStoreSet;
      state.gl.blendFunc(WebGL.ONE, WebGL.ONE);
      state.gl.enable(WebGL.DEPTH_TEST);
      state.gl.disable(WebGL.BLEND);

      // TODO: Why does POINTS not respect depth tests?
      // Once they do move these two below with the other DEPTH_TEST disabled.
      if (this._showVertices)
        this._render(state, store, obj.shape, 'vertices', this._vertices, this._ambient2, this._diffuse2);
      if (this._showFaceCenters)
        this._render(state, store, obj.shape, 'faceCenters', this._faceCenters, this._ambient2, this._diffuse2);

      if (this._showFilled)
        this._render(state, store, obj.shape, 'shapeFill', this._shapeFill, this._ambient1, this._diffuse1);
      if (this._showColorFill)
        this._render(state, store, obj.shape, 'colorFill', this._colorFill, this._ambient3, this._diffuse3);
      if (this._showTxt2DColor)
        this._render(state, store, obj.shape, 'txt2DColor', this._txt2DColor, this._ambient3, this._diffuse3);
      if (this._showWeight)
        this._render(state, store, obj.shape, 'weight', this._weight, this._ambient3, this._diffuse3);
      if (this._showBend)
        this._render(state, store, obj.shape, 'bend1', this._bendFill, this._ambient3, this._diffuse3);

      state.gl.disable(WebGL.DEPTH_TEST);
      state.gl.enable(WebGL.BLEND);

      if (this._showWireFrame)
        this._render(state, store, obj.shape, 'wireFrame', this._wireFrame, this._ambient2, this._diffuse2);
      if (this._showNormals)
        this._render(state, store, obj.shape, 'normals', this._normals, this._ambient2, this._diffuse2);
      if (this._showBinormals)
        this._render(state, store, obj.shape, 'binormals', this._binormals, this._ambient2, this._diffuse2);
      if (this._showTangentals)
        this._render(state, store, obj.shape, 'tangentals', this._tangentals, this._ambient2, this._diffuse2);
      if (this._showTxtCube)
        this._render(state, store, obj.shape, 'textureCube', this._txtCube, this._ambient2, this._diffuse2);
      if (this._showFaceNormals)
        this._render(state, store, obj.shape, 'faceNormals', this._faceNormals, this._ambient2, this._diffuse2);
      if (this._showFaceBinormals)
        this._render(state, store, obj.shape, 'faceBinormals', this._faceBinormals, this._ambient3, this._diffuse3);
      if (this._showFaceTangentals)
        this._render(state, store, obj.shape, 'faceTangentals', this._faceTangentals, this._ambient3, this._diffuse3);
      if (this._showAxis)
        this._render(state, store, obj.shape, 'Axis', this._axis, this._ambient4, this._diffuse4);
      if (this._showAABB)
        this._render(state, store, obj.shape, 'AABB', this._aabb, this._ambient4, this._diffuse4);

      state.gl.enable(WebGL.DEPTH_TEST);
      state.gl.disable(WebGL.BLEND);
    } else obj.clearCache();

    this._shader.unbind(state);
  }

  /// Renderes one of the shape components to inspect.
  /// If the component of the shape isn't cached it will be created and cached.
  void _render(Core.RenderState state, Data.BufferStoreSet storeSet, Shapes.Shape shape,
      String name, Shapes.Shape shapeModHndl(Shapes.Shape shape), Math.Color3 ambient, Math.Color3 diffuse) {
    Data.BufferStore store = storeSet.map[name];
    if (store == null) {
      store = this._buildShape(state, shapeModHndl(shape));
      storeSet.map[name] = store;
    }
    this._shader.setColors(ambient, diffuse);
    store.oneRender(state);
  }

  /// Builds and sets up the shape for a component.
  Data.BufferStore _buildShape(Core.RenderState state, Shapes.Shape shape) {
    Data.BufferStore store = shape.build(new Data.WebGLBufferBuilder(state.gl),
      Data.VertexType.Pos|Data.VertexType.Norm|Data.VertexType.Binm|Data.VertexType.Clr3);
    return store
      ..findAttribute(Data.VertexType.Pos).attr  = this._shader.posAttr.loc
      ..findAttribute(Data.VertexType.Norm).attr = this._shader.normAttr.loc
      ..findAttribute(Data.VertexType.Clr3).attr = this._shader.clrAttr.loc
      ..findAttribute(Data.VertexType.Binm).attr = this._shader.binmAttr.loc;
  }

  /// Convertes the given [shape] into the filled shape.
  Shapes.Shape _shapeFill(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color =  new Math.Color4.white();
    shape.vertices.forEach((Shapes.Vertex vertex) {
      result.vertices.add(vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero());
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      result.faces.add(ver1, ver2, ver3);
    });
    return result;
  }

  /// Convertes the given [shape] into the wire frame shape.
  Shapes.Shape _wireFrame(Shapes.Shape shape, {Math.Color4 color: null}) {
    Shapes.Shape result = new Shapes.Shape();
    if (color == null) color = new Math.Color4(0.0, 0.7, 1.0);
    shape.vertices.forEach((Shapes.Vertex vertex) {
      result.vertices.add(vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero());
    });
    void addLine(Shapes.Vertex ver1, Shapes.Vertex ver2) {
      if (ver1.firstLineBetween(ver2) == null) {
        result.lines.add(ver1, ver2);
      }
    }
    shape.lines.forEach((Shapes.Line line) {
      Shapes.Vertex ver1 = result.vertices[line.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[line.vertex2.index];
      addLine(ver1, ver2);
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      addLine(ver1, ver2);
      addLine(ver2, ver3);
      addLine(ver3, ver1);
    });
    return result;
  }

  /// Convertes the given [shape] into the vertices shape.
  Shapes.Shape _vertices(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4.white();
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Shapes.Vertex ver = vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero();
      result.vertices.add(ver);
      result.points.add(ver);
    });
    return result;
  }

  /// Convertes the given [shape] into the normals shape.
  Shapes.Shape _normals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 1.0, 0.3);
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Shapes.Vertex ver1 = vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero();
      Shapes.Vertex ver2 = ver1.copy()
        ..binormal = ver1.normal;
      result.vertices.add(ver1);
      result.vertices.add(ver2);
      result.lines.add(ver1, ver2);
    });
    return result;
  }

  /// Convertes the given [shape] into the binormals shape.
  Shapes.Shape _binormals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 0.3, 0.3);
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Shapes.Vertex ver1 = vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero();
      Shapes.Vertex ver2 = ver1.copy()
        ..binormal = vertex.binormal;
      result.vertices.add(ver1);
      result.vertices.add(ver2);
      result.lines.add(ver1, ver2);
    });
    return result;
  }

  /// Convertes the given [shape] into the tangentals shape.
  Shapes.Shape _tangentals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 0.3, 1.0);
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Shapes.Vertex ver1 = vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero();
      Shapes.Vertex ver2 = ver1.copy()
        ..binormal = -vertex.binormal.cross(vertex.normal);
      result.vertices.add(ver1);
      result.vertices.add(ver2);
      result.lines.add(ver1, ver2);
    });
    return result;
  }

  /// Convertes the given [shape] into the texture cube color shape.
  Shapes.Shape _txtCube(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 0.3, 0.3);
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Shapes.Vertex ver1 = vertex.copy()
        ..color = color
        ..binormal = new Math.Vector3.zero();
      Shapes.Vertex ver2 = ver1.copy()
        ..binormal = vertex.textureCube;
      result.vertices.add(ver1);
      result.vertices.add(ver2);
      result.lines.add(ver1, ver2);
    });
    return result;
  }

  /// Convertes the given [shape] into the face center point shape.
  Shapes.Shape _faceCenters(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 1.0, 0.3);
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver = new Shapes.Vertex(
        loc: (face.vertex1.location + face.vertex2.location + face.vertex3.location)/3.0,
        norm: face.normal,
        binm: new Math.Vector3.zero(),
        clr: color);
      result.vertices.add(ver);
      result.points.add(ver);
    });
    return result;
  }

  /// Convertes the given [shape] into the face normal shape.
  Shapes.Shape _faceNormals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 1.0, 0.3);
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex cen1 = new Shapes.Vertex(
        loc: (face.vertex1.location + face.vertex2.location + face.vertex3.location)/3.0,
        norm: face.normal,
        binm: new Math.Vector3.zero(),
        clr: color);
      Shapes.Vertex cen2 = cen1.copy()
        ..binormal = face.normal;
      result.vertices.add(cen1);
      result.vertices.add(cen2);
      result.lines.add(cen1, cen2);
    });
    return result;
  }

  /// Convertes the given [shape] into the face binormal shape.
  Shapes.Shape _faceBinormals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 0.3, 0.3);
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex cen1 = new Shapes.Vertex(
        loc: (face.vertex1.location + face.vertex2.location + face.vertex3.location)/3.0,
        norm: face.normal,
        binm: new Math.Vector3.zero(),
        clr: color);
      Shapes.Vertex cen2 = cen1.copy()
        ..binormal = face.binormal;
      result.vertices.add(cen1);
      result.vertices.add(cen2);
      result.lines.add(cen1, cen2);
    });
    return result;
  }

  /// Convertes the given [shape] into the face tangental shape.
  Shapes.Shape _faceTangentals(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    Math.Color4 color = new Math.Color4(1.0, 0.3, 1.0);
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex cen1 = new Shapes.Vertex(
        loc: (face.vertex1.location + face.vertex2.location + face.vertex3.location)/3.0,
        norm: face.normal,
        binm: new Math.Vector3.zero(),
        clr: color);
      Shapes.Vertex cen2 = cen1.copy()
        ..binormal = -face.binormal.cross(face.normal);
      result.vertices.add(cen1);
      result.vertices.add(cen2);
      result.lines.add(cen1, cen2);
    });
    return result;
  }

  /// Convertes the given [shape] into the color shape.
  Shapes.Shape _colorFill(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    shape.vertices.forEach((Shapes.Vertex vertex) {
      result.vertices.add(vertex.copy());
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      result.faces.add(ver1, ver2, ver3);
    });
    return result;
  }

  /// Convertes the given [shape] into the texture 2D color shape.
  Shapes.Shape _txt2DColor(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Math.Point2 txt = vertex.texture2D;
      result.vertices.add(vertex.copy()
        ..color = new Math.Color4(txt.x, txt.y, txt.y));
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      result.faces.add(ver1, ver2, ver3);
    });
    return result;
  }

  /// Convertes the given [shape] into the weight color shape.
  Shapes.Shape _weight(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    if (shape.vertices.length < 1) return result;
    double min = shape.vertices[0].weight;
    double max = min;
    shape.vertices.forEach((Shapes.Vertex vertex) {
      if (min > vertex.weight) min = vertex.weight;
      if (max < vertex.weight) max = vertex.weight;
    });
    double div = max-min;
    if (div <= 0.0) div = 1.0;
    shape.vertices.forEach((Shapes.Vertex vertex) {
      double spectrum = (vertex.weight-min)/div;
      Math.Color3 clr = new Math.Color3.fromHVS(spectrum*5.0/6.0, 1.0, 1.0);
      result.vertices.add(vertex.copy()
        ..binormal = new Math.Vector3.zero()
        ..color = new Math.Color4.fromColor3(clr));
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      result.faces.add(ver1, ver2, ver3);
    });
    return result;
  }

  /// Gets the maximum bend index of the given [shape].
  int _maxIndex(Shapes.Shape shape) {
    double maxBend = 0.0;
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Math.Point4 bend = vertex.bending;
      if (bend == null) bend = new Math.Point4.zero();
      maxBend = math.max(maxBend, bend.x);
      maxBend = math.max(maxBend, bend.y);
      maxBend = math.max(maxBend, bend.z);
      maxBend = math.max(maxBend, bend.w);
    });
    return ((maxBend + 1.5)*0.5).floor();
  }

  /// Gets the spectrum color for the [bendVal] in the [maxIndex] range.
  Math.Color3 _bendColor(double bendVal, int maxIndex) {
    if (bendVal < 0.0) {
      return new Math.Color3.black();
    } else {
      double index = ((bendVal + 0.5)*0.5).floorToDouble();
      double value = (bendVal - index*2.0);
      return new Math.Color3.fromHVS(index/maxIndex, value, 1.0);
    }
  }

  /// Convertes the given [shape] into the bend color shape.
  Shapes.Shape _bendFill(Shapes.Shape shape) {
    int maxIndex = this._maxIndex(shape);
    Shapes.Shape result = new Shapes.Shape();
    shape.vertices.forEach((Shapes.Vertex vertex) {
      Math.Point4 bend = vertex.bending;
      if (bend == null) bend = new Math.Point4.zero();
      Math.Color3 clr = new Math.Color3.black();
      clr = clr + this._bendColor(bend.x, maxIndex);
      clr = clr + this._bendColor(bend.y, maxIndex);
      clr = clr + this._bendColor(bend.z, maxIndex);
      clr = clr + this._bendColor(bend.w, maxIndex);
      result.vertices.add(vertex.copy()
        ..binormal = new Math.Vector3.zero()
        ..color = new Math.Color4.fromColor3(clr));
    });
    shape.faces.forEach((Shapes.Face face) {
      Shapes.Vertex ver1 = result.vertices[face.vertex1.index];
      Shapes.Vertex ver2 = result.vertices[face.vertex2.index];
      Shapes.Vertex ver3 = result.vertices[face.vertex3.index];
      result.faces.add(ver1, ver2, ver3);
    });
    return result;
  }

  /// Creates the axii shape.
  Shapes.Shape _axis(Shapes.Shape shape) {
    Shapes.Shape result = new Shapes.Shape();
    var add = (double dx, double dy, double dz) {
      Math.Color4 clr = new Math.Color4(dx, dy, dz);
      Shapes.Vertex ver1 = result.vertices.addNewLoc(0.0, 0.0, 0.0)
        ..binormal = new Math.Vector3.zero()
        ..normal = new Math.Vector3(1.0, 0.0, 0.0)
        ..color = clr;
      Shapes.Vertex ver2 = result.vertices.addNewLoc(dx, dy, dz)
        ..binormal = new Math.Vector3.zero()
        ..normal = new Math.Vector3(1.0, 0.0, 0.0)
        ..color = clr;
      result.lines.add(ver1, ver2);
    };
    add(1.0, 0.0, 0.0);
    add(0.0, 1.0, 0.0);
    add(0.0, 0.0, 1.0);
    return result;
  }

  /// Convertes the given [shape] into the axial alligned bounding box shape.
  Shapes.Shape _aabb(Shapes.Shape shape) {
    Math.Region3 aabb = shape.calculateAABB();
    Shapes.Shape result = new Shapes.Shape();
    var add = (double dx, double dy, double dz) {
      return result.vertices.addNewLoc(dx, dy, dz)
        ..binormal = new Math.Vector3.zero()
        ..normal = new Math.Vector3(dx, dy, dz);
    };
    Shapes.Vertex ver1 = add(aabb.x,         aabb.y,         aabb.z);
    Shapes.Vertex ver2 = add(aabb.x+aabb.dx, aabb.y,         aabb.z);
    Shapes.Vertex ver3 = add(aabb.x+aabb.dx, aabb.y+aabb.dy, aabb.z);
    Shapes.Vertex ver4 = add(aabb.x,         aabb.y+aabb.dy, aabb.z);
    Shapes.Vertex ver5 = add(aabb.x,         aabb.y,         aabb.z+aabb.dz);
    Shapes.Vertex ver6 = add(aabb.x+aabb.dx, aabb.y,         aabb.z+aabb.dz);
    Shapes.Vertex ver7 = add(aabb.x+aabb.dx, aabb.y+aabb.dy, aabb.z+aabb.dz);
    Shapes.Vertex ver8 = add(aabb.x,         aabb.y+aabb.dy, aabb.z+aabb.dz);
    result.lines.add(ver1, ver2);
    result.lines.add(ver2, ver3);
    result.lines.add(ver3, ver4);
    result.lines.add(ver4, ver1);
    result.lines.add(ver5, ver6);
    result.lines.add(ver6, ver7);
    result.lines.add(ver7, ver8);
    result.lines.add(ver8, ver5);
    result.lines.add(ver1, ver5);
    result.lines.add(ver2, ver6);
    result.lines.add(ver3, ver7);
    result.lines.add(ver4, ver8);
    return result;
  }
}
